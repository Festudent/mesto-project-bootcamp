import './pages/index.css';

// поиск элементов DOM //
const template = document.querySelector('#template');
const cardsElement = document.querySelector('.elements');
const editButton = document.querySelector('.profile__button_type_edit');
const popupEdit = document.querySelector('.popup-edit');
const addButton = document.querySelector('.profile__button_type_add');
const popupAdd = document.querySelector('.popup-add');
const inputNameEdit = popupEdit.querySelector('.popup-edit__input-text');
const inputNameAdd = popupAdd.querySelector('.popup-add__input-text');
const profileName = document.querySelector('.profile__name');
const inputStatusEdit = popupEdit.querySelector('.popup-edit__input-text:nth-child(3)');
const inputLinkAdd = popupAdd.querySelector('.popup-add__input-text:nth-child(3)');
const profileStatus = document.querySelector('.profile__status');
const closeButtons = document.querySelectorAll('.popup__close');
const popupForms = document.querySelectorAll('.popup__form');
const formElementEdit = popupEdit.querySelector('.popup-edit__form');
const formElementAdd = popupAdd.querySelector('.popup-add__form');
const cardsElements = document.querySelector('.elements');
const popupWithImage = document.querySelector('.popup-zoom');
const popupImage = document.querySelector('.popup__image');
const popupText = document.querySelector('.popup__text');
const inputErrors = document.querySelectorAll('.popup__input-error');
const allForms = document.querySelectorAll('.popup__form');
const allPopups = document.querySelectorAll('.popup');

// массив карточек //
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


// функция создания карточки //
function createCard(sourceLink, sourceTitle) {
  const cardElement = template.content.cloneNode(true);

  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__title');

  cardImage.setAttribute('src', sourceLink);
  cardImage.setAttribute('alt', sourceTitle);
  cardTitle.textContent = sourceTitle;

  return cardElement;
};

// добавление изначальных карточек на страницу //

initialCards.forEach(function (item) {
  cardsElement.append(createCard(item.link, item.name));
});

/* альтернатива
function addCards(cardsInfo) {
  for (let i = 0; i < cardsInfo.length; i = i + 1) {
  cardsElement.append(createCard(cardsInfo[i].link, cardsInfo[i].name));
}
}; 

addCards(initialCards); */


// функции закрытия и открытия попапа //
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};


// кнопки edit и add: открытие модальных окон // 
editButton.addEventListener('click', function () {
  openPopup(popupEdit);
  inputNameEdit.setAttribute('value', profileName.textContent);
  inputStatusEdit.setAttribute('value', profileStatus.textContent);
});

addButton.addEventListener('click', function () {
  openPopup(popupAdd);
});


// кнопки close: закрытие модальных окон и очищение форм//
closeButtons.forEach(function (button) {
  const popupToClose = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popupToClose));
});

popupForms.forEach(function (form) {
  const popup = form.closest('.popup');
  const button = popup.querySelector('.popup__close');
  button.addEventListener('click', () => form.reset());
});


// альтернативное закрытие попапов через клик по оверлею и esc//
const allPopupsArray = Array.from(allPopups);

function closePopupWithOverlayClick() {
  allPopupsArray.forEach(function (popupCurrent) {
    popupCurrent.addEventListener('click', function (evt) {
      const evtTarget = evt.target;
      if (evtTarget.classList.contains('popup')) {
        closePopup(popupCurrent);
      }
    });
  });
}

closePopupWithOverlayClick();

function closePopupWithEscPress() {
  allPopupsArray.forEach(function (popupCurrent) {
    document.addEventListener('keydown', function (evt) {
      const evtKey = evt.key;
      if (evtKey === "Escape") {
        closePopup(popupCurrent);
      }
    });
  });
}

closePopupWithEscPress();


// отправка формы - редактирование элементов страницы //
function handleFormEditSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = inputNameEdit.value;
  profileStatus.textContent = inputStatusEdit.value;

  closePopup(popupEdit);
}

formElementEdit.addEventListener('submit', handleFormEditSubmit);


// отправка формы - добавление нового элемента //
function handleFormAddSubmit(evt) {
  evt.preventDefault();

  cardsElement.prepend(createCard(inputLinkAdd.value, inputNameAdd.value));

  evt.target.reset();
  closePopup(popupAdd);
}

formElementAdd.addEventListener('submit', handleFormAddSubmit);


// Лайк и снятие лайка, удаление карточки, увеличение карточки (попап) //
cardsElements.addEventListener('click', function (evt) {
  const evtTarget = evt.target;

  if (evtTarget.classList.contains('element__like') && (!evtTarget.classList.contains('element__like_active'))) {
    evtTarget.classList.add('element__like_active');
  } else if (evtTarget.classList.contains('element__like_active')) {
    evtTarget.classList.remove('element__like_active');
  } else if (evtTarget.classList.contains('element__delete')) {
    const deletingItem = evtTarget.closest('.element');
    deletingItem.remove();
  } else if (evtTarget.classList.contains('element__image')) {
    openPopup(popupWithImage);
    popupImage.setAttribute('src', evtTarget.getAttribute('src'));
    popupImage.setAttribute('alt', evtTarget.getAttribute('alt'));
    const elementItem = evtTarget.closest('.element');
    const elementText = elementItem.querySelector('.element__title');
    popupText.textContent = elementText.textContent;
  }
});


/* Валидация форм */

// функция показа ошибки //
function showInputError(inputEl, inputErrEl) {
  inputEl.classList.add('popup__input-text_error');
  inputErrEl.textContent = inputEl.validationMessage;
  // все работает с одним постоянным классом только на textContent // inputErrEl.classList.add('popup__input-error_active'); //
}

// функция скрытия ошибки //
function hideInputError(inputEl, inputErrEl) {
  inputEl.classList.remove('popup__input-text_error');
  inputErrEl.textContent = '';
  // все работает с одним постоянным классом только на textContent // inputErrEl.classList.remove('popup__input-error_active'); //
}

// функция проверки валидности //
function isValid(inputEl, inputErrEl) {
  if (!inputEl.validity.valid) {
    showInputError(inputEl, inputErrEl);
  } else {
    hideInputError(inputEl, inputErrEl);
  }
}

// функция поиска невалидного поля //
function hasInvalidInput(inputArray) {
  return inputArray.some(function (array) {
    return !array.validity.valid;
  });
}

// функция стилизации кнопки //
/* старая функция function toggleButton(inputArray, buttonElement) {
  if (hasInvalidInput(inputArray)) {
    buttonElement.classList.add('popup__input-submit_inactive');
  } else {
    buttonElement.classList.remove('popup__input-submit_inactive');
  }
} */

function toggleButton(inputArray, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputArray)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}


// функция добавления слушателя с функцией проверки валидности всем текстовым инпутам формы //
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

function setTextInputsEventListeners(form, inputSelector, submitButtonSelector, inactiveButtonClass) {
  const formTextInputs = form.querySelectorAll(inputSelector);
  const formTextInputsArray = Array.from(formTextInputs);
  const button = form.querySelector(submitButtonSelector);
  toggleButton(formTextInputsArray, button, inactiveButtonClass);
  formTextInputsArray.forEach(function (inputEl) {
    const inputErrEl = document.querySelector(`.${inputEl.id}-error`);
    inputEl.addEventListener('input', function () {
      isValid(inputEl, inputErrEl);
      toggleButton(formTextInputsArray, button, inactiveButtonClass);
    });
  });
}

// функция добавления setTextInputsEventListeners всем формам //
/* старая функция function enableValidation() {
  const allFormsArray = Array.from(allForms);
  allFormsArray.forEach(function (form) {
    setTextInputsEventListeners(form);
  });
};

enableValidation(); */

function enableValidation({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass }) {
  const allFormsV = document.querySelectorAll(formSelector);
  const allFormsArray = Array.from(allFormsV);
  allFormsArray.forEach(function (form) {
    setTextInputsEventListeners(form, inputSelector, submitButtonSelector, inactiveButtonClass);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__input-submit',
  inactiveButtonClass: 'popup__input-submit_inactive',
  // у меня элемент ошибки работает с постоянным классом // inputErrorClass: 'popup__input-text_error', //
});

// кнопки close: очищение текстового содержимого и стилей ошибок (у меня они продолжали оставаться без этого) //
inputErrors.forEach(function (errorItem) {
  const popup = errorItem.closest('.popup');
  const button = popup.querySelector('.popup__close');
  const errorItemInput = document.querySelector(`#${errorItem.id.replace('-error', '')}`);
  button.addEventListener('click', function () {
    hideInputError(errorItemInput, errorItem);
  });
});