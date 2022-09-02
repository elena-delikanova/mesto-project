import { openPopup } from './utils.js';

const openPhotoPopup = document.querySelector('.popup-photo');
const photosGallary = document.querySelector('.photos__gallary');

export default function addNewPhotoToGallary(params) {
  const photoCardTemplate = document.querySelector('#photo-card').content;
  const photoCardElement = photoCardTemplate.querySelector('.photos__photo-card').cloneNode(true);
  const image = photoCardElement.querySelector('.photos__photo');
  const caption = photoCardElement.querySelector('.photos__photo-caption');
  const deleteButton = photoCardElement.querySelector('.photos__delete-button');
  const likeButton = photoCardElement.querySelector('.photos__like-button');
  caption.textContent = params.name;
  image.src = params.link;
  image.alt = `Фотография ${params.name}`;
  image.addEventListener('click', (event) => {
    console.log('Кликнули');
    const photoElementInPopup = openPhotoPopup.querySelector('.popup-photo__photo');
    const photoCaptionElement = openPhotoPopup.querySelector('.popup-photo__photo-caption');
    photoElementInPopup.src = event.target.src;
    photoElementInPopup.alt = event.target.alt;
    photoCaptionElement.textContent = event.target.parentElement.querySelector('.photos__photo-caption').textContent;
    /* При длинной подписи к фото ее растягивает больше, чем на ширину экрана. Если задать максимальный размер подписи в 75vw получается не очень красиво, если картинка узкая. Google дает в качестве варианта использование display: table для figure и display: table-caption для подписи, но это не помогло. Единственное, что мне пришло в голову -- высчитать вот так. Наверное, есть более изящный способ. Подскажите, пожалуйста, если вам не трудно. Спасибо!*/
    photoCaptionElement.style.width = photoElementInPopup.clientWidth + 'px';
    openPopup(openPhotoPopup);
  });
  deleteButton.addEventListener('click', (event) => {
    const deletedPhoto = event.target.parentElement;
    deletedPhoto.remove();
  });
  likeButton.addEventListener('click', (event) => {
    event.target.classList.toggle('photos__like-button_active');
  });
  photosGallary.prepend(photoCardElement);
}
