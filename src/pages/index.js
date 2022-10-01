import './../pages/index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';

import { apiConfig } from '../utils/constants.js';
import { validationParams } from '../components/data.js';

import { enableValidation } from '../components/validate.js';
import { closePopupButtonHandler } from '../components/modal.js';
import { setEventHandler } from '../utils/utils.js';

const photoAddingButton = document.querySelector('.profile__add-button');
const popupClosingButtons = document.querySelectorAll('.popup__close-button');
const infoEditingButton = document.querySelector('.profile__edit-button');
const photosGallary = document.querySelector('.photos__gallary');

const avatarEditingButton = document.querySelector('.profile__avatar-edit-button');

const loader = document.querySelector('.loader');
let photoToDelete;

const api = new Api(apiConfig);

const errorPopop = new Popup('.popup-error');

const popupWithImage = new PopupWithImage('.popup-photo');

const photoAddingPopup = new PopupWithForm({
  popupSelector: '.popup-add-photo',
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
});

const userProfile = new UserInfo({selectorName: '.profile__name', selectorCaption: '.profile__caption', selectorAvatar: '.profile__avatar'})

const infoEditingPopup = new PopupWithForm({
  popupSelector: '.popup-edit-info',
  handleFormSubmit: (formValues) => {
    const name = formValues['profile-name'];
    const about = formValues['profile-caption'];
    api
      .updateUserInfo({ name, about })
      .then((res) => {
        userProfile.setInfo(res)
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
  handleFormSubmit: (formValues) => {
    const avatarLink = formValues['update-avatar-link'];
    api
      .updateUserAvatar(avatarLink)
      .then((res) => {
        userProfile.setAvatar(res.avatar)
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


const renderSubmitFormError = (err) => {
  console.log(err);
  errorPopop.open();
};

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
1
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
        console.log(this._activeLikeClass);
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
    userProfile.setInfo(userInfo)
    userProfile.setAvatar(userInfo.avatar)
    CardList.renderItems(photos.reverse());
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    loader.classList.add('loader-invisible');
  });

popupClosingButtons.forEach((button) => {
  setEventHandler({ objectToSet: button, handler: closePopupButtonHandler, event: 'click' });
});

setEventHandler({ objectToSet: photoAddingButton, handler: photoAddingButtonClickHandler, event: 'click' });
setEventHandler({ objectToSet: infoEditingButton, handler: infoEditingButtonClickHandler, event: 'click' });
setEventHandler({ objectToSet: avatarEditingButton, handler: avatarEditingButtonClickHandler, event: 'click' });
enableValidation(validationParams);
