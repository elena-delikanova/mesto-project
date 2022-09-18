export const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
  headers: {
    'authorization': '8fa0e13a-d0e0-42e8-8028-4ced854c725e',
    'Content-Type': 'application/json',
  },
};

export const photoOpeningPopup = document.querySelector('.popup-photo');
export const photoCardTemplate = document.querySelector('#photo-card').content;
export const photoElementInPopup = photoOpeningPopup.querySelector('.popup-photo__photo');
export const photoCaptionElement = photoOpeningPopup.querySelector('.popup-photo__photo-caption');
