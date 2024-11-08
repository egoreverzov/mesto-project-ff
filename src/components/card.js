// @todo: Функция создания карточки
function createCard({link, name}, removeCard, openImgPopupModal, likeCard) {
  const cardsTemplate = document.querySelector('#card-template').content;
  const cardsElement = cardsTemplate.querySelector('.card').cloneNode(true);

  const cardRemoveBtn = cardsElement.querySelector('.card__delete-button');
  const cardImage = cardsElement.querySelector('.card__image');
  const cardTitle = cardsElement.querySelector('.card__title');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  
  cardRemoveBtn.addEventListener('click', () => removeCard(cardsElement));

  cardsElement.addEventListener('click', likeCard);

  cardImage.addEventListener('click', () => {
    openImgPopupModal({ src: link, alt: name });
  });

  return cardsElement;
}

// @todo: Функция удаления карточки
function removeCardElement(cardElem) {
  cardElem.remove();
}

// функция обработки лайка - если клик на сердечко, меняем его состояние
function handleLike(evt) {
  if (evt.target.classList.contains('card__like-button')) {
   evt.target.classList.toggle('card__like-button_is-active');
  }
}

export { createCard, removeCardElement, handleLike }