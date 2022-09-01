const validationParams = {
  formSelector: '.form',
  fieldsetSelector: '.form__set',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__input_type_error',
  activeInputErrorClass: 'form__input-error_active',
};
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

export {validationParams, initialCards};
