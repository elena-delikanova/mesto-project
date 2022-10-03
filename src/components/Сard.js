export default class Card {
  constructor(
    { name, link, likes, _id, owner },
    userId,
    deletingButtonClickHandler,
    photoLikeButtonClickHandler,
    imageClickHandler,
    templateSelector,
  ) {
    this.id = _id;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._ownerId = owner._id;
    this._userId = userId;
    this._deletingButtonClickHandler = deletingButtonClickHandler;
    this._photoLikeButtonClickHandler = photoLikeButtonClickHandler;
    this._imageClickHandler = imageClickHandler;
    this._templateSelector = templateSelector;
    this._photoCardTemplate = document.querySelector(this._templateSelector).content;

  }

  _getElement() {
    const photoCardElement = this._photoCardTemplate.querySelector('.photos__photo-card').cloneNode(true);
    return photoCardElement;
  }

  _setEventListeners() {
    this._image.addEventListener('click', this._imageClickHandler);
    this._photoDeletingButton.addEventListener('click', this._deletingButtonClickHandler);
    this.photoLikeButton.addEventListener('click', () => {
      this._photoLikeButtonClickHandler(this);
    });
  }

  _setLikeButtonStatus() {
    if (this._userId) {
      const isLikedByCurrentUser = this._likes.some((userInfo) => {
        return userInfo._id === this._userId;
      });
      if (isLikedByCurrentUser) {
        this.photoLikeButton.classList.add(this.activeLikeClass);
      }
    }
  }

  generate() {
    this._element = this._getElement();
    this._image = this._element.querySelector('.photos__photo');
    this._caption = this._element.querySelector('.photos__photo-caption');
    this._photoDeletingButton = this._element.querySelector('.photos__delete-button');

    this._photoLikeCounter = this._element.querySelector('.photos__like-counter');
    this._isCurrentUserCard = this._ownerId === this._userId;

    this._caption.textContent = this._name;
    this._image._id = this.id;
    this._image.src = this._link;
    this._image.alt = `Фотография ${this._name}`;
    this._photoLikeCounter.textContent = this._likes.length;

    this.photoLikeButton = this._element.querySelector('.photos__like-button');
    this.activeLikeClass = 'photos__like-button_active';

    this._setEventListeners();
    this._setLikeButtonStatus();
    if (!this._isCurrentUserCard) {
      this._photoDeletingButton.remove();
    }

    return this._element;
  }

  updateLikes({action = 'add', likesLength}) {
    this._photoLikeCounter.textContent = likesLength;
    this.photoLikeButton.classList[action](this.activeLikeClass);
  }
}
