const initialCards = [
  {
    name: 'Древний храм в Карачаевске',
    link: './images/karachaevsk.jpg',
  },
  {
    name: 'Эльбрус',
    link: './images/elbrus.jpg',
  },
  {
    name: 'Хребет Домбай',
    link: './images/dombai.jpg',
  },
  {
    name: 'Башня Абаевых, с. Верхняя Балкария',
    link: './images/balkaria_tower.jpg',
  },
  {
    name: 'Верхняя Балкария',
    link: './images/balkaria_mountains.jpg',
  },
  {
    name: 'Река Черек',
    link: './images/cherek.jpg',
  },
];

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function addNewPhoto(params) {
  const photosGallary = document.querySelector('.photos__gallary');
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
const savePhotoButton = addPhotoPopup.querySelector('.form__save-button');
const closeAddPhotoPopupButton = addPhotoPopup.querySelector('.popup__close-button');

savePhotoButton.addEventListener('click', (event) => {
  event.preventDefault();
  const newPhotoCaptureInInput = addPhotoPopup.querySelector('#photo-capture');
  const newPhotoLinkInInput = addPhotoPopup.querySelector('#photo-link');
  addNewPhoto({
    name: newPhotoCaptureInInput.value,
    link: newPhotoLinkInInput.value,
  });
  newPhotoCaptureInInput.value = '';
  newPhotoLinkInInput.value = '';
  closePopup(addPhotoPopup);
});

const closePopupButtons = document.querySelectorAll('.popup__close-button');
closePopupButtons.forEach((button) => {
  button.addEventListener('click', () => {
    closePopup(button.parentElement.parentElement);
  });
});

const addPhotoButton = document.querySelector('.profile__add-button');
addPhotoButton.addEventListener('click', () => {
  openPopup(addPhotoPopup);
});

const editInfoPopup = document.querySelector('.popup-edit-info');
const editInfoButton = document.querySelector('.profile__edit-button');
const profileNameInInput = editInfoPopup.querySelector('#profile-name');
const profileCaptionInInput = editInfoPopup.querySelector('#profile-caption');
const profileNameElement = document.querySelector('.profile__name');
const profileCaptionElement = document.querySelector('.profile__caption');
editInfoButton.addEventListener('click', () => {
  profileNameInInput.value = profileNameElement.textContent;
  profileCaptionInInput.value = profileCaptionElement.textContent;
  openPopup(editInfoPopup);
});

const saveProfileInfoButton = editInfoPopup.querySelector('.form__save-button');
saveProfileInfoButton.addEventListener('click', (event) => {
  event.preventDefault();
  profileNameElement.textContent = profileNameInInput.value;
  profileCaptionElement.textContent = profileCaptionInInput.value;
  closePopup(editInfoPopup);
});
