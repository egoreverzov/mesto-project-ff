// @todo: Функция создания карточки

function createCard(card, openImgPopupModal, onLike, delCardApi) {
  const cardsTemplate = document.querySelector('#card-template').content;
  const cardsElement = cardsTemplate.querySelector('.card').cloneNode(true);

  const cardRemoveBtn = cardsElement.querySelector('.card__delete-button');
  const cardImage = cardsElement.querySelector('.card__image');
  const cardTitle = cardsElement.querySelector('.card__title');
  const likeCount = cardsElement.querySelector('.card__like-count');
  const likeBtn = cardsElement.querySelector('.card__like-button');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  likeCount.textContent = card.likes.length;
  
  cardRemoveBtn.addEventListener('click', () => {
    delCardApi(cardsElement, card['_id']);
  });

  likeBtn.addEventListener('click', (evt) => {
    // console.log(card['_id']);
    onLike(evt, card['_id'], likeCount);
  });

  cardImage.addEventListener('click', () => {
    openImgPopupModal({ src: card.link, alt: card.name });
  });

  return cardsElement;
}

// @todo: Функция удаления карточки
// function removeCardElement(cardElem) {
//   cardElem.remove();
// }


// функция обработки лайка - если клик на сердечко, меняем его состояние
function handleLike(evt, cardId, likeNumber) {
  const likeBtn = evt.target;

  if (!likeBtn.classList.contains('card__like-button_is-active')) {
    addLikeApi(cardId)
      .then((res) => {
        likeBtn.classList.add('card__like-button_is-active')
        likeNumber.textContent = res.likes.length;
      })
      .catch(err => console.log(err))
  } else {
    deleteLikeApi(cardId)
      .then((res) => {
        likeBtn.classList.remove('card__like-button_is-active')
        likeNumber.textContent = res.likes.length;
      })
      .catch(err => console.log(err))
  }
}

function hasMyLike(objLiked, myId) {
  return objLiked.likes.some(likedEl => {
    return likedEl['_id'] === myId;
  })
}

export { createCard, handleLike, hasMyLike }
import { addLikeApi, deleteLikeApi } from "../scripts/api";