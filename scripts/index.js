// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; //получаем содержимое темплейта

// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list'); //куда будем добавлять карточки

// @todo: Функция создания карточки
function addCard(link, name, dlt) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); //клонируем темплейт
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__title').textContent = name;

  const dltButton = cardElement.querySelector('.card__delete-button'); //кнопка удаления
  dltButton.addEventListener('click', dlt);

  cardContainer.append(cardElement);
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  const deleteButton = evt.target;
  const cardItem = deleteButton.closest('.places__item');
  cardItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  addCard(item.link, item.name, deleteCard);
})