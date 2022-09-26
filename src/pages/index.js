import './../pages/index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

import { apiConfig } from '../utils/constants.js';
import { validationParams } from '../components/data.js';

import { enableValidation } from '../components/validate.js';
import { closePopupButtonHandler } from '../components/modal.js';
import { setEventHandler } from '../utils/utils.js';

const profileNameElement = document.querySelector('.profile__name');
const profileCaptionElement = document.querySelector('.profile__caption');
const photoAddingButton = document.querySelector('.profile__add-button');
const popupClosingButtons = document.querySelectorAll('.popup__close-button');
const infoEditingButton = document.querySelector('.profile__edit-button');
const photosGallary = document.querySelector('.photos__gallary');

const avatarEditingButton = document.querySelector('.profile__avatar-edit-button');

const infoEditingPopupElement = document.querySelector('.popup-edit-info');
const infoEditingFormElement = infoEditingPopupElement.querySelector('.edit-form');
const profileNameInInput = infoEditingFormElement.querySelector('#profile-name');
const profileCaptionInInput = infoEditingFormElement.querySelector('#profile-caption');

const userAvatar = document.querySelector('.profile__avatar');
const loader = document.querySelector('.loader');
let userId;
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

const infoEditingPopup = new PopupWithForm({
  popupSelector: '.popup-edit-info',
  handleFormSubmit: (formValues) => {
    const name = formValues['profile-name'];
    const about = formValues['profile-caption'];
    api
      .updateUserInfo({ name, about })
      .then((res) => {
        profileNameElement.textContent = res.name;
        profileCaptionElement.textContent = res.about;
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
        userAvatar.src = res.avatar;
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
        userId,
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
  profileNameInInput.value = profileNameElement.textContent;
  profileCaptionInInput.value = profileCaptionElement.textContent;
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
    profileNameElement.textContent = userInfo.name;
    profileCaptionElement.textContent = userInfo.about;
    userAvatar.src = userInfo.avatar;
    userAvatar.onerror = () => {
      userAvatar.src = new URL('./../images/avatar.jpg', import.meta.url);
    };
    userId = userInfo._id;
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
