/* Изначально сделали вот такой вариант, чтобы не дублировать _setEventListeners и некоторые объвления переменных. Проблема тут в том, что open надо вызывать на собственный, а из прародителя. Работающий вариант нашли, но он выглядит не очень красиво. Есть ли более изящный способ к нему обратиться? Или лучше оставить текущий вариант с расширением Popup?*/

/*
import PopupWithForm from "./PopupWithForm.js";
export default class PopupWithConfirmation extends PopupWithForm {
  constructor({popupSelector, handleFormSubmit, closeButtonSelector}) {
    super({popupSelector, handleFormSubmit, closeButtonSelector});
  }

  open() {
    Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(this))).open.call(this);
  }
}*/

import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor({popupSelector, handleFormSubmit, closeButtonSelector}) {
    super({popupSelector, closeButtonSelector});
    this._form = this._popupElement.querySelector('.form');
    this._handleFormSubmit = handleFormSubmit;
  }

  _submitFormHandler = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit();
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', this._submitFormHandler);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener('submit', this._submitFormHandler);
  }
}
