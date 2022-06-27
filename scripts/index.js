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
const photoAddingPopup = document.querySelector('.popup-add-photo');
const photoAddingForm = document.querySelector('.add-photo-form');
const popupClosingButtons = document.querySelectorAll('.popup__close-button');
const photoAddingButton = document.querySelector('.profile__add-button');
const infoEditingPopup = document.querySelector('.popup-edit-info');
const infoEditingButton = document.querySelector('.profile__edit-button');
const profileNameElement = document.querySelector('.profile__name');
const profileCaptionElement = document.querySelector('.profile__caption');
const photoOpeningPopup = document.querySelector('.popup-photo');
const photoCardTemplate = document.querySelector('#photo-card').content;

const infoEditingForm = infoEditingPopup.querySelector('.edit-form');
const profileNameInInput = infoEditingForm.querySelector('#profile-name');
const profileCaptionInInput = infoEditingForm.querySelector('#profile-caption');
const photoElements = photosGallary.querySelectorAll('.photos__photo');
const photoElementInPopup = photoOpeningPopup.querySelector('.popup-photo__photo');
const photoCaptionElement = photoOpeningPopup.querySelector('.popup-photo__photo-caption');
const newPhotoCaptureInInput = photoAddingForm.querySelector('#photo-capture');
const newPhotoLinkInInput = photoAddingForm.querySelector('#photo-link');

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function createPhotoCard(params) {
  const photoCardElement = photoCardTemplate.querySelector('.photos__photo-card').cloneNode(true);
  const image = photoCardElement.querySelector('.photos__photo');
  const caption = photoCardElement.querySelector('.photos__photo-caption');
  const photoDelitingButton = photoCardElement.querySelector('.photos__delete-button');
  const photoLikeButton = photoCardElement.querySelector('.photos__like-button');
  caption.textContent = params.name;
  image.src = params.link;
  image.alt = `Фотография ${params.name}`;
  image.addEventListener('click', () => {
    photoElementInPopup.src = params.link;
    photoElementInPopup.alt = `Фотография ${params.name}`;
    photoCaptionElement.textContent = params.name;
    /* При длинной подписи к фото ее растягивает больше, чем на ширину экрана. Если задать максимальный размер подписи в 75vw получается не очень красиво, если картинка узкая. Google дает в качестве варианта использование display: table для figure и display: table-caption для подписи, но это не помогло. Единственное, что мне пришло в голову -- высчитать вот так. Наверное, есть более изящный способ. Подскажите, пожалуйста, если вам не трудно. Спасибо!*/
    /* Сделала так, как вы предлагаете (через флекс). Но тогда узкие картинки растягивает на 75vw, см. картинку с мышью. Поэтому пока не убирала, просто закомментировала. */
    // photoCaptionElement.style.width = photoElementInPopup.clientWidth + 'px';
    openPopup(photoOpeningPopup);
  });
  photoDelitingButton.addEventListener('click', (event) => {
    const photoToDelete = event.target.closest('.photos__photo-card');
    photoToDelete.remove();
  });
  photoLikeButton.addEventListener('click', () => {
    /* А почему это лучше, чем event.target? Ведь с event.target мы явно показываем, что действие выполняется именно с самой кнопкой? */
    photoLikeButton.classList.toggle('photos__like-button_active');
  });
  return photoCardElement;
}

// А разве тут не получается, что функция делает два дела? Она сначала создает карточку, а потом помещает ее в галлерею?
function renderPhotoCard(params) {
  const card = createPhotoCard(params);
  photosGallary.prepend(card);
}

photoAddingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPhotoCard({
    name: newPhotoCaptureInInput.value,
    link: newPhotoLinkInInput.value,
  });
  photoAddingForm.reset();
  closePopup(photoAddingPopup);
});

/* Убрала фон, но так крестик теряется на светлых фото. У корзины аналогичная проблема */
popupClosingButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const popupToClose = event.target.closest('.popup');
    const formInPopupToClose = popupToClose.querySelector('.form');
    if (formInPopupToClose) {
      formInPopupToClose.reset();
    }
    closePopup(popupToClose);
  });
});

photoAddingButton.addEventListener('click', () => {
  openPopup(photoAddingPopup);
});

infoEditingButton.addEventListener('click', () => {
  profileNameInInput.value = profileNameElement.textContent;
  profileCaptionInInput.value = profileCaptionElement.textContent;
  openPopup(infoEditingPopup);
});

infoEditingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  profileNameElement.textContent = profileNameInInput.value;
  profileCaptionElement.textContent = profileCaptionInInput.value;
  closePopup(infoEditingPopup);
});

initialCards.forEach((cardInfo) => {
  renderPhotoCard({ name: cardInfo.name, link: cardInfo.link });
});
