import Popup from './Popup.js';
import { disableButtonInElement } from '../components/validate.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._form = this._popupElement.querySelector('.form');
    this._submitButtonSelector = '.form__save-button';
    this._inactiveButtonClass = 'form__save-button_inactive';
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._submitButtonInitianText = this._submitButton.textContent;
    this._handleFormSubmit = handleFormSubmit;
    this._setEventListeners();
  }

  _setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
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
    console.log('Тук')
    disableButtonInElement({
      element: this._form,
      buttonSelector: this._submitButtonSelector,
      inactiveButtonClass: this._inactiveButtonClass,
    });
    super.open();
  }
}
