import './index.js';
import {initialCards} from './cards.js';
import '../pages/index.css';
import {renderCard} from '../components/card.js';
import {openPopup, closePopup} from '../components/modal.js';

const popupsDict = [
  {
    popup: document.querySelector('.popup_type_edit'),
    button: document.querySelector('.profile__edit-button'),
  },
  {
    popup: document.querySelector('.popup_type_new-card'),
    button: document.querySelector('.profile__add-button'),
  },
];

document.querySelector('.profile').addEventListener('click', function(evt) {
  for (let i = 0; i < popupsDict.length; i++) {
    if (evt.target === popupsDict[i].button) {
      openPopup(popupsDict[i].popup);
      break;
    }
  }
});

// константы профиля
const formElementProfile = document.querySelector('[name="edit-profile"]');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_description');
const nameProfile = document.querySelector('.profile__title');
const descProfile = document.querySelector('.profile__description');

// функция редактирования страницы
function handleFormSubmit(evt) {
  const saveButton = evt.target;
  const popup = saveButton.closest('.popup');
  
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  descProfile.textContent = jobInput.value;
  nameInput.setAttribute('value', nameInput.value);
  jobInput.setAttribute('value', jobInput.value);
  closePopup(popup);
}

// константы добавления карточки
const formElementCard = document.querySelector('[name="new-place"]');
const nameCard = formElementCard.querySelector('.popup__input_type_card-name');
const imageInput = formElementCard.querySelector('.popup__input_type_url');

// функция добавления новой карточки
function handleCardSubmit(evt) {
  const saveButton = evt.target;
  const popup = saveButton.closest('.popup');

  evt.preventDefault();
  
  const cardData = {
    name: nameCard.value,
    link: imageInput.value,
  }

  renderCard(cardData);
  closePopup(popup);
}

formElementProfile.addEventListener('submit', handleFormSubmit); // слушатель формы редактирования страницы
formElementCard.addEventListener('submit', handleCardSubmit); // слушатель формы добавления новой карточки

// @todo: задание дефолтных значений редактирования профиля
nameInput.setAttribute('value', nameProfile.textContent);
jobInput.setAttribute('value', descProfile.textContent);

// @todo: выводим карточки на страницу
initialCards.reverse().forEach((item) => {
  renderCard(item);
});