// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');
// profile elements
const profileName = document.querySelector('.profile__title')
const profileDescr = document.querySelector('.profile__description')
const profilePhoto = document.querySelector('.profile__image');

// avatar form
const formAvatar = document.forms['avatar-profile'];
const avatarInput = formAvatar.elements.avatar;
const avatarPopUp = document.querySelector('.popup_type_avatar');

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
const confirmPopUp = document.querySelector('.popup_type_delete-card');
const confirmBtn = confirmPopUp.querySelector('.popup__button');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closePopupBtns = document.querySelectorAll('.popup__close');

let currentUserId = null;


// imports
import '../pages/index.css';
import { createCard, handleLike, hasMyLike } from '../components/card.js';
import { openPopup, closePopup } from '../components/modal.js';
import { enableValidation, validationConfig, clearConfig, clearValidation } from './validation.js';
import { getUserData, getCardsArray, updateCardServ, newCard, deleteCardApi, newAvatar } from './api.js';


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

// открытие попапа с формой редкатирования профиля
editButton.addEventListener('click', () => {
  openPopup(editPopup);

  cardInputName.value = profileName.textContent;
  cardInputOccupation.value = profileDescr.textContent;

  clearValidation(formEdit, clearConfig);
});

// открытие попапа с формой добавления места
addButton.addEventListener('click', () => { 
  openPopup(addPopup);

  cardInputPlaceName.value = '';
  cardInputLink.value = '';

  clearValidation(formAddCard, clearConfig);
});

profilePhoto.addEventListener('click', () => {
  openPopup(avatarPopUp);

  avatarInput.value = '';

  clearValidation(formAvatar, clearConfig);
})

function changeAvatar(evt) {
  evt.preventDefault();

  formAvatar.querySelector('.popup__button').textContent = 'Сохранение...'
  newAvatar(avatarInput.value)
    .then((newPicture) => {
      profilePhoto.style.backgroundImage = `url(${newPicture.avatar})`
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formAvatar.querySelector('.popup__button').textContent = 'Сохранено'
    })
  
    closePopup(avatarPopUp);
}

formAvatar.addEventListener('submit', changeAvatar);

// изменить имя/описание в модальном окне
function handleEditForm(evt) {
  evt.preventDefault(); 

  formEdit.querySelector('.popup__button').textContent = 'Сохранение...'
  updateCardServ(cardInputName.value, cardInputOccupation.value)
    .then((personData) => {
      profileName.textContent = personData.name;
      profileDescr.textContent = personData.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formEdit.querySelector('.popup__button').textContent = 'Сохранено'
    })

  closePopup(editPopup);
}

formEdit.addEventListener('submit', handleEditForm); 

// добавить новую карточку в список
function addNewCard(evt) {
  evt.preventDefault(); 

  formAddCard.querySelector('.popup__button').textContent = 'Создание...'
  newCard(cardInputPlaceName.value, cardInputLink.value)
    .then((card) => {
      const newCard = createCard(card, openPopupImg, handleLike, openConfirmWindow);
      cardsList.prepend(newCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
        formAddCard.querySelector('.popup__button').textContent = 'Создать'
    })

  evt.currentTarget.reset();
  closePopup(addPopup);
}

formAddCard.addEventListener('submit', addNewCard);


// открытие окна подтверждения удаления поста
function openConfirmWindow(currentCard, cardId) {
  openPopup(confirmPopUp);
  confirmBtn.addEventListener('click', () => {
    deleteCardApi(cardId)
      .then(() => {
        currentCard.remove();
        closePopup(confirmPopUp);
      })
      .catch((err => {
        console.log(err);
      }))
  })
}

// вызов функции живой валидации
enableValidation(validationConfig);

// добавление карточек на страницу + информация о пользователе
function addCardAndInfo() {
  return Promise.all([getUserData(), getCardsArray()])
  .then(([userData, cardsInitial]) => {
    console.log(userData, cardsInitial);

    const { name, about, avatar } = userData;

    profileName.textContent = name;
    profileDescr.textContent = about;
    profilePhoto.style.backgroundImage = `url(${avatar})`;

    currentUserId = userData['_id']
    // console.log(currentUserId)
   
    // вывести карточки на страницу
    cardsInitial.forEach(item => { 
      const addedCard = createCard(item, openPopupImg, handleLike, openConfirmWindow);
      if (currentUserId !== item.owner['_id']) {
        addedCard.querySelector('.card__delete-button').classList.add('card__delete-button-hidden');
      }
      if (hasMyLike(item, currentUserId)) {
        addedCard.querySelector('.card__like-button').classList.add('card__like-button_is-active');
      }
      cardsList.append(addedCard);
    });
  })
  .catch((err) => {
    console.log(err);
  })
}

addCardAndInfo()






