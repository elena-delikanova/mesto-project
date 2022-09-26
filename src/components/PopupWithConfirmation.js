/* Изначально сделали вот такой вариант, чтобы не дублировать _setEventListeners и некоторые объвления переменных. Проблема тут в том, что open надо вызывать на собственный, а из прародителя. Работающий вариант нашли, но он выглядит не очень красиво. Есть ли более изящный способ к нему обратиться? Или лучше оставить текущий вариант с расширением Popup?*/

/*
import PopupWithForm from "./PopupWithForm.js";
export default class PopupWithConfirmation extends PopupWithForm {
  constructor({popupSelector, handleFormSubmit}) {
    super({popupSelector, handleFormSubmit});
  }

  open() {
    Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(this))).open.call(this);
  }
}*/

import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._form = this._popupElement.querySelector('.form');
    this._handleFormSubmit = handleFormSubmit;
    this._setEventListeners();
  }

  _setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}
