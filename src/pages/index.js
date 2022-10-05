import './../pages/index.css';
import Api from '../components/Api.js';
import Card from '../components/Сard.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

import {
  apiConfig,
  validationParams,
  photoAddingButton,
  popupClosingButtonSelector,
  infoEditingButton,
  photosGallary,
  avatarEditingButton,
  loader,
  photoCardTemplateSelector,
} from '../utils/constants.js';
import { setEventHandler } from '../utils/utils.js';

let photoToDelete;

const api = new Api(apiConfig);

const forms = document.querySelectorAll('.form');
const formValidators = {};

const enableValidation = (config) => {
  forms.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

const errorPopop = new Popup({ popupSelector: '.popup-error', closeButtonSelector: popupClosingButtonSelector });
const renderSubmitFormError = (err) => {
  console.log(err);
  errorPopop.open();
};

const popupWithImage = new PopupWithImage({
  popupSelector: '.popup-photo',
  closeButtonSelector: popupClosingButtonSelector,
});

const photoAddingPopup = new PopupWithForm({
  popupSelector: '.popup-add-photo',
  closeButtonSelector: popupClosingButtonSelector,
  handleFormSubmit: (formValues) => {
    const name = formValues['photo-capture'];
    const link = formValues['photo-link'];
    photoAddingPopup.renderLoading(true);
    api
      .postCard({
        name,
        link,
      })
      .then((res) => {
        cardList.renderItems([res]);
        photoAddingPopup.close();
      })
      .catch(renderSubmitFormError)
      .finally(() => {
        photoAddingPopup.renderLoading(false);
      });
  },
});

const userProfile = new UserInfo({
  selectorName: '.profile__name',
  selectorCaption: '.profile__caption',
  selectorAvatar: '.profile__avatar',
});

const infoEditingPopup = new PopupWithForm({
  popupSelector: '.popup-edit-info',
  closeButtonSelector: popupClosingButtonSelector,
  handleFormSubmit: (formValues) => {
    const name = formValues['profile-name'];
    const about = formValues['profile-caption'];
    infoEditingPopup.renderLoading(true);
    api
      .updateUserInfo({ name, about })
      .then((res) => {
        userProfile.setUserInfo(res);
        infoEditingPopup.close();
      })
      .catch(renderSubmitFormError)
      .finally(() => {
        infoEditingPopup.renderLoading(false);
      });
  },
});

const avatarEditingPopup = new PopupWithForm({
  popupSelector: '.popup-update-avatar',
  closeButtonSelector: popupClosingButtonSelector,
  handleFormSubmit: (formValues) => {
    const avatarLink = formValues['update-avatar-link'];
    avatarEditingPopup.renderLoading(true);
    api
      .updateUserAvatar(avatarLink)
      .then((res) => {
        userProfile.setUserInfo(res);
        avatarEditingPopup.close();
      })
      .catch(renderSubmitFormError)
      .finally(() => {
        avatarEditingPopup.renderLoading(false);
      });
  },
});

const confirmationPhotoDeletingPopup = new PopupWithConfirmation({
  popupSelector: '.popup-confirmation',
  closeButtonSelector: popupClosingButtonSelector,
  handleFormSubmit: () => {
    const idOfDeletedPhoto = photoToDelete.querySelector('.photos__photo')._id;
    api
      .deleteCard(idOfDeletedPhoto)
      .then(() => {
        photoToDelete.remove();
        photoToDelete = undefined;
        confirmationPhotoDeletingPopup.close();
      })
      .catch(renderSubmitFormError);
  },
});

const cardList = new Section(
  {
    renderer: (photo) => {
      const imageClickHandler = () => {
        popupWithImage.open(photo);
      };
      const card = new Card(
        photo,
        userProfile.userId,
        photoDeletingButtonClickHandler,
        photoLikeButtonClickHandler,
        imageClickHandler,
        photoCardTemplateSelector
      );
      const cardElement = card.generate();
      cardList.setItem(cardElement);
    },
  },
  photosGallary,
);

const infoEditingButtonClickHandler = () => {
  const { name, about } = userProfile.getCurrentInfo();
  infoEditingPopup.setInputValues({ 'profile-name': name, 'profile-caption': about });
  formValidators['edit-info'].resetValidation();
  formValidators['edit-info'].disableSubmitButton();
  infoEditingPopup.open();
};

const avatarEditingButtonClickHandler = () => {
  formValidators['update-avatar'].disableSubmitButton();
  avatarEditingPopup.open();
};

const photoAddingButtonClickHandler = () => {
  formValidators['add-photo'].disableSubmitButton();
  photoAddingPopup.open();
};

const photoDeletingButtonClickHandler = (event) => {
  photoToDelete = event.target.closest('.photos__photo-card');
  confirmationPhotoDeletingPopup.open();
};

const photoLikeButtonClickHandler = function (card) {
  if (card.photoLikeButton.classList.contains(card.activeLikeClass)) {
    api
      .deleteLike(card.id)
      .then((res) => {
        card.updateLikes({ action: 'remove', likesLength: res.likes.length });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .setLike(card.id)
      .then((res) => {
        card.updateLikes({ likesLength: res.likes.length });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, photos]) => {
    userProfile.setUserInfo(userInfo);
    cardList.renderItems(photos.reverse());
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    loader.classList.add('loader-invisible');
  });

setEventHandler({ objectToSet: photoAddingButton, handler: photoAddingButtonClickHandler, event: 'click' });
setEventHandler({ objectToSet: infoEditingButton, handler: infoEditingButtonClickHandler, event: 'click' });
setEventHandler({ objectToSet: avatarEditingButton, handler: avatarEditingButtonClickHandler, event: 'click' });

enableValidation(validationParams);
