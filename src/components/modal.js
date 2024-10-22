// функция добавления модального окна
function openPopup(element) {
  element.classList.add('popup_is-opened');

  document.addEventListener('keydown', escClosePopup);
  element.addEventListener('click', clickClosePopup);
}

// функция удаления модального окна
function closePopup(element) {
  element.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', escClosePopup);
  element.removeEventListener('click', clickClosePopup);
}

// функция удаления модального окна на esc
function escClosePopup(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closePopup(popup);
  }
}

// функция удаления модального окна по клику на оверлей
function clickClosePopup(evt) {
  if (evt.currentTarget === evt.target) {
    const popup = document.querySelector('.popup_is-opened');
    closePopup(popup);
  }
}

export { openPopup, closePopup, clickClosePopup }