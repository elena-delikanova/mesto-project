import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._photoElementInPopup = this._popupElement.querySelector('.popup-photo__photo');
    this._photoCaptionElement = this._popupElement.querySelector('.popup-photo__photo-caption');
  }

  open({ link, name }) {
    this._photoElementInPopup.src = link;
    this._photoElementInPopup.alt = `Фотография ${name}`;
    this._photoCaptionElement.textContent = name;
    this._photoCaptionElement.style.width = this._photoElementInPopup.clientWidth + 'px';
    super.open();
  }
}
