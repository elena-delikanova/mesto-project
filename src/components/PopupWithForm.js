import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, closeButtonSelector, handleFormSubmit }) {
    super({ popupSelector, closeButtonSelector });
    this._form = this._popupElement.querySelector('.form');
    this._submitButtonSelector = '.form__save-button';
    this._inactiveButtonClass = 'form__save-button_inactive';
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._submitButtonInitianText = this._submitButton.textContent;
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll('.form__input');
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
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }


  setInputValues(data) {
    console.log(data);
    this._inputList.forEach((input) => {
      console.log(input);
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this._submitButtonInitianText;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}
