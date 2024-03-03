import '../pages/index.css';
import {renderCard} from '../components/card.js';
import {openPopup, closePopup} from '../components/modal.js';
import {enableValidation, clearValidation} from '../components/validation.js';
import {getUserData, getCards, changeProfile, addCardAPI, deleteCardAPI, changeAvatarAPI} from '../components/api.js';

// константы кнопок и попапов
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');

const cardAddButton = document.querySelector('.profile__add-button');
const cardAddPopup = document.querySelector('.popup_type_new-card');

const cardDeletePopup = document.querySelector('.popup_type_delete-card');

const imageViewPopup = document.querySelector('.popup_type_image');
const imageShown = imageViewPopup.querySelector('.popup__image');
const imageShownTitle = imageViewPopup.querySelector('.popup__caption');

const avatarEditPopup = document.querySelector('.popup_type_edit-avatar');
const avatarInput = avatarEditPopup.querySelector('.popup__input_type_url');
const formEditAvatar = avatarEditPopup.querySelector('[name="edit-avatar"]');

// константы профиля редактирования
const formElementProfile = document.querySelector('[name="edit-profile"]');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_description');
const nameProfile = document.querySelector('.profile__title');
const descProfile = document.querySelector('.profile__description');
const imageProfile = document.querySelector('.profile__image');

// константы добавления карточки
const formElementCard = document.querySelector('[name="new-place"]');
const nameCard = formElementCard.querySelector('.popup__input_type_card-name');
const imageInput = formElementCard.querySelector('.popup__input_type_url');

// константы удаления карточки
const formDeleteCard = document.querySelector('[name="delete-card"]');

// константа валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
};

// переменные данных
let userID = '';
let cardIDtoDelete = '';
let cardItemtoDelete = '';

// функция загрузки пользователя
function loadUser() {
  const promises = [getUserData(), getCards()];
  Promise.all(promises)
  .then((res) => {
    nameProfile.textContent = res[0].name;
    descProfile.textContent = res[0].about;
    imageProfile.style = `background-image: url('${res[0].avatar}')`;
    userID = res[0]._id;
    res[1].reverse().forEach((item) => {
      renderCard(item, deleteCard, viewImage, userID);
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  }); 
}

// функция редактирования данных пользователя
function handleFormSubmit(evt) {
  renderLoading(true, evt.submitter);
  evt.preventDefault();

  const profileData = {
    name: nameInput.value,
    desc: jobInput.value,
  }

  changeProfile(profileData)
  .then((res) => {
    nameProfile.textContent = res.name;
    descProfile.textContent = res.about;
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally((res) => {
    closePopup(profileEditPopup);
    renderLoading(false, evt.submitter);
  })
}

// функция редактирования аватара
function handleAvatarSubmit(evt) {
  renderLoading(true, evt.submitter);
  evt.preventDefault();

  changeAvatarAPI(avatarInput.value)
  .then((res) => {
    imageProfile.style = `background-image: url('${res.avatar}')`;
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally((res) => {
    closePopup(avatarEditPopup);
    renderLoading(false, evt.submitter);
  })
}

// функция добавления новой карточки
function handleCardSubmit(evt) {
  renderLoading(true, evt.submitter);
  evt.preventDefault();
  
  const cardData = {
    name: nameCard.value,
    link: imageInput.value,
  }

  addCardAPI(cardData)
  .then((res) => {
    renderCard(res, deleteCard, viewImage, userID);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally((res) => {
    closePopup(cardAddPopup);
    renderLoading(false, evt.submitter);
  })
}

// функция открытия картинки
function viewImage(evt) {
  imageShown.src = evt.target.src;
  imageShown.alt = evt.target.alt;
  imageShownTitle.textContent = evt.target.alt;

  openPopup(imageViewPopup);
}

// функция вызова попапа удаления карточки
function deleteCard(evt) {
  const deleteButton = evt.target;
  cardItemtoDelete = deleteButton.closest('.places__item');

  cardIDtoDelete = this;

  openPopup(cardDeletePopup);
}

// функция удаления карточки
function handleCardDelete(evt) {
  evt.preventDefault();

  deleteCardAPI(cardIDtoDelete)
  .then((res) => {
    cardItemtoDelete.remove();
    cardIDtoDelete = '';
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally((res) => {
    closePopup(cardDeletePopup);
  })
}

// функция процесса загрузки
function renderLoading(isLoading, button) {
  if(isLoading) {
    button.textContent = `${button.textContent}...`;
  } else {
    button.textContent = button.textContent.substring(0, button.textContent.length - 3);
  }
}

// слушатели кнопок и отправки форм
profileEditButton.addEventListener('click', function(evt) {
  nameInput.value = nameProfile.textContent;
  jobInput.value = descProfile.textContent;

  clearValidation(formElementProfile, validationConfig);
  openPopup(profileEditPopup);
});

cardAddButton.addEventListener('click', function(evt) {
  nameCard.value = '';
  imageInput.value = '';

  clearValidation(formElementCard, validationConfig);
  openPopup(cardAddPopup);
});

imageProfile.addEventListener('click', function(evt) {
  avatarInput.value = '';
  
  clearValidation(formEditAvatar, validationConfig);
  openPopup(avatarEditPopup);
})

formElementProfile.addEventListener('submit', handleFormSubmit); // слушатель формы редактирования страницы
formElementCard.addEventListener('submit', handleCardSubmit); // слушатель формы добавления новой карточки
formDeleteCard.addEventListener('submit', handleCardDelete); // слушатель формы подтверждения удаления карточки
formEditAvatar.addEventListener('submit', handleAvatarSubmit); // слушатель формы изменения аватара

// @todo: валидация форм
enableValidation(validationConfig);

loadUser();