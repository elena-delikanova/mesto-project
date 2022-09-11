import { apiConfig as config } from './data.js';
const headers = config.headers;
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, { headers }).then(checkResponse);
};

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, { headers }).then(checkResponse);
};

const updateUserInfo = (infoToUpdate) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(infoToUpdate),
  }).then(checkResponse);
};

const updateUserAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then(checkResponse);
};

const postCard = (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers,
    body: JSON.stringify(card),
  }).then(checkResponse);
};

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers,
  }).then(checkResponse);
};

const setLike = (cardId) => {
  console.log(cardId);
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers,
  }).then(checkResponse);
};

const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers,
  }).then(checkResponse);
};

export { getInitialCards, getUserInfo, updateUserInfo, postCard, setLike, deleteLike, deleteCard, updateUserAvatar };
