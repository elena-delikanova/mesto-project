import { openPopup } from './modal.js';

const photoOpeningPopup = document.querySelector('.popup-photo');
const photoCardTemplate = document.querySelector('#photo-card').content;
const photoElementInPopup = photoOpeningPopup.querySelector('.popup-photo__photo');
const photoCaptionElement = photoOpeningPopup.querySelector('.popup-photo__photo-caption');

function createPhotoCard(params) {
  const photoCardElement = photoCardTemplate.querySelector('.photos__photo-card').cloneNode(true);
  const image = photoCardElement.querySelector('.photos__photo');
  const caption = photoCardElement.querySelector('.photos__photo-caption');
  const photoDeletingButton = photoCardElement.querySelector('.photos__delete-button');
  const photoLikeButton = photoCardElement.querySelector('.photos__like-button');
  caption.textContent = params.name;
  image.src = params.link;
  image.alt = `Фотография ${params.name}`;
  image.addEventListener('click', (event) => {
    photoElementInPopup.src = params.link;
    photoElementInPopup.alt = `Фотография ${params.name}`;
    photoCaptionElement.textContent = params.name;
    photoCaptionElement.style.width = photoElementInPopup.clientWidth + 'px';
    openPopup(photoOpeningPopup);
  });
  photoDeletingButton.addEventListener('click', (event) => {
    const deletedPhoto = event.target.parentElement;
    deletedPhoto.remove();
  });
  photoLikeButton.addEventListener('click', () => {
    photoLikeButton.classList.toggle('photos__like-button_active');
  });
  return photoCardElement;
}

export { createPhotoCard };
