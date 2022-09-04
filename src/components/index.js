import './../pages/index.css';
import { validationParams, initialCards } from './data.js';
import { renderPhotoCard, createPhotoCard} from './card.js';
import enableValidation from './validate.js';
import { photosGallary, setPopups} from './modal.js';

initialCards.forEach((cardInfo) => {
  const card = createPhotoCard({ name: cardInfo.name, link: cardInfo.link });
  renderPhotoCard({ card: card, container: photosGallary });
});

setPopups();
enableValidation(validationParams);
