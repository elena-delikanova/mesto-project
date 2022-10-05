export default class Popup {
  constructor({ popupSelector, closeButtonSelector }) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(this._popupSelector);
    this._closeButtonSelector = closeButtonSelector;
    this._closeButton = this._popupElement.querySelector(this._closeButtonSelector);
  }

  _setEventListeners() {
    this._closeButton.addEventListener('click', this._closeButtonClickHandler);
    this._popupElement.addEventListener('mousedown', this._handleOverlay);
    document.addEventListener('keydown', this._escapeHandler);
  }

  _removeEventListeners() {
    this._closeButton.removeEventListener('click', this._closeButtonClickHandler);
    this._popupElement.removeEventListener('mousedown', this._handleOverlay);
    document.removeEventListener('keydown', this._escapeHandler);
  }

  _escapeHandler = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  _handleOverlay = (evt) => {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  };

  _closeButtonClickHandler = () => {
    this.close();
  };

  open() {
    this._popupElement.classList.add('popup_opened');
    this._setEventListeners();
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    this._removeEventListeners();
  }
}
