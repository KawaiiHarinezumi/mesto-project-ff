// функция открытия модального окна
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');

  document.addEventListener('keydown', pressEsc);
  document.addEventListener('click', pressOverlay);
  popup.querySelector('.popup__close').addEventListener('click', pressCross);
}

// функция закрытия модального окна
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', pressEsc);
  document.removeEventListener('click', pressOverlay);
  popup.querySelector('.popup__close').removeEventListener('click', pressCross);
}

// функция нажатия на крестик
function pressCross(evt) {
    const crossButton = evt.target;
    const popup = crossButton.closest('.popup');
    
    closePopup(popup);
  }
  
  // функция нажатия на оверлей
  function pressOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
    }
  }
  
  // функция нажатия на Esc
  function pressEsc(evt) {
    if (evt.key === 'Escape') {
      const popup = document.querySelector('.popup_is-opened');
      closePopup(popup);
    }
  }