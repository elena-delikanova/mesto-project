import { openPopup, closePopup } from './utils.js';
import addNewPhotoToGallary from './card.js';

const addPhotoForm = document.querySelector('.add-photo-form');
const addPhotoPopup = document.querySelector('.popup-add-photo');
const addPhotoButton = document.querySelector('.profile__add-button');
const closePopupButtons = document.querySelectorAll('.popup__close-button');
const editInfoButton = document.querySelector('.profile__edit-button');
const profileNameElement = document.querySelector('.profile__name');
const profileCaptionElement = document.querySelector('.profile__caption');
const editInfoPopup = document.querySelector('.popup-edit-info');
const editInfoForm = editInfoPopup.querySelector('.edit-form');
const profileNameInInput = editInfoForm.querySelector('#profile-name');
const profileCaptionInInput = editInfoForm.querySelector('#profile-caption');

addPhotoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newPhotoCaptureInInput = event.target.querySelector('#photo-capture');
  const newPhotoLinkInInput = event.target.querySelector('#photo-link');
  addNewPhotoToGallary({
    name: newPhotoCaptureInInput.value,
    link: newPhotoLinkInInput.value,
  });
  newPhotoCaptureInInput.value = '';
  newPhotoLinkInInput.value = '';
  closePopup(addPhotoPopup);
});

addPhotoButton.addEventListener('click', () => {
  openPopup(addPhotoPopup);
});

closePopupButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    closePopup(event.target.parentElement.parentElement);
  });
});

editInfoButton.addEventListener('click', () => {
  profileNameInInput.value = profileNameElement.textContent;
  profileCaptionInInput.value = profileCaptionElement.textContent;
  openPopup(editInfoPopup);
});

editInfoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  profileNameElement.textContent = profileNameInInput.value;
  profileCaptionElement.textContent = profileCaptionInInput.value;
  closePopup(editInfoPopup);
});
