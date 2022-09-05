import { checkFromValidity } from './validate.js';
import { validationParams } from './data.js';

const popupEscapeHandler = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

const popupClickHandler = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};

const closePopupButtonHandler = (event) => {
  const popupToClose = event.target.closest('.popup');
  closePopup(popupToClose);
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', popupClickHandler);
  document.addEventListener('keydown', popupEscapeHandler);
  checkFromValidity(popup, validationParams);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', popupClickHandler);
  document.removeEventListener('keydown', popupEscapeHandler);
}

export { closePopupButtonHandler, openPopup, closePopup};
