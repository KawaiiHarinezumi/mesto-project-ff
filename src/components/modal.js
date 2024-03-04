// функция открытия модального окна
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}

// функция закрытия модального окна
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

// функция нажатия на крестик
export function pressCross(evt) {
    const crossButton = evt.target;
    const popup = crossButton.closest('.popup');
    
    closePopup(popup);
  }
  
// функция нажатия на оверлей
export function pressOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}
  
// функция нажатия на Esc
export function pressEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closePopup(popup);
  }
}