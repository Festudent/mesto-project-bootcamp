import '../pages/index.css';
import { getUserInfo, getCards, patchUserInfo, postCard, patchAvatar } from './api.js';
import { enableValidation } from './validate.js';
import { initialCards, createCard } from './card.js';
import { closePopupWithOverlayClick, openPopup, closePopup } from './modal.js';
import { cardsElement, editButton, popupEdit, addButton, popupAdd, inputNameEdit, profileName, inputStatusEdit, profileStatus, closeButtons, popupForms, formElementEdit, formElementAdd, cardsElements, popupWithImage, popupImage, popupText, inputNameAdd, inputLinkAdd, popupAddButton, profileAvatarEditer, popupProfile, popupProfileButton, profileAvatar, inputLinkProfile, formElementProfile, renderCreateLoading, renderSaveLoading, popupEditButton } from './utils.js';

/* getUserInfo();
getCards(); */

Promise.all([getUserInfo(), getCards()])
  .then(([info, cards]) => {
    profileName.textContent = info.name;
    profileStatus.textContent = info.about;
    profileAvatar.setAttribute('src', info.avatar);

    cards.forEach(function (item) {
      cardsElement.append(createCard(item.link, item.name, item.likes.length, item.owner._id, item._id, info._id));
    });
  })
  .catch((err) => {
    console.log(err);
  })


/* добавление изначальных карточек на страницу //
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


// кнопки edit и add: открытие модальных окон и последнее новое окно// 
editButton.addEventListener('click', function () {
  openPopup(popupEdit);
  /* inputNameEdit.setAttribute('value', profileName.textContent);
  inputStatusEdit.setAttribute('value', profileStatus.textContent); */
  inputNameEdit.value = profileName.textContent;
  inputStatusEdit.value = profileStatus.textContent;
});

addButton.addEventListener('click', function () {
  openPopup(popupAdd);
  popupAddButton.classList.add('popup__input-submit_inactive');
  popupAddButton.setAttribute('disabled', 'disabled');
  formElementAdd.reset();
});

profileAvatarEditer.addEventListener('click', function () {
  openPopup(popupProfile);
  popupProfileButton.classList.add('popup__input-submit_inactive');
  popupProfileButton.setAttribute('disabled', 'disabled');
  formElementProfile.reset();
});


// вызов альтернативного закрытия попапов через клик по оверлею и esc//
closePopupWithOverlayClick();
// closePopupWithEscPress(); //


// отправка формы - редактирование элементов страницы //
function handleFormEditSubmit(evt) {
  evt.preventDefault();

  const inputNameEditValue = inputNameEdit.value;
  const inputStatusEditValue = inputStatusEdit.value;

  profileName.textContent = inputNameEditValue;
  profileStatus.textContent = inputStatusEditValue;

  renderSaveLoading(true, popupEditButton);

  patchUserInfo(inputNameEditValue, inputStatusEditValue)
    .then(() => closePopup(popupEdit))
    .catch((err) => {
      console.log(err);
    })
}

formElementEdit.addEventListener('submit', handleFormEditSubmit);

// отправка формы - добавление нового элемента //
function handleFormAddSubmit(evt) {
  evt.preventDefault();

  /* cardsElement.prepend(createCard(inputLinkAdd.value, inputNameAdd.value, 0, 'e9ab41b50f47962fecf8f076')); */

  const inputNameAddValue = inputNameAdd.value;
  const inputLinkAddValue = inputLinkAdd.value;

  renderCreateLoading(true, popupAddButton);

  postCard(inputNameAddValue, inputLinkAddValue)
    .then((obj) => {
      console.log(obj);
      cardsElement.prepend(createCard(inputLinkAddValue, inputNameAddValue, obj.likes.length, obj.owner._id, obj._id));
    })
    .then(() => closePopup(popupAdd))
    .catch((err) => {
      console.log(err);
    })
}

formElementAdd.addEventListener('submit', handleFormAddSubmit);


// отправка формы - смена аватара //
function handleFormProfileSubmit(evt) {
  evt.preventDefault();

  const avatarLink = inputLinkProfile.value;

  profileAvatar.setAttribute('src', avatarLink);

  renderSaveLoading(true, popupProfileButton);

  patchAvatar(avatarLink)
    .then(() => closePopup(popupProfile))
    .catch((err) => {
      console.log(err);
    })
}

formElementProfile.addEventListener('submit', handleFormProfileSubmit);



/* Лайк и снятие лайка, удаление карточки, увеличение карточки (попап) - старое
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
}); */

// вызов функции добавления setTextInputsEventListeners всем формам //
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__input-submit',
  inactiveButtonClass: 'popup__input-submit_inactive',
  inputErrorClass: 'popup__input-text_error',
});
