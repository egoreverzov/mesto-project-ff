// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');
const profileName = document.querySelector('.profile__title')
const profileDescr = document.querySelector('.profile__description')

const popUps = document.querySelectorAll('.popup');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');

const imgPopupOpen = document.querySelector('.popup_type_image');
const imgPopup = imgPopupOpen.querySelector('.popup__image');
const imgPopupDescr = imgPopupOpen.querySelector('.popup__caption');

const formEdit = document.forms['edit-profile'];
const cardInputName = formEdit.elements.name;
const cardInputOccupation = formEdit.elements.description;

const formAddCard = document.forms['new-place'];
const cardInputPlaceName = formAddCard.elements['place-name'];
const cardInputLink = formAddCard.elements.link;

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closePopupBtns = document.querySelectorAll('.popup__close');

// imports
import '../pages/index.css';
import { createCard, removeCardElement, handleLike } from '../components/card.js';
import { openPopup, closePopup } from '../components/modal.js';
import { initialCards } from './cards.js';


// @todo: Вывести карточки на страницу
initialCards.forEach(item => { 
  const addedCard = createCard(item, removeCardElement, openPopupImg, handleLike);
  cardsList.append(addedCard);
});

// функция добавления модального окна картинки
function openPopupImg(objFromCard) {
  imgPopup.src = objFromCard.src;
  imgPopup.alt = objFromCard.alt;
  imgPopupDescr.textContent = objFromCard.alt;

  openPopup(imgPopupOpen);
}

// функция добавления класса каждому попапу для его плавного открытия
popUps.forEach(item => {
  item.classList.add('popup_is-animated');
})

// проход по всем кнопкам удаления с удалением мод окна
closePopupBtns.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// вызовы функций
editButton.addEventListener('click', () => {
  openPopup(editPopup);
  cardInputName.value = profileName.textContent;
  cardInputOccupation.value = profileDescr.textContent;
});

addButton.addEventListener('click', () => { 
  openPopup(addPopup);
});

// изменить имя/описание в модальном окне
function handleEditForm(evt) {
  evt.preventDefault(); 

  const cardNameValue = cardInputName.value;
  const cardOccupationValue = cardInputOccupation.value;

  profileName.textContent = cardNameValue;
  profileDescr.textContent = cardOccupationValue;

  closePopup(editPopup);
}

formEdit.addEventListener('submit', handleEditForm); 

// добавить новую карточку в список
function addNewCard(evt) {
  evt.preventDefault(); 

  const newCardObj = {
    name: cardInputPlaceName.value,
    link: cardInputLink.value,
  };

  const newCard = createCard(newCardObj, removeCardElement, openPopupImg, handleLike);
  cardsList.prepend(newCard);

  evt.currentTarget.reset();
  closePopup(addPopup);
}

formAddCard.addEventListener('submit', addNewCard);






