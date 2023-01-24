import { deleteCardRequest, likeRequest, likeDeleteRequest } from './api.js';
import { openPopup } from './modal.js';
import { template, popupWithImage, popupImage, popupText } from './utils.js';


// массив карточек //
export const initialCards = [
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

function handleCardDelete(id, card) {
  const cardDelete = card.querySelector('.element__delete');
  if (id === 'e9ab41b50f47962fecf8f076') {
    cardDelete.classList.add('element__delete_active');
  } else {
    cardDelete.classList.remove('element__delete_active');
  }
} 


// функция создания карточки //
export function createCard(sourceLink, sourceTitle, sourceLikes, sourceId, sourceCardId) {
  const cardElement = template.content.cloneNode(true);

  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__title');
  const cardLike = cardElement.querySelector('.element__like');
  const cardDelete = cardElement.querySelector('.element__delete');
  const cardLikeCounter = cardElement.querySelector('.element__like-counter');

  cardImage.setAttribute('src', sourceLink);
  cardImage.setAttribute('alt', sourceTitle);
  cardTitle.textContent = sourceTitle;
  cardLikeCounter.textContent = sourceLikes;
  handleCardDelete(sourceId, cardElement);
  cardElement.id = sourceCardId;

  cardLike.addEventListener('click', function (evt) {
    const evtTarget = evt.target;
    if (!evtTarget.classList.contains('element__like_active')) {
      evtTarget.classList.add('element__like_active');
      likeRequest(sourceCardId, cardLikeCounter);
    } else {
      evtTarget.classList.remove('element__like_active');
      likeDeleteRequest(sourceCardId, cardLikeCounter);
    }
  });

  cardDelete.addEventListener('click', function (evt) {
    const evtTarget = evt.target;
    const deletingItem = evtTarget.closest('.element');
    deleteCardRequest(sourceCardId);
    deletingItem.remove();
  });

  cardImage.addEventListener('click', function (evt) {
    openPopup(popupWithImage);
    popupImage.setAttribute('src', cardImage.getAttribute('src'));
    popupImage.setAttribute('alt', cardImage.getAttribute('alt'));
    popupText.textContent = cardTitle.textContent;
  });

  return cardElement;
};