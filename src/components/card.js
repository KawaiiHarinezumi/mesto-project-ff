import { addLikeAPI, removeLikeAPI } from "./api.js";

// константы
const cardTemplate = document.querySelector('#card-template').content; //получаем содержимое темплейта
const cardContainer = document.querySelector('.places__list'); //куда будем добавлять карточки

// функция создания карточки
function addCard(cardData, deleteCard, likeCard, viewImage, userID) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); //клонируем темплейт
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;
  
  if(userID === cardData.owner._id){ 
    deleteButton.addEventListener('click', deleteCard.bind(cardData._id)); //слушатель кнопки удаления
  } else {
    deleteButton.remove();
  }
  
  if (cardData.likes.some(e => e._id === userID)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  cardImage.addEventListener('click', viewImage);  //слушатель клика по картинке
  likeButton.addEventListener('click', likeCard.bind([cardData._id, likeCounter])); //слушатель кнопки лайка

  return cardElement;
}

// функция рендера карточки
export function renderCard(card, deleteCard, viewImage, userID) {
  const cardElement = addCard(card, deleteCard, likeCard, viewImage, userID);

  cardContainer.prepend(cardElement);
}

// функция лайка
function likeCard(evt) {
  const likeButton = evt.target;
  
  if(likeButton.classList.contains('card__like-button_is-active')) {
    removeLikeAPI(this[0])
    .then((res) => {
      likeButton.classList.toggle('card__like-button_is-active');
      this[1].textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
  } else {
    addLikeAPI(this[0])
    .then((res) => {
      likeButton.classList.toggle('card__like-button_is-active');
      this[1].textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
  }
}