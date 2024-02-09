import './index.js';
import {initialCards} from './cards.js';
import '../pages/index.css';
import {renderCard} from '../components/card.js';
import {openPopup, closePopup} from '../components/modal.js';

// константы кнопок и попапов
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');

const cardAddButton = document.querySelector('.profile__add-button');
const cardAddPopup = document.querySelector('.popup_type_new-card');

const imageViewPopup = document.querySelector('.popup_type_image');
const imageShown = imageViewPopup.querySelector('.popup__image');
const imageShownTitle = imageViewPopup.querySelector('.popup__caption');

// константы профиля редактирования
const formElementProfile = document.querySelector('[name="edit-profile"]');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_description');
const nameProfile = document.querySelector('.profile__title');
const descProfile = document.querySelector('.profile__description');

// константы добавления карточки
const formElementCard = document.querySelector('[name="new-place"]');
const nameCard = formElementCard.querySelector('.popup__input_type_card-name');
const imageInput = formElementCard.querySelector('.popup__input_type_url');

// функция открытия картинки
function viewImage(evt) {
  imageShown.src = evt.target.src;
  imageShown.alt = evt.target.alt;
  imageShownTitle.textContent = evt.target.alt;

  openPopup(imageViewPopup);
}

// функция редактирования страницы
function handleFormSubmit(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  descProfile.textContent = jobInput.value;
  closePopup(profileEditPopup);
}

// функция добавления новой карточки
function handleCardSubmit(evt) {
  
  evt.preventDefault();
  
  const cardData = {
    name: nameCard.value,
    link: imageInput.value,
  }

  renderCard(cardData, viewImage);
  closePopup(cardAddPopup);
}

// слушатели кнопок и отправки форм
profileEditButton.addEventListener('click', function(evt) {
  nameInput.value = nameProfile.textContent;
  jobInput.value = descProfile.textContent;

  openPopup(profileEditPopup);
});

cardAddButton.addEventListener('click', function(evt) {
  nameCard.value = "";
  imageInput.value = "";

  openPopup(cardAddPopup);
});

formElementProfile.addEventListener('submit', handleFormSubmit); // слушатель формы редактирования страницы
formElementCard.addEventListener('submit', handleCardSubmit); // слушатель формы добавления новой карточки

// @todo: выводим карточки на страницу
initialCards.reverse().forEach((item) => {
  renderCard(item, viewImage);
});