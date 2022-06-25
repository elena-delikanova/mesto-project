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
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

const photosGallary = document.querySelector('.photos__gallary');
function addNewPhoto(params) {
  const photoCardTemplate = document.querySelector('#photo-card').content;
  const photoCardElement = photoCardTemplate.querySelector('.photos__photo-card').cloneNode(true);
  photoCardElement.querySelector('.photos__photo').src = params.link;
  photoCardElement.querySelector('.photos__photo-caption').textContent = params.name;
  photoCardElement.querySelector('.photos__photo').alt = `Фотография ${params.name}`;
  photosGallary.prepend(photoCardElement);
}

initialCards.forEach((cardInfo) => {
  addNewPhoto({ name: cardInfo.name, link: cardInfo.link });
});

const addPhotoPopup = document.querySelector('.popup-add-photo');
const addPhotoForm = document.querySelector('.add-photo-form');
addPhotoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newPhotoCaptureInInput = event.target.querySelector('#photo-capture');
  const newPhotoLinkInInput = event.target.querySelector('#photo-link');
  addNewPhoto({
    name: newPhotoCaptureInInput.value,
    link: newPhotoLinkInInput.value,
  });
  newPhotoCaptureInInput.value = '';
  newPhotoLinkInInput.value = '';
  togglePopup(addPhotoPopup);
});

const closePopupButtons = document.querySelectorAll('.popup__close-button');
closePopupButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    togglePopup(event.target.parentElement.parentElement);
  });
});

const addPhotoButton = document.querySelector('.profile__add-button');
addPhotoButton.addEventListener('click', () => {
  togglePopup(addPhotoPopup);
});

const editInfoPopup = document.querySelector('.popup-edit-info');
const editInfoForm = editInfoPopup.querySelector('.edit-form');
const editInfoButton = document.querySelector('.profile__edit-button');

const profileNameInInput = editInfoForm.querySelector('#profile-name');
const profileCaptionInInput = editInfoForm.querySelector('#profile-caption');
const profileNameElement = document.querySelector('.profile__name');
const profileCaptionElement = document.querySelector('.profile__caption');

editInfoButton.addEventListener('click', () => {
  profileNameInInput.value = profileNameElement.textContent;
  profileCaptionInInput.value = profileCaptionElement.textContent;
  togglePopup(editInfoPopup);
});

const saveProfileInfoButton = editInfoPopup.querySelector('.form__save-button');
editInfoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  profileNameElement.textContent = profileNameInInput.value;
  profileCaptionElement.textContent = profileCaptionInInput.value;
  togglePopup(editInfoPopup);
});

const photoElements = photosGallary.querySelectorAll('.photos__photo');
const openPhotoPopup = document.querySelector('.popup-photo');
photoElements.forEach((photoElement) => {
  photoElement.addEventListener('click', (event) => {
    const photoElementInPopup = openPhotoPopup.querySelector('.popup-photo__photo');
    const photoCaptionElement = openPhotoPopup.querySelector('.popup-photo__photo-caption');
    photoElementInPopup.src = event.target.src;
    photoElementInPopup.alt = event.target.alt;
    photoCaptionElement.textContent = event.target.parentElement.querySelector('.photos__photo-caption').textContent;
    togglePopup(openPhotoPopup);
  });
});
