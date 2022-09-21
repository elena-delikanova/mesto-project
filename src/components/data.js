// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
const elbrusImage = new URL('./../images/elbrus_balkaria.jpg', import.meta.url);
const kamchatkaImage = new URL('./../images/kamchatka.jpg', import.meta.url);
const krestovskytImage = new URL('./../images/krestovsky.jpg', import.meta.url);
const miceImage = new URL('./../images/novosib_mice.jpg', import.meta.url);
const balkariaImage = new URL('./../images/upper_balkaria.jpg', import.meta.url);
const courtyardImage = new URL('./../images/well_courtyard.jpg', import.meta.url);

const initialCards = [
  {
    name: 'Гора Эльбрус',
    link: elbrusImage,
  },
  {
    name: 'Полуостров Камчатка',
    link: kamchatkaImage,
  },
  {
    name: 'Стадион Крестовский (Газпром Арена) в Санкт-Петербурге',
    link: krestovskytImage,
  },
  {
    name: 'Памятник лабораторной мыши, вяжущей нить ДНК',
    link: miceImage,
  },
  {
    name: 'Верхняя Балкария',
    link: balkariaImage,
  },
  {
    name: 'Петербуржский двор-колодец',
    link: courtyardImage,
  },
];

const validationParams = {
  formSelector: '.form',
  fieldsetSelector: '.form__set',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__input_type_error',
  activeInputErrorClass: 'form__input-error_active',
};

export { validationParams, initialCards };
