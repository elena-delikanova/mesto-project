const popupEscapeHandler = (evt) => {
  const openedPopup = evt.target.closest('.popup_opened');
  if (evt.key === 'Escape' && openedPopup) {
    closePopup(openedPopup);
  }
};

const popupClickHandler = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  popup.addEventListener('keydown', popupEscapeHandler);
  popup.addEventListener('click', popupClickHandler);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('keydown', popupEscapeHandler);
  popup.removeEventListener('click', popupClickHandler);
}

const setEventHandler = (params) => {
  params.objectToSet.addEventListener(params.event, params.handler);
}

export {openPopup, closePopup, setEventHandler};
