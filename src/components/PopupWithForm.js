import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, closeButtonSelector, handleFormSubmit, disableSubmitButton }) {
    super({ popupSelector, closeButtonSelector });
    this._form = this._popupElement.querySelector('.form');
    this._submitButtonSelector = '.form__save-button';
    this._inactiveButtonClass = 'form__save-button_inactive';
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._submitButtonInitianText = this._submitButton.textContent;
    this._handleFormSubmit = handleFormSubmit;
    this._disableSubmitButton = disableSubmitButton;
  }

  _submitFormHandler = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  };

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', this._submitFormHandler);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener('submit', this._submitFormHandler);
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  resetForm() {
    this._form.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this._submitButtonInitianText;
    }
  }

  open() {
    this._disableSubmitButton(this._submitButton);
    super.open();
  }
}
