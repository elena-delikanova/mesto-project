import './../pages/index.css';
import { validationParams } from './data.js';
import { createPhotoCard } from './card.js';
import { enableValidation, disableButtonInElement } from './validate.js';
import { closePopupButtonHandler, openPopup, closePopup } from './modal.js';
import { setEventHandler } from './utils.js';
import { getInitialCards, getUserInfo, updateUserInfo, postCard, updateUserAvatar, deleteCard } from './api.js';

const photoAddingForm = document.querySelector('.add-photo-form');
const photoAddingPopup = document.querySelector('.popup-add-photo');
const profileNameElement = document.querySelector('.profile__name');
const profileCaptionElement = document.querySelector('.profile__caption');
const photoAddingButton = document.querySelector('.profile__add-button');
const popupClosingButtons = document.querySelectorAll('.popup__close-button');
const infoEditingButton = document.querySelector('.profile__edit-button');
const infoEditingPopup = document.querySelector('.popup-edit-info');
const photosGallary = document.querySelector('.photos__gallary');
const avatarEditingPopup = document.querySelector('.popup-update-avatar');
const avatarEditingButton = document.querySelector('.profile__avatar-edit-button');
const confirmationPhotoDeletingPopup = document.querySelector('.popup-confirmation');
const confirmationPhotoDeletingForm = confirmationPhotoDeletingPopup.querySelector('.confirmation-form');
const newPhotoCaptureInInput = photoAddingForm.querySelector('#photo-capture');
const newPhotoLinkInInput = photoAddingForm.querySelector('#photo-link');
const infoEditingForm = infoEditingPopup.querySelector('.edit-form');
const profileNameInInput = infoEditingForm.querySelector('#profile-name');
const profileCaptionInInput = infoEditingForm.querySelector('#profile-caption');
const avatarEditingForm = avatarEditingPopup.querySelector('.update-avatar-form');
const avatarLinkInInput = avatarEditingForm.querySelector('#update-avatar-link');
const userAvatar = document.querySelector('.profile__avatar');
const loader = document.querySelector('.loader');
const errorPopop = document.querySelector('.popup-error');
let userId;
let photoToDelete;

const renderSubmitFormError = (err) => {
  console.log(err);
  openPopup(errorPopop);
}

const submitInfoEditingFormHandler = (event) => {
  event.preventDefault();
  const submitButton = event.target.querySelector('.form__save-button');
  const initialButtonText = submitButton.textContent;
  renderLoading({isLoading: true, button: submitButton});
  updateUserInfo({ name: profileNameInInput.value, about: profileCaptionInInput.value })
    .then((res) => {
      profileNameElement.textContent = res.name;
      profileCaptionElement.textContent = res.about;
    })
    .catch(renderSubmitFormError)
    .finally(() => {
      closePopup(infoEditingPopup);
      renderLoading({isLoading: false, button: submitButton, initialButtonText});
    });
};

const submitPhotoAddingFormHandler = (event) => {
  event.preventDefault();
  const submitButton = event.target.querySelector('.form__save-button');
  const initialButtonText = submitButton.textContent;
  renderLoading({isLoading: true, button: submitButton});
  postCard({
    name: newPhotoCaptureInInput.value,
    link: newPhotoLinkInInput.value,
  })
    .then((res) => {
      const card = createPhotoCard(res, userId);
      renderPhotoCard({ card, container: photosGallary });
    })
    .catch(renderSubmitFormError)
    .finally(() => {
      closePopup(photoAddingPopup);
      renderLoading({isLoading: false, button: submitButton, initialButtonText});
    });
};

const submitAvatarEditingFormHandler = (event) => {
  event.preventDefault();
  const submitButton = event.target.querySelector('.form__save-button');
  const initialButtonText = submitButton.textContent;
  updateUserAvatar(avatarLinkInInput.value)
    .then((res) => {
      userAvatar.src = res.avatar;
    })
    .catch(renderSubmitFormError)
    .finally(() => {
      closePopup(avatarEditingPopup);
      renderLoading({isLoading: false, button: submitButton, initialButtonText});
    });
};

const submitConfirmationPhotoDeletingFormHandler = () => {
  const idOfDeletedPhoto = photoToDelete.querySelector('.photos__photo')._id;
  deleteCard(idOfDeletedPhoto)
    .then(() => {
      photoToDelete.remove();
      photoToDelete = undefined;
    })
    .catch(renderSubmitFormError)
    .finally(() => {
      closePopup(confirmationPhotoDeletingPopup);
    });
};

const infoEditingButtonClickHandler = () => {
  profileNameInInput.value = profileNameElement.textContent;
  profileCaptionInInput.value = profileCaptionElement.textContent;
  disableButtonInElement({
    element: infoEditingForm,
    buttonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_inactive',
  });
  openPopup(infoEditingPopup);
};

const avatarEditingButtonClickHandler = () => {
  avatarEditingForm.reset();
  disableButtonInElement({
    element: avatarEditingForm,
    buttonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_inactive',
  });
  openPopup(avatarEditingPopup);
};

const photoAddingButtonClickHandler = () => {
  photoAddingForm.reset();
  disableButtonInElement({
    element: photoAddingForm,
    buttonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_inactive',
  });
  openPopup(photoAddingPopup);
};

const photoDeletingButtonClickHandler = (event) => {
  photoToDelete = event.target.closest('.photos__photo-card');
  openPopup(confirmationPhotoDeletingPopup);
};

function renderPhotoCard({card, container}) {
  container.prepend(card);
}

function renderLoading({isLoading, button, initialButtonText}) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = initialButtonText;
  }
}

getUserInfo()
  .then((userInfo) => {
    profileNameElement.textContent = userInfo.name;
    profileCaptionElement.textContent = userInfo.about;
    userAvatar.src = userInfo.avatar;
    userAvatar.onerror = () => {
      userAvatar.src = new URL('./../images/avatar.jpg', import.meta.url);
    }
    userId = userInfo._id;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    loader.classList.add('loader-invisible');
  });

getInitialCards()
  .then((res) => {
    res.forEach((photo) => {
      const card = createPhotoCard(photo, userId, photoDeletingButtonClickHandler);
      renderPhotoCard({ card, container: photosGallary, });
    });
  })
  .catch((err) => {
    console.log(err);
  });

popupClosingButtons.forEach((button) => {
  setEventHandler({ objectToSet: button, handler: closePopupButtonHandler, event: 'click' });
});

setEventHandler({ objectToSet: photoAddingForm, handler: submitPhotoAddingFormHandler, event: 'submit' });
setEventHandler({ objectToSet: infoEditingForm, handler: submitInfoEditingFormHandler, event: 'submit' });
setEventHandler({ objectToSet: avatarEditingForm, handler: submitAvatarEditingFormHandler, event: 'submit' });
setEventHandler({ objectToSet: confirmationPhotoDeletingForm, handler: submitConfirmationPhotoDeletingFormHandler, event: 'submit' });
setEventHandler({ objectToSet: photoAddingButton, handler: photoAddingButtonClickHandler, event: 'click' });
setEventHandler({ objectToSet: infoEditingButton, handler: infoEditingButtonClickHandler, event: 'click' });
setEventHandler({ objectToSet: avatarEditingButton, handler: avatarEditingButtonClickHandler, event: 'click' });
enableValidation(validationParams);
