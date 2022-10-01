export default class FormValidator {
  constructor({
    formSelector,
    fieldsetSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    activeInputErrorClass,
  }) {
    this._formSelector = formSelector;
    this._fieldsetSelector = fieldsetSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._activeInputErrorClass = activeInputErrorClass;
    this._formList = Array.from(document.querySelectorAll(this._formSelector));
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState({ inputList, buttonElement });
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity({ inputElement, formElement });
        this._toggleButtonState({ inputList, buttonElement });
      });
    });
  }

  _toggleButtonState({ inputList, buttonElement }) {
    if (this._hasInvalidInput(inputList)) {
      this.disableSubmitButton(buttonElement);
    } else {
      this.enableSubmitButton(buttonElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _checkInputValidity({ inputElement, formElement }) {
    if (!inputElement.validity.valid) {
      if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
      } else {
        inputElement.setCustomValidity('');
      }
      this._showInputError({ inputElement, formElement });
    } else {
      this._hideInputError({ inputElement, formElement });
    }
  }

  _showInputError({ formElement, inputElement }) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._activeInputErrorClass);
  }

  _hideInputError({ formElement, inputElement }) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._activeInputErrorClass);
    errorElement.textContent = '';
  }

  disableSubmitButton(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  }

  enableSubmitButton(buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.disabled = false;
  }

  enableValidation() {
    this._formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      const fieldsetList = Array.from(formElement.querySelectorAll(this._fieldsetSelector));
      fieldsetList.forEach((fieldset) => {
        this._setEventListeners(fieldset);
      });
    });
  }
}
