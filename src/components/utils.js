// поиск элементов DOM //
export const template = document.querySelector('#template');
export const cardsElement = document.querySelector('.elements');
export const editButton = document.querySelector('.profile__button_type_edit');
export const popupEdit = document.querySelector('.popup-edit');
export const addButton = document.querySelector('.profile__button_type_add');
export const popupAdd = document.querySelector('.popup-add');
export const inputNameEdit = popupEdit.querySelector('.popup-edit__input-text');
export const inputNameAdd = popupAdd.querySelector('.popup-add__input-text');
export const profileName = document.querySelector('.profile__name');
export const inputStatusEdit = popupEdit.querySelector('.popup-edit__input-text:nth-child(3)');
export const inputLinkAdd = popupAdd.querySelector('.popup-add__input-text:nth-child(3)');
export const profileStatus = document.querySelector('.profile__status');
export const closeButtons = document.querySelectorAll('.popup__close');
export const popupForms = document.querySelectorAll('.popup__form');
export const formElementEdit = popupEdit.querySelector('.popup-edit__form');
export const formElementAdd = popupAdd.querySelector('.popup-add__form');
export const cardsElements = document.querySelector('.elements');
export const popupWithImage = document.querySelector('.popup-zoom');
export const popupImage = document.querySelector('.popup__image');
export const popupText = document.querySelector('.popup__text');
export const inputErrors = document.querySelectorAll('.popup__input-error');
export const allForms = document.querySelectorAll('.popup__form');
export const allPopups = document.querySelectorAll('.popup');
export const popupAddButton = popupAdd.querySelector('.popup__input-submit');

export const profileAvatar = document.querySelector('.profile__avatar');
export const profileAvatarEditer = document.querySelector('.profile__avatar-editer');
export const popupProfile = document.querySelector('.popup-profile');
export const popupProfileButton = popupProfile.querySelector('.popup__input-submit');
export const inputLinkProfile = document.querySelector('.popup-profile__input-text');
export const formElementProfile = popupProfile.querySelector('.popup-profile__form');
export const popupEditButton = popupEdit.querySelector('.popup__input-submit');

// для "альтернативное закрытие попапов через клик по оверлею и esc"//
export const allPopupsArray = Array.from(allPopups);


//  функции для загрузки //
export function renderSaveLoading(isLoading, button) {
  if (isLoading) {
    button.setAttribute('value', 'Сохранение...');
  } else {
    button.setAttribute('value', 'Сохранить');
  }
}

export function renderCreateLoading(isLoading, button) {
  if (isLoading) {
    button.setAttribute('value', 'Создание...');
  } else {
    button.setAttribute('value', 'Создать');
  }
}