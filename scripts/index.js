const initialCards = [
  {
    name: 'Гора Эльбрус',
    link: './images/elbrus_balkaria.jpg',
  },
  {
    name: 'Полуостров Камчатка',
    link: './images/kamchatka.jpg',
  },
  {
    name: 'Стадион Крестовский (Газпром Арена) в Санкт-Петербурге',
    link: './images/krestovsky.jpg',
  },
  {
    name: 'Памятник лабораторной мыши, вяжущей нить ДНК Памятник лабораторной мыши, вяжущей нить ДНК Памятник лабораторной мыши, вяжущей нить ДНК Памятник лабораторной мыши, вяжущей нить ДНК',
    link: './images/novosib_mice.jpg',
  },
  {
    name: 'Верхняя Балкария',
    link: './images/upper_balkaria.jpg',
  },
  {
    name: 'Петербуржский двор-колодец',
    link: './images/well_courtyard.jpg',
  },
];

const photosGallary = document.querySelector('.photos__gallary');
const addPhotoPopup = document.querySelector('.popup-add-photo');
const addPhotoForm = document.querySelector('.add-photo-form');
const closePopupButtons = document.querySelectorAll('.popup__close-button');
const addPhotoButton = document.querySelector('.profile__add-button');
const editInfoPopup = document.querySelector('.popup-edit-info');
const editInfoButton = document.querySelector('.profile__edit-button');
const profileNameElement = document.querySelector('.profile__name');
const profileCaptionElement = document.querySelector('.profile__caption');
const openPhotoPopup = document.querySelector('.popup-photo');
const editInfoForm = editInfoPopup.querySelector('.edit-form');
const profileNameInInput = editInfoForm.querySelector('#profile-name');
const profileCaptionInInput = editInfoForm.querySelector('#profile-caption');
const saveProfileInfoButton = editInfoPopup.querySelector('.form__save-button');
const photoElements = photosGallary.querySelectorAll('.photos__photo');

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

function addNewPhotoToGallary(params) {
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
    const photoElementInPopup = openPhotoPopup.querySelector('.popup-photo__photo');
    const photoCaptionElement = openPhotoPopup.querySelector('.popup-photo__photo-caption');
    photoElementInPopup.src = event.target.src;
    photoElementInPopup.alt = event.target.alt;
    photoCaptionElement.textContent = event.target.parentElement.querySelector('.photos__photo-caption').textContent;
    /* При длинной подписи к фото ее растягивает больше, чем на ширину экрана. Если задать максимальный размер подписи в 75vw получается не очень красиво, если картинка узкая. Google дает в качестве варианта использование display: table для figure и display: table-caption для подписи, но это не помогло. Единственное, что мне пришло в голову -- высчитать вот так. Наверное, есть более изящный способ. Подскажите, пожалуйста, если вам не трудно. Спасибо!*/
    photoCaptionElement.style.width = photoElementInPopup.clientWidth + 'px';
    togglePopup(openPhotoPopup);
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


addPhotoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newPhotoCaptureInInput = event.target.querySelector('#photo-capture');
  const newPhotoLinkInInput = event.target.querySelector('#photo-link');
  addNewPhotoToGallary({
    name: newPhotoCaptureInInput.value,
    link: newPhotoLinkInInput.value,
  });
  newPhotoCaptureInInput.value = '';
  newPhotoLinkInInput.value = '';
  togglePopup(addPhotoPopup);
});

closePopupButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    togglePopup(event.target.parentElement.parentElement);
  });
});

addPhotoButton.addEventListener('click', () => {
  togglePopup(addPhotoPopup);
});

editInfoButton.addEventListener('click', () => {
  profileNameInInput.value = profileNameElement.textContent;
  profileCaptionInInput.value = profileCaptionElement.textContent;
  togglePopup(editInfoPopup);
});

editInfoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  profileNameElement.textContent = profileNameInInput.value;
  profileCaptionElement.textContent = profileCaptionInInput.value;
  togglePopup(editInfoPopup);
});

initialCards.forEach((cardInfo) => {
  addNewPhotoToGallary({ name: cardInfo.name, link: cardInfo.link });
});
