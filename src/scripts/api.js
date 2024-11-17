const configInfo = {
  baseUrl: 'https://nomoreparties.co/v1/pwff-cohort-1',
  headers: {
    authorization: '61cdd488-71cb-4a43-8e1b-f3d71b4be19b',
    'Content-Type': 'application/json'
  }
}

const handleResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

const getUserData = () => {
  return fetch(`${configInfo.baseUrl}/users/me`, {
    headers: configInfo.headers
  })
  .then(handleResponse);
}

const getCardsArray = () => {
  return fetch(`${configInfo.baseUrl}/cards`, {
    headers: configInfo.headers
  })
  .then(handleResponse);
}


const updateCardServ = (name, occupation) => {
  return fetch(`${configInfo.baseUrl}/users/me`, {
   method: 'PATCH',
   headers: configInfo.headers,
   body: JSON.stringify({
     name: name,
     about: occupation
   })
  })
  .then(handleResponse)
}

const newCard = (nameCard, linkCard) => {
  return fetch(`${configInfo.baseUrl}/cards`, {
   method: 'POST',
   headers: configInfo.headers,
   body: JSON.stringify({
     name: nameCard,
     link: linkCard
   })
  })
  .then(handleResponse)
}

const deleteCardApi = (cardId) => {
  return fetch(`${configInfo.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: configInfo.headers,
  })
  .then(handleResponse)
}

const addLikeApi = (cardId) => {
  return fetch(`${configInfo.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: configInfo.headers,
  })
  .then(handleResponse)
}

const deleteLikeApi = (cardId) => {
  return fetch(`${configInfo.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: configInfo.headers,
  })
  .then(handleResponse)
}

const newAvatar = (avatarLink) => {
  return fetch(`${configInfo.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: configInfo.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
  .then(handleResponse)
}


export { getUserData, getCardsArray, updateCardServ, newCard, deleteCardApi, addLikeApi, deleteLikeApi, newAvatar, configInfo }