import { profileName, profileStatus, profileAvatar, cardsElement, popupProfileButton, popupAddButton, popupEditButton, renderSaveLoading, renderCreateLoading } from './utils.js';
import { createCard } from './card.js';


const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-4',
  headers: {
    authorization: '2ef106a4-d6f6-4482-a3db-9456ba860f85',
    'Content-Type': 'application/json'
  }
}


function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}


export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
    .then(res => getResponseData(res))
}


export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers })
    .then(res => getResponseData(res))
}


export const patchUserInfo = (inputNameEditValue, inputStatusEditValue) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: inputNameEditValue,
      about: inputStatusEditValue
    })
  })
    .then(res => getResponseData(res))
    .finally(() => {
      renderSaveLoading(false, popupEditButton);
    })
}


export const postCard = (inputNameAddValue, inputLinkAddValue) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: inputNameAddValue,
      link: inputLinkAddValue
    })
  })
    .then(res => getResponseData(res))
    .finally(() => {
      renderCreateLoading(false, popupAddButton);
    })
}


export const deleteCardRequest = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => getResponseData(res))
}


export const likeRequest = (cardId, cardLikeCounter) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(res => getResponseData(res))
}

export const likeDeleteRequest = (cardId, cardLikeCounter) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => getResponseData(res))
}

export const patchAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    })
  })
    .then(res => getResponseData(res))
    .finally(() => {
      renderSaveLoading(false, popupProfileButton);
    })
}


/* export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((obj) => {
      profileName.textContent = obj.name;
      profileStatus.textContent = obj.about;
      profileAvatar.setAttribute('src', obj.avatar);
    })
    .catch((err) => {
      console.log(err);
    })
} */


/* export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((obj) => {
      obj.forEach(function (item) {
        cardsElement.append(createCard(item.link, item.name, item.likes.length, item.owner._id, item._id));
      });
    })
    .catch((err) => {
      console.log(err);
    })
} */

/* export const patchUserInfo = (inputNameEdit, inputStatusEdit) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: inputNameEdit.value,
      about: inputStatusEdit.value
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((obj) => {
      console.log(obj);
      renderSaveLoading(false, popupEditButton);
    })
    .catch((err) => {
      console.log(err);
      renderSaveLoading(false, popupEditButton);
    })
}


export const postCard = (inputNameAdd, inputLinkAdd) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: inputNameAdd.value,
      link: inputLinkAdd.value
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((obj) => {
      console.log(obj);
      // //
      cardsElement.prepend(createCard(inputLinkAdd.value, inputNameAdd.value, obj.likes.length, obj.owner._id, obj._id));
      renderCreateLoading(false, popupAddButton);
    })
    .catch((err) => {
      console.log(err);
      renderCreateLoading(false, popupAddButton);
    })
}


export const deleteCardRequest = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((obj) => {
      console.log(obj);
    })
    .catch((err) => {
      console.log(err);
    })
}


export const likeRequest = (cardId, cardLikeCounter) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((obj) => {
      console.log(obj);
      cardLikeCounter.textContent = obj.likes.length;
    })
    .catch((err) => {
      console.log(err);
    })
}

export const likeDeleteRequest = (cardId, cardLikeCounter) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((obj) => {
      console.log(obj);
      cardLikeCounter.textContent = obj.likes.length;
    })
    .catch((err) => {
      console.log(err);
    })
}


export const patchAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .then((obj) => {
      console.log(obj);
      renderSaveLoading(false, popupProfileButton);
    })
    .catch((err) => {
      console.log(err);
      renderSaveLoading(false, popupProfileButton);
    })
} */