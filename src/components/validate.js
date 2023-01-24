/* Валидация форм */

// функция показа ошибки //
export function showInputError(inputEl, inputErrEl, inputErrorClass) {
  inputEl.classList.add(inputErrorClass);
  inputErrEl.textContent = inputEl.validationMessage;
  // все работает с одним постоянным классом только на textContent // inputErrEl.classList.add('popup__input-error_active'); //
}


// функция скрытия ошибки //
export function hideInputError(inputEl, inputErrEl, inputErrorClass) {
  inputEl.classList.remove(inputErrorClass);
  inputErrEl.textContent = '';
  // все работает с одним постоянным классом только на textContent // inputErrEl.classList.remove('popup__input-error_active'); //
}


// функция проверки валидности //
export function isValid(inputEl, inputErrEl, inputErrorClass) {
  if (!inputEl.validity.valid) {
    showInputError(inputEl, inputErrEl, inputErrorClass);
  } else {
    hideInputError(inputEl, inputErrEl, inputErrorClass);
  }
}


// функция поиска невалидного поля //
export function hasInvalidInput(inputArray) {
  return inputArray.some(function (array) {
    return !array.validity.valid;
  });
}


// функция стилизации кнопки //
export function toggleButton(inputArray, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputArray)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(inactiveButtonClass);    
    buttonElement.removeAttribute('disabled');
  }
}

/* старая функция function toggleButton(inputArray, buttonElement) {
  if (hasInvalidInput(inputArray)) {
    buttonElement.classList.add('popup__input-submit_inactive');
  } else {
    buttonElement.classList.remove('popup__input-submit_inactive');
  }
} */


// функция добавления слушателя с функцией проверки валидности всем текстовым инпутам формы //
export function setTextInputsEventListeners(form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass) {
  const formTextInputs = form.querySelectorAll(inputSelector);
  const formTextInputsArray = Array.from(formTextInputs);
  const button = form.querySelector(submitButtonSelector);
  toggleButton(formTextInputsArray, button, inactiveButtonClass);
  formTextInputsArray.forEach(function (inputEl) {
    const inputErrEl = document.querySelector(`.${inputEl.id}-error`);
    inputEl.addEventListener('input', function () {
      isValid(inputEl, inputErrEl, inputErrorClass);
      toggleButton(formTextInputsArray, button, inactiveButtonClass);
    });
  });
}

/* старая функция function setTextInputsEventListeners(form) {
  const formTextInputs = form.querySelectorAll('.popup__input-text');
  const formTextInputsArray = Array.from(formTextInputs);
  const button = form.querySelector('.popup__input-submit');
  toggleButton(formTextInputsArray, button);
  formTextInputsArray.forEach(function (inputEl) {
    const inputErrEl = document.querySelector(`.${inputEl.id}-error`);
    inputEl.addEventListener('input', function () {
      isValid(inputEl, inputErrEl);
      toggleButton(formTextInputsArray, button);
    });
  });
} */


// функция добавления setTextInputsEventListeners всем формам //
export function enableValidation({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass }) {
  const allFormsV = document.querySelectorAll(formSelector);
  const allFormsArray = Array.from(allFormsV);
  allFormsArray.forEach(function (form) {
    setTextInputsEventListeners(form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass);
  });
};

/* старая функция function enableValidation() {
  const allFormsArray = Array.from(allForms);
  allFormsArray.forEach(function (form) {
    setTextInputsEventListeners(form);
  });
};

enableValidation(); */


/* эксперементировал "кнопки close: очищение текстового содержимого и стилей ошибок (у меня они продолжали оставаться без этого), можно еще сделать esc и клик по оверлею"
inputErrors.forEach(function (errorItem) {
  const popup = errorItem.closest('.popup'); 
  const button = popup.querySelector('.popup__close');
  const errorItemInput = document.querySelector(`#${errorItem.id.replace('-error', '')}`);
  button.addEventListener('click', function () {
    hideInputError(errorItemInput, errorItem);
  });
}); */