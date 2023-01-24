import { createCard } from './card.js';
import { cardsElement, popupEdit, popupAdd, inputNameEdit, inputNameAdd, profileName, inputStatusEdit, inputLinkAdd, profileStatus, allPopupsArray } from './utils.js';

export function closeByEsc(evt) {
  const evtKey = evt.key;
  if (evtKey === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
}  

// функции закрытия и открытия попапа //
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
};

export function closePopup(popup) {
  document.addEventListener('keydown', closeByEsc);
  popup.classList.remove('popup_opened');
};

// альтернативное закрытие попапов через клик по оверлею и esc//
export function closePopupWithOverlayClick() {
  allPopupsArray.forEach(function (popupCurrent) {
    popupCurrent.addEventListener('mousedown', function (evt) {
      const evtTarget = evt.target;
      if (evtTarget.classList.contains('popup')) {
        closePopup(popupCurrent);
      }
    });
  });
}

/* export function closePopupWithEscPress() {
  allPopupsArray.forEach(function (popupCurrent) {
    document.addEventListener('keydown', function (evt) {
      const evtKey = evt.key;
      if (evtKey === "Escape") {
        closePopup(popupCurrent);
      }
    });
  });
} */