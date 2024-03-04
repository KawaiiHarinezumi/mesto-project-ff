// функция вывода текста ошибки
function showInputError(inputElement, errorMessage, validationConfig) {
  inputElement.classList.add(validationConfig.inputErrorClass);
  inputElement.nextElementSibling.textContent = errorMessage;
  inputElement.nextElementSibling.classList.add(validationConfig.errorClass);
};

// функция скрытия текста ошибки
function hideInputError(inputElement, validationConfig) {
  inputElement.classList.remove(validationConfig.inputErrorClass);
  inputElement.nextElementSibling.classList.remove(validationConfig.errorClass);
  inputElement.nextElementSibling.textContent = '';
};

// функция проверки корректности ввода поля
function checkInputValidity (inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.patternError);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(inputElement, validationConfig);
  }
};

// функция проверки корректности ввода формы
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// функция отключения/включения кнопки
function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

// функция слушателей полей ввода
function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

// функция запуска валидации
export function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};

// функция очистки ошибок (при открытии формы)
export function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    
  inputList.forEach((inputElement) => {
    hideInputError(inputElement, validationConfig);
  });
  toggleButtonState(inputList, buttonElement, validationConfig);
}

