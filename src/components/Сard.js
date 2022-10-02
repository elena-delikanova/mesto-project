import { photoCardTemplateSelector } from '../utils/constants.js';

export default class Card {
  constructor(
    { name, link, likes, _id, owner },
    userId,
    deletingButtonClickHandler,
    photoLikeButtonClickHandler,
    imageClickHandler,
  ) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this.id = _id;
    this._ownerId = owner._id;
    this._userId = userId;
    this._deletingButtonClickHandler = deletingButtonClickHandler;
    this._photoLikeButtonClickHandler = photoLikeButtonClickHandler;
    this._imageClickHandler = imageClickHandler;
    this._photoCardTemplate = document.querySelector(photoCardTemplateSelector).content;

  }

  _getElement() {
    const photoCardElement = this._photoCardTemplate.querySelector('.photos__photo-card').cloneNode(true);
    return photoCardElement;
  }

  _setEventListeners() {
    this._image.addEventListener('click', this._imageClickHandler);
    this._photoDeletingButton.addEventListener('click', this._deletingButtonClickHandler);
    this._photoLikeButton.addEventListener('click', () => {
      this._photoLikeButtonClickHandler(this);
    });
  }

  _setLikeButtonStatus() {
    if (this._userId) {
      const isLikedByCurrentUser = this._likes.some((userInfo) => {
        return userInfo._id === this._userId;
      });
      if (isLikedByCurrentUser) {
        this._photoLikeButton.classList.add(this._activeLikeClass);
      }
    }
  }

  generate() {
    this._element = this._getElement();
    this._image = this._element.querySelector('.photos__photo');
    this._caption = this._element.querySelector('.photos__photo-caption');
    this._photoDeletingButton = this._element.querySelector('.photos__delete-button');
    this._photoLikeButton = this._element.querySelector('.photos__like-button');
    this._photoLikeCounter = this._element.querySelector('.photos__like-counter');
    this._activeLikeClass = 'photos__like-button_active';
    this._isCurrentUserCard = this._ownerId === this._userId;

    this._caption.textContent = this._name;
    this._image._id = this.id;
    this._image.src = this._link;
    this._image.alt = `Фотография ${this._name}`;
    this._photoLikeCounter.textContent = this._likes.length;

    this._setEventListeners();
    this._setLikeButtonStatus();
    if (!this._isCurrentUserCard) {
      this._photoDeletingButton.remove();
    }

    return this._element;
  }

  updateLikes({action = 'add', likesLength}) {
    this._photoLikeCounter.textContent = likesLength;
    this._photoLikeButton.classList[action](this._activeLikeClass);
  }
}
