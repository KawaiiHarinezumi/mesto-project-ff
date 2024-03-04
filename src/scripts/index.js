import '../pages/index.css';
import {addCard} from '../components/card.js';
import {openPopup, closePopup, pressCross, pressEsc, pressOverlay} from '../components/modal.js';
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
const cardContainer = document.querySelector('.places__list'); //куда будем добавлять карточки
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
  errorClass: 'popup__input-error',
};

// переменные данных
let userID = '';
let cardIDtoDelete = '';
let cardItemtoDelete = '';
let bufferButtonText = '';

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
      renderCard(item, userID);
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
    closePopup(profileEditPopup);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally((res) => {
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
    closePopup(avatarEditPopup);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally((res) => {
    renderLoading(false, evt.submitter);
  })
}

// функция рендера карточки
function renderCard(card, userID) {
  const cardElement = addCard(card, deleteCard, viewImage, userID);

  cardContainer.prepend(cardElement);
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
    renderCard(res, userID);
    closePopup(cardAddPopup);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally((res) => {
    renderLoading(false, evt.submitter);
  })
}

// функция открытия картинки
function viewImage(cardData) {
  imageShown.src = cardData.link;
  imageShown.alt = cardData.name;
  imageShownTitle.textContent = cardData.name;

  openPopup(imageViewPopup);
}

// функция вызова попапа удаления карточки
function deleteCard(cardDataID, deleteButton) {
  cardItemtoDelete = deleteButton.closest('.places__item');

  cardIDtoDelete = cardDataID;

  openPopup(cardDeletePopup);
}

// функция удаления карточки
function handleCardDelete(evt) {
  evt.preventDefault();

  deleteCardAPI(cardIDtoDelete)
  .then((res) => {
    cardItemtoDelete.remove();
    cardIDtoDelete = '';
    closePopup(cardDeletePopup);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
}

// функция процесса загрузки
function renderLoading(isLoading, button) {
  if(isLoading) {
    bufferButtonText = button.textContent;
    button.textContent = `Сохранение...`;
  } else {
    button.textContent = bufferButtonText;
    bufferButtonText = '';
  }
}

// слушатели закрытия попапов
document.addEventListener('keydown', pressEsc);

profileEditPopup.addEventListener('click', pressOverlay);
profileEditPopup.querySelector('.popup__close').addEventListener('click', pressCross);

cardAddPopup.addEventListener('click', pressOverlay);
cardAddPopup.querySelector('.popup__close').addEventListener('click', pressCross);

cardDeletePopup.addEventListener('click', pressOverlay);
cardDeletePopup.querySelector('.popup__close').addEventListener('click', pressCross);

avatarEditPopup.addEventListener('click', pressOverlay);
avatarEditPopup.querySelector('.popup__close').addEventListener('click', pressCross);

imageViewPopup.addEventListener('click', pressOverlay);
imageViewPopup.querySelector('.popup__close').addEventListener('click', pressCross);

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