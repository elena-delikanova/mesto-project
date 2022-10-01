export const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    'authorization': '8fa0e13a-d0e0-42e8-8028-4ced854c725e',
    'Content-Type': 'application/json',
  },
};

export const photoCardTemplate = document.querySelector('#photo-card').content;

export const validationParams = {
  formSelector: '.form',
  fieldsetSelector: '.form__set',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__input_type_error',
  activeInputErrorClass: 'form__input-error_active',
};
export const popupClosingButtonSelector = '.popup__close-button';

export const photoAddingButton = document.querySelector('.profile__add-button');
export const infoEditingButton = document.querySelector('.profile__edit-button');
export const photosGallary = document.querySelector('.photos__gallary');

export const avatarEditingButton = document.querySelector('.profile__avatar-edit-button');

export const loader = document.querySelector('.loader');
