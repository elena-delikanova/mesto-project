import './../pages/index.css';
import { validationParams, initialCards } from './data.js';
import addNewPhotoToGallary from './card.js';
import enableValidation from './validate.js';
import setPopups from './modal.js';

initialCards.forEach((cardInfo) => {
  addNewPhotoToGallary({ name: cardInfo.name, link: cardInfo.link });
});

setPopups();
enableValidation(validationParams);
