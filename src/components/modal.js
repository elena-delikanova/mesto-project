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
}

/* Вы написали, что проверку валидации нужно вынести в обработчики открытия конкретных модальных окон. Но ведь, кажется, что валидацию надо запускать для поапов с формами, то есть у нас два попапа с формами, и мне показалось, что пока нет оснований делать для них отдельные функции */
function openPopupWithForm(popup) {
  openPopup(popup);
  const formInPopup = popup.closest('.form');
  if (formInPopup) {
    disableButtonInElement({
      element: formInPopup,
      buttonSelector: '.form__save-button',
      inactiveButtonClass: 'form__save-button_inactive',
    });
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', popupClickHandler);
  document.removeEventListener('keydown', popupEscapeHandler);
}

export { closePopupButtonHandler, openPopup, closePopup, openPopupWithForm };
