const popupEscapeHandler = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = evt.target.closest('.popup_opened');
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
  popup.addEventListener('keydown', popupEscapeHandler);
  popup.addEventListener('click', popupClickHandler);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('keydown', popupEscapeHandler);
  popup.removeEventListener('click', popupClickHandler);
}

export { closePopupButtonHandler, openPopup, closePopup};
