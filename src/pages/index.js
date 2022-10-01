import './../pages/index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
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
  profileNameInInput,
  profileCaptionInInput,
} from '../utils/constants.js';
import { setEventHandler } from '../utils/utils.js';

let photoToDelete;

const api = new Api(apiConfig);
const formValidator = new FormValidator(validationParams);

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
        CardList.renderItems([res]);
        photoAddingPopup.resetForm();
        photoAddingPopup.close();
      })
      .catch(renderSubmitFormError)
      .finally(() => {
        photoAddingPopup.renderLoading(false);
      });
  },
  disableSubmitButton: formValidator.disableSubmitButton,
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
    api
      .updateUserInfo({ name, about })
      .then((res) => {
        userProfile.setInfo(res);
        infoEditingPopup.close();
      })
      .catch(renderSubmitFormError)
      .finally(() => {
        infoEditingPopup.renderLoading(false);
      });
  },
  disableSubmitButton: formValidator.disableSubmitButton,
});

const avatarEditingPopup = new PopupWithForm({
  popupSelector: '.popup-update-avatar',
  closeButtonSelector: popupClosingButtonSelector,
  handleFormSubmit: (formValues) => {
    const avatarLink = formValues['update-avatar-link'];
    api
      .updateUserAvatar(avatarLink)
      .then((res) => {
        userProfile.setAvatar(res.avatar);
        avatarEditingPopup.close();
      })
      .catch(renderSubmitFormError)
      .finally(() => {
        avatarEditingPopup.renderLoading(false);
      });
  },
  disableSubmitButton: formValidator.disableSubmitButton,
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

const CardList = new Section(
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
      );
      const cardElement = card.generate();
      CardList.setItem(cardElement);
    },
  },
  photosGallary,
  'prepend',
);

const infoEditingButtonClickHandler = () => {
  const { name, about } = userProfile.getCurrentInfo();
  profileNameInInput.value = name;
  profileCaptionInInput.value = about;
  infoEditingPopup.open();
};

const avatarEditingButtonClickHandler = () => {
  avatarEditingPopup.open();
};

const photoAddingButtonClickHandler = () => {
  photoAddingPopup.open();
};

const photoDeletingButtonClickHandler = (event) => {
  photoToDelete = event.target.closest('.photos__photo-card');
  confirmationPhotoDeletingPopup.open();
};

const photoLikeButtonClickHandler = function () {
  if (this._photoLikeButton.classList.contains(this._activeLikeClass)) {
    api
      .deleteLike(this._id)
      .then((res) => {
        this._photoLikeCounter.textContent = res.likes.length;
        this._photoLikeButton.classList.remove(this._activeLikeClass);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .setLike(this._id)
      .then((res) => {
        this._photoLikeCounter.textContent = res.likes.length;
        this._photoLikeButton.classList.add(this._activeLikeClass);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, photos]) => {
    userProfile.setInfo(userInfo);
    userProfile.setAvatar(userInfo.avatar);
    CardList.renderItems(photos.reverse());
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
formValidator.enableValidation();
