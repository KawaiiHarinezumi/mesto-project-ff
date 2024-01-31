import './index.js';
import {initialCards} from './cards.js';
import '../pages/index.css';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; //получаем содержимое темплейта

// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list'); //куда будем добавлять карточки

// @todo: Функция создания карточки
function addCard(cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); //клонируем темплейт
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  const deleteButton = cardElement.querySelector('.card__delete-button'); //кнопка удаления
  deleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

function renderCard(card) {
  const cardElement = addCard(card, deleteCard);
  cardContainer.append(cardElement);
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  const deleteButton = evt.target;
  const cardItem = deleteButton.closest('.places__item');
  cardItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  renderCard(item);
});