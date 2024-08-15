// @todo: Темплейт карточки
const cardsTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (card, removeCard) {
  const cardsElement = cardsTemplate.cloneNode(true);
  const cardRemove = cardsElement.querySelector('.card__delete-button');

  cardsElement.querySelector('.card__image').src = card.link;
  cardsElement.querySelector('.card__image').alt = card.name;
  cardsElement.querySelector('.card__title').textContent = card.name;
  
  cardRemove.addEventListener('click', removeCard);

  cardsList.append(cardsElement);
}

// @todo: Функция удаления карточки

function removeCardElement (event) {
 const eventTarget = event.target.closest('.card');
 eventTarget.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(item => createCard(item, removeCardElement));