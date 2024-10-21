// функция добавления модального окна
function openPopup(element, escClose) {
  element.classList.add('popup_is-opened');
  document.addEventListener('keydown', escClose);
}

// функция удаления модального окна
function closePopup(element, escClose) {
  element.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escClose);
}

// поиск открытого модального окна с его удалением
function closeCurrentPopUp(openedPopUp, escClose) {
  const popup = document.querySelector('.popup_is-opened');
  openedPopUp(popup, escClose);
}

// функция удаления модального окна на esc
function escClosePopup(evt) {
  if (evt.key === 'Escape') {
    closeCurrentPopUp(closePopup);
  }
}

// функция удаления модального окна по клику на оверлей
function clickClosePopup(evt) {
  if (evt.currentTarget === evt.target) {
    closeCurrentPopUp(closePopup);
  }
}

export { openPopup, closePopup, closeCurrentPopUp, escClosePopup, clickClosePopup }