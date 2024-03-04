import { addLikeAPI, removeLikeAPI } from "./api.js";

// константы
const cardTemplate = document.querySelector('#card-template').content; //получаем содержимое темплейта

// функция создания карточки
export function addCard(cardData, deleteCard, viewImage, userID) {
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
    deleteButton.addEventListener('click', () => deleteCard(cardData._id, deleteButton)); //слушатель кнопки удаления
  } else {
    deleteButton.remove();
  }
  
  if (cardData.likes.some(e => e._id === userID)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  cardImage.addEventListener('click', () => viewImage(cardData));  //слушатель клика по картинке
  likeButton.addEventListener('click', () => likeCard(likeButton, cardData._id, likeCounter)); //слушатель кнопки лайка

  return cardElement;
}

// функция лайка
function likeCard(likeButton, cardDataID, likeCounter) {
  if(likeButton.classList.contains('card__like-button_is-active')) {
    removeLikeAPI(cardDataID)
    .then((res) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCounter.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
  } else {
    addLikeAPI(cardDataID)
    .then((res) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCounter.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
  }
}