// добавление карточек на страницу //
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

function addCard(cardsInfo) {

  for (let i = 0; i < cardsInfo.length; i = i + 1) {

    const template = document.querySelector('#template');
    const cardsElement = document.querySelector('.elements');

    const cardElement = template.content.cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    const cardTitle = cardElement.querySelector('.element__title');

    cardImage.setAttribute('src', cardsInfo[i].link);
    cardImage.setAttribute('alt', cardsInfo[i].name);
    cardTitle.textContent = cardsInfo[i].name;

    cardsElement.append(cardElement);
  }
}

addCard(initialCards);

// кнопки edit и add: открытие модальных окон // 
const editButton = document.querySelector('.profile__button_type_edit');
const popupEdit = document.querySelector('.popup');

editButton.addEventListener('click', function () {
  popupEdit.classList.add('popup_opened');

  const inputName = document.querySelector('.popup__input-text');
  const name = document.querySelector('.profile__name');
  inputName.setAttribute('value', name.textContent);

  const inputStatus = document.querySelector('.popup__input-text:nth-child(2)');
  const status = document.querySelector('.profile__status');
  inputStatus.setAttribute('value', status.textContent);
});

const addButton = document.querySelector('.profile__button_type_add');
const popupAdd = document.querySelector('.popup:last-of-type');
addButton.addEventListener('click', function () {
  popupAdd.classList.add('popup_opened');
});

// кнопки close: закрытие модального окна с очищением формы //
const closeButtonEdit = popupEdit.querySelector('.popup__close');

closeButtonEdit.addEventListener('click', function () {
  popupEdit.classList.remove('popup_opened');

  const form = popupEdit.querySelector('.popup__form');
  form.reset();
});

const closeButtonAdd = popupAdd.querySelector('.popup__close');

closeButtonAdd.addEventListener('click', function () {
  popupAdd.classList.remove('popup_opened');

  const form = popupAdd.querySelector('.popup__form');
  form.reset();
});


// отправка формы - редактирование элементов страницы //
const formElementEdit = document.querySelector('.popup__form');
const inputName = document.querySelector('.popup__input-text:first-child');
const inputStatus = document.querySelector('.popup__input-text:nth-child(2)');

// обработчик «отправки» формы, хотя пока она никуда отправляться не будет //
function handleFormSubmit(evt) {
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value
  const nameValue = inputName.value;
  const statusValue = inputStatus.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  const name = document.querySelector('.profile__name');
  const status = document.querySelector('.profile__status');
  // Вставьте новые значения с помощью textContent
  name.textContent = inputName.value;
  status.textContent = inputStatus.value;

  popupEdit.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementEdit.addEventListener('submit', handleFormSubmit);



// отправка формы - добавление нового элемента //
const formElementAdd = popupAdd.querySelector('.popup__form');
const inputNameAdd = popupAdd.querySelector('.popup__input-text:first-child');
const inputLinkAdd = popupAdd.querySelector('.popup__input-text:nth-child(2)');

// обработчик «отправки» формы //
function handleFormAddSubmit(evt) {
  evt.preventDefault();

  const template = document.querySelector('#template');
  const cardsElement = document.querySelector('.elements');

  const cardElement = template.content.cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__title');

  cardImage.setAttribute('src', inputLinkAdd.value);
  cardImage.setAttribute('alt', inputNameAdd.value);
  cardTitle.textContent = inputNameAdd.value;

  cardsElement.prepend(cardElement);

  popupAdd.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementAdd.addEventListener('submit', handleFormAddSubmit);

// Лайк и снятие лайка, удаление карточки, увеличение карточки (попап) //
const cardsElements = document.querySelector('.elements');

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
    const popupWithImage = document.querySelector('.popup:nth-of-type(3)');
    popupWithImage.classList.add('popup_opened');
    const popupImage = popupWithImage.querySelector('.popup__image');
    popupImage.setAttribute('src', evtTarget.getAttribute('src'));
    popupImage.setAttribute('alt', evtTarget.getAttribute('alt'));
    const popupText = popupWithImage.querySelector('.popup__text');
    const elementItem = evtTarget.closest('.element');
    const elementText = elementItem.querySelector('.element__title');
    popupText.textContent = elementText.textContent;
  }
});

const closeButtonImage = document.querySelector('.popup__close_type_image');
const popupWithImage = document.querySelector('.popup:nth-of-type(3)');

closeButtonImage.addEventListener('click', function () {
  popupWithImage.classList.remove('popup_opened');
});