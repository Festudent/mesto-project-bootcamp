import { createCard } from './card.js';
import { cardsElement, popupEdit, popupAdd, inputNameEdit, inputNameAdd, profileName, inputStatusEdit, inputLinkAdd, profileStatus, closePopup, allPopupsArray } from './utils.js';

// альтернативное закрытие попапов через клик по оверлею и esc//
export function closePopupWithOverlayClick() {
  allPopupsArray.forEach(function (popupCurrent) {
    popupCurrent.addEventListener('click', function (evt) {
      const evtTarget = evt.target;
      if (evtTarget.classList.contains('popup')) {
        closePopup(popupCurrent);
      }
    });
  });
}

export function closePopupWithEscPress() {
  allPopupsArray.forEach(function (popupCurrent) {
    document.addEventListener('keydown', function (evt) {
      const evtKey = evt.key;
      if (evtKey === "Escape") {
        closePopup(popupCurrent);
      }
    });
  });
}


// отправка формы - редактирование элементов страницы //
export function handleFormEditSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = inputNameEdit.value;
  profileStatus.textContent = inputStatusEdit.value;

  closePopup(popupEdit);
}


// отправка формы - добавление нового элемента //
export function handleFormAddSubmit(evt) {
  evt.preventDefault();

  cardsElement.prepend(createCard(inputLinkAdd.value, inputNameAdd.value));

  evt.target.reset();
  closePopup(popupAdd);
}