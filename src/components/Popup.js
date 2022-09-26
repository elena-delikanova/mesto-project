export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(this._popupSelector);
  }

  _escapeHandler = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  _clickHandler = (evt) => {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  };

  open() {
    console.log('тЫК')
    this._popupElement.classList.add('popup_opened');
    this._popupElement.addEventListener('click', this._clickHandler);
    document.addEventListener('keydown', this._escapeHandler);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    this._popupElement.removeEventListener('click', this._clickHandler);
    document.removeEventListener('keydown', this._escapeHandler);
  }
}
