// токен
const token = 'cf791a1a-25ef-4fca-8258-53a9d49cba1e';
const cohort = 'wff-cohort-7';
const serverURL = 'https://nomoreparties.co/v1';

// константы профиля
const avatar = document.querySelector('.profile__image');
const name = document.querySelector('.profile__title');
const about = document.querySelector('.profile__description');

// обработчик ошибок
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json()
    .then((error) => {
      error.httpResponseCode = res.status;
      return Promise.reject(error);
    })
}

// запрос информации о пользователе с сервера
export function getUserData() {
  return fetch(`${serverURL}/${cohort}/users/me`, {
    headers: {
      authorization: token,
    }
  })
  .then(checkResponse)
}

// запрос информации о карточках с сервера
export function getCards() {
  return fetch(`${serverURL}/${cohort}/cards`, {
    headers: {
      authorization: token,
    }
  })
  .then(checkResponse)
}

// изменение данных пользователя на сервере
export function changeProfile(profileData) {
  return fetch(`${serverURL}/${cohort}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: profileData.name,
      about: profileData.desc
    })
  })
  .then(checkResponse)
}

// изменение аватара пользователя на сервере
export function changeAvatarAPI(avatarURL) {
  return fetch(`${serverURL}/${cohort}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      avatar: avatarURL,
    })
  })
  .then(checkResponse);
}

// отправка данных новой карточки на сервер
export function addCardAPI(cardData) {
  return fetch(`${serverURL}/${cohort}/cards`, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link
    })
  })
  .then(checkResponse)
}

// удаление карточки
export function deleteCardAPI(cardID) {
  return fetch(`${serverURL}/${cohort}/cards/${cardID}`, {
    method: 'DELETE',
    headers: {
      authorization: token,
    }
  })
  .then(checkResponse)
}

// добавление лайка
export function addLikeAPI(cardID) {
  return fetch(`${serverURL}/${cohort}/cards/likes/${cardID}`, {
    method: 'PUT',
    headers: {
      authorization: token,
    }
  })
  .then(checkResponse)
}

// удаление лайка
export function removeLikeAPI(cardID) {
  return fetch(`${serverURL}/${cohort}/cards/likes/${cardID}`, {
    method: 'DELETE',
    headers: {
      authorization: token,
    }
  })
  .then(checkResponse)
}