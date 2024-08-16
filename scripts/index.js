// @todo: Темплейт карточки
const cardsTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (card, removeCard) {
  const cardsElement = cardsTemplate.querySelector('.card').cloneNode(true);
  const cardRemove = cardsElement.querySelector('.card__delete-button');
  const cardImage = cardsElement.querySelector('.card__image');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardsElement.querySelector('.card__title').textContent = card.name;
  
  cardRemove.addEventListener('click', () => removeCard(cardsElement));

  cardsList.append(cardsElement);
}

// @todo: Функция удаления карточки

function removeCardElement (cardElem) {
 cardElem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(item => createCard(item, removeCardElement));