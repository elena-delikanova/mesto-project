import { setEventHandler, openPopup, closePopup } from './utils.js';
import { renderPhotoCard, createPhotoCard} from './card.js';

const photoAddingForm = document.querySelector('.add-photo-form');
const photoAddingPopup = document.querySelector('.popup-add-photo');
const photoAddingButton = document.querySelector('.profile__add-button');
const popupClosingButtons = document.querySelectorAll('.popup__close-button');
const infoEditingButton = document.querySelector('.profile__edit-button');
const profileNameElement = document.querySelector('.profile__name');
const profileCaptionElement = document.querySelector('.profile__caption');
const infoEditingPopup = document.querySelector('.popup-edit-info');
const infoEditingForm = infoEditingPopup.querySelector('.edit-form');
const profileNameInInput = infoEditingForm.querySelector('#profile-name');
const profileCaptionInInput = infoEditingForm.querySelector('#profile-caption');
const photosGallary = document.querySelector('.photos__gallary');
const newPhotoCaptureInInput = photoAddingForm.querySelector('#photo-capture');
const newPhotoLinkInInput = photoAddingForm.querySelector('#photo-link');

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

const closePopupButtonHandler = (event) => {
  const popupToClose = event.target.closest('.popup');
  closePopup(popupToClose);
};

const photoAddingButtonClickHandler = () => {
  photoAddingForm.reset();
  openPopup(photoAddingPopup);
};

function setPopups() {
  setEventHandler({ objectToSet: photoAddingForm, handler: submitPhotoAddingFormHandler, event: 'submit' });
  setEventHandler({ objectToSet: infoEditingForm, handler: submitInfoEditingFormHandler, event: 'submit' });
  popupClosingButtons.forEach((button) => {
    setEventHandler({ objectToSet: button, handler: closePopupButtonHandler, event: 'click' });
  });
  setEventHandler({ objectToSet: photoAddingButton, handler: photoAddingButtonClickHandler, event: 'click' });
  setEventHandler({ objectToSet: infoEditingButton, handler: infoEditingButtonClickHandler, event: 'click' });
}

export {photosGallary, setPopups};
