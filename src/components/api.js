import { apiConfig as config } from './data.js';
const headers = config.headers;

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, { headers }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, { headers }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

const updateUserInfo = (infoToUpdate) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(infoToUpdate),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

const updateUserAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      avatar: avatarLink
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

const postCard = (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers,
    body: JSON.stringify(card),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

const setLike = (cardId) => {
  console.log(cardId);
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export { getInitialCards, getUserInfo, updateUserInfo, postCard, setLike, deleteLike, deleteCard, updateUserAvatar };
