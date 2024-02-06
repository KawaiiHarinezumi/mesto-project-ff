import {openPopup} from './modal.js';

// функция создания карточки
function addCard(cardData, deleteCard, likeCard, imageView) {
  const cardTemplate = document.querySelector('#card-template').content; //получаем содержимое темплейта
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); //клонируем темплейт
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  
  cardImage.src = cardData.link;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', deleteCard); //слушатель кнопки удаления
  cardImage.addEventListener('click', imageView);  //слушатель клика по картинке
  likeButton.addEventListener('click', likeCard); //слушатель кнопки лайка

  return cardElement;
}

// функция открытия картинки
function imageView(evt) {
  const popup = document.querySelector('.popup_type_image');

  popup.querySelector('.popup__image').src = evt.target.src;
  openPopup(popup);
}

// функция рендера карточки
export function renderCard(card) {
  const cardContainer = document.querySelector('.places__list'); //куда будем добавлять карточки
  const cardElement = addCard(card, deleteCard, likeCard, imageView);

  cardContainer.prepend(cardElement);
}

// функция удаления карточки
function deleteCard(evt) {
  const deleteButton = evt.target;
  const cardItem = deleteButton.closest('.places__item');

  cardItem.remove();
}

// функция лайка
function likeCard(evt) {
  const likeButton = evt.target;
  
  likeButton.classList.toggle('card__like-button_is-active');
}