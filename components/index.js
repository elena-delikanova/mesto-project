import { validationParams, initialCards } from './data.js';
import addNewPhotoToGallary from './card.js';
import enableValidation from './validate.js';

initialCards.forEach((cardInfo) => {
  addNewPhotoToGallary({ name: cardInfo.name, link: cardInfo.link });
});

enableValidation(validationParams);
