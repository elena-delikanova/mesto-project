import { openPopup } from './modal.js';
import { setLike, deleteLike } from './api.js';

const photoOpeningPopup = document.querySelector('.popup-photo');
const photoCardTemplate = document.querySelector('#photo-card').content;
const photoElementInPopup = photoOpeningPopup.querySelector('.popup-photo__photo');
const photoCaptionElement = photoOpeningPopup.querySelector('.popup-photo__photo-caption');

function createPhotoCard({ name, link, likes, _id, owner }, userId, deletingButtonClickHandler) {
  // console.log(...arguments);
  const photoCardElement = photoCardTemplate.querySelector('.photos__photo-card').cloneNode(true);
  const image = photoCardElement.querySelector('.photos__photo');
  const caption = photoCardElement.querySelector('.photos__photo-caption');
  const photoDeletingButton = photoCardElement.querySelector('.photos__delete-button');
  const photoLikeButton = photoCardElement.querySelector('.photos__like-button');
  const photoLkeCounter = photoCardElement.querySelector('.photos__like-counter');
  const activeLikeClass = 'photos__like-button_active';
  const isCurrentUserCard = owner._id === userId;
  image._id = _id;
  caption.textContent = name;
  image.src = link;
  image.alt = `Фотография ${name}`;
  image.addEventListener('click', () => {
    photoElementInPopup.src = link;
    photoElementInPopup.alt = `Фотография ${name}`;
    photoCaptionElement.textContent = name;
    photoCaptionElement.style.width = photoElementInPopup.clientWidth + 'px';
    openPopup(photoOpeningPopup);
  });
  if (isCurrentUserCard) {
    photoDeletingButton.addEventListener('click', deletingButtonClickHandler);
  } else {
    photoDeletingButton.remove();
  }
  photoLkeCounter.textContent = likes.length;
  if (userId) {
    const isLikedByCurrentUser = likes.some((userInfo) => {
      return userInfo._id === userId;
    });
    if (isLikedByCurrentUser) {
      photoLikeButton.classList.add(activeLikeClass);
    }
  }
  photoLikeButton.addEventListener('click', () => {
    if (photoLikeButton.classList.contains(activeLikeClass)) {
      deleteLike(_id)
        .then((res) => {
          photoLkeCounter.textContent = res.likes.length;
          photoLikeButton.classList.remove(activeLikeClass);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLike(_id)
        .then((res) => {
          photoLkeCounter.textContent = res.likes.length;
          photoLikeButton.classList.add(activeLikeClass);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  return photoCardElement;
}

export { createPhotoCard };
