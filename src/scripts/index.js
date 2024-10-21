// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');
const profileName = document.querySelector('.profile__title')
const profileDescr = document.querySelector('.profile__description')

const popUp = document.querySelectorAll('.popup');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');

const formEdit = document.forms['edit-profile'];
const cardInputName = formEdit.elements.name;
const cardInputOccupation = formEdit.elements.description;

const formAddCard = document.forms['new-place'];
const cardInputPlaceName = formAddCard.elements['place-name'];
const cardInputLink = formAddCard.elements.link;

// open large image by clicking on the card
const imgPopupOpen = document.querySelector('.popup_type_image');
const imgPopup = imgPopupOpen.querySelector('.popup__image');
const imgPopupDescr = imgPopupOpen.querySelector('.popup__caption');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closePopupBtn = document.querySelectorAll('.popup__close');

// imports
import '../pages/index.css';
import { createCard, removeCardElement, handleLike } from '../components/card.js'
import { openPopup, closePopup, closeCurrentPopUp, escClosePopup, clickClosePopup } from '../components/modal.js'
import { initialCards } from './cards.js';

// функция добавления модального окна картинки
function openPopupImg(evt) {
  imgPopup.src = evt.src;
  imgPopup.alt = evt.alt;
  imgPopupDescr.textContent = evt.alt;

  return imgPopupOpen;
}

// @todo: Вывести карточки на страницу
initialCards.forEach(item => { 
  const addedCard = createCard(item, removeCardElement, openPopupImg, handleLike, openPopup, escClosePopup);
  cardsList.append(addedCard);
});

// функция добавления класса каждому попапу для его плавного открытия
popUp.forEach(item => {
  item.classList.add('popup_is-animated');
})

// проход по всем кнопкам удаления с удалением мод окна
closePopupBtn.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup, escClosePopup));
});

// вызовы функций
editButton.addEventListener('click', () => {
  openPopup(editPopup, escClosePopup);
  cardInputName.value = profileName.textContent;
  cardInputOccupation.value = profileDescr.textContent;
});

addButton.addEventListener('click', () => { 
  openPopup(addPopup, escClosePopup);
});

editPopup.addEventListener('click', clickClosePopup);
addPopup.addEventListener('click', clickClosePopup);
imgPopupOpen.addEventListener('click', clickClosePopup);

// изменить имя/описание в модальном окне
function handleFormSubmit(evt) {
  evt.preventDefault(); 

  const cardNameValue = cardInputName.value;
  const cardOccupationValue = cardInputOccupation.value;

  profileName.textContent = cardNameValue;
  profileDescr.textContent = cardOccupationValue;

  closeCurrentPopUp(closePopup, escClosePopup);
}

formEdit.addEventListener('submit', handleFormSubmit); 

// добавить новую карточку в список
function addNewCard(evt) {
  evt.preventDefault(); 

  const newCardObj = {
    name: cardInputPlaceName.value,
    link: cardInputLink.value,
  };

  const newCard = createCard(newCardObj, removeCardElement, openPopupImg, handleLike, openPopup, escClosePopup);
  cardsList.prepend(newCard);

  evt.currentTarget.reset();
  closeCurrentPopUp(closePopup, escClosePopup);
}

formAddCard.addEventListener('submit', addNewCard);






