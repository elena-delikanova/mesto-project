import './../pages/index.css';
import { validationParams, initialCards } from './data.js';
import { createPhotoCard } from './card.js';
import { enableValidation } from './validate.js';
import { closePopupButtonHandler, openPopup, closePopup } from './modal.js';
import { setEventHandler } from './utils.js';

const photoAddingForm = document.querySelector('.add-photo-form');
const photoAddingPopup = document.querySelector('.popup-add-photo');
const profileNameElement = document.querySelector('.profile__name');
const profileCaptionElement = document.querySelector('.profile__caption');
const photoAddingButton = document.querySelector('.profile__add-button');
const popupClosingButtons = document.querySelectorAll('.popup__close-button');
const infoEditingButton = document.querySelector('.profile__edit-button');
const infoEditingPopup = document.querySelector('.popup-edit-info');
const photosGallary = document.querySelector('.photos__gallary');
const newPhotoCaptureInInput = photoAddingForm.querySelector('#photo-capture');
const newPhotoLinkInInput = photoAddingForm.querySelector('#photo-link');
const infoEditingForm = infoEditingPopup.querySelector('.edit-form');
const profileNameInInput = infoEditingForm.querySelector('#profile-name');
const profileCaptionInInput = infoEditingForm.querySelector('#profile-caption');



const submitInfoEditingFormHandler = (event) => {
  event.preventDefault();
  profileNameElement.textContent = profileNameInInput.value;
  profileCaptionElement.textContent = profileCaptionInInput.value;
  closePopup(infoEditingPopup);
};

const submitPhotoAddingFormHandler = (event) => {
  event.preventDefault();
  const card = createPhotoCard({
    name: newPhotoCaptureInInput.value,
    link: newPhotoLinkInInput.value,
  });
  renderPhotoCard({ card: card, container: photosGallary });
  closePopup(photoAddingPopup);
};

const infoEditingButtonClickHandler = () => {
  profileNameInInput.value = profileNameElement.textContent;
  profileCaptionInInput.value = profileCaptionElement.textContent;
  openPopup(infoEditingPopup);
};

const photoAddingButtonClickHandler = () => {
  photoAddingForm.reset();
  openPopup(photoAddingPopup);
};

function renderPhotoCard(params) {
  params.container.prepend(params.card);
}

initialCards.forEach((cardInfo) => {
  const card = createPhotoCard({ name: cardInfo.name, link: cardInfo.link });
  renderPhotoCard({ card: card, container: photosGallary });
});

popupClosingButtons.forEach((button) => {
  setEventHandler({ objectToSet: button, handler: closePopupButtonHandler, event: 'click' });
});

setEventHandler({ objectToSet: photoAddingForm, handler: submitPhotoAddingFormHandler, event: 'submit' });
setEventHandler({ objectToSet: infoEditingForm, handler: submitInfoEditingFormHandler, event: 'submit' });
setEventHandler({ objectToSet: photoAddingButton, handler: photoAddingButtonClickHandler, event: 'click' });
setEventHandler({ objectToSet: infoEditingButton, handler: infoEditingButtonClickHandler, event: 'click' });

enableValidation(validationParams);
/* У меня, кажется, не сложилось цельной картины, что убирать в модули, а что оставлять в index.js. Почему, например, обработчики для форм мы не убираем в какой-нибудь модуль по работе с формами?
И я, кажется, запуталась, когда мы функции объявляем как функциональное выражение, а когда -- как обычную функцию. Правильно ли я понимаю, что колбэки объявляются через функциональное выражение? А что еще? Если вам не трудно, подскажите, пожалуйста, где почитать про это */
