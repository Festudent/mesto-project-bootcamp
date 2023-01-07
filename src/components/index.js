import '../pages/index.css';
import { enableValidation } from './validate.js';
import { initialCards, createCard } from './card.js';
import { closePopupWithOverlayClick, closePopupWithEscPress, handleFormEditSubmit, handleFormAddSubmit } from './modal.js';
import { cardsElement, editButton, popupEdit, addButton, popupAdd, inputNameEdit, profileName, inputStatusEdit, profileStatus, closeButtons, popupForms, formElementEdit, formElementAdd, cardsElements, popupWithImage, popupImage, popupText, openPopup, closePopup } from './utils.js';


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


// вызов альтернативного закрытия попапов через клик по оверлею и esc//
closePopupWithOverlayClick();
closePopupWithEscPress();


// вызов функции "отправка формы - редактирование элементов страницы" //
formElementEdit.addEventListener('submit', handleFormEditSubmit);


// вызов функции "отправка формы - добавление нового элемента" //
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

// вызов функции добавления setTextInputsEventListeners всем формам //
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__input-submit',
  inactiveButtonClass: 'popup__input-submit_inactive',
  // у меня элемент ошибки работает с постоянным классом // inputErrorClass: 'popup__input-text_error', //
});
