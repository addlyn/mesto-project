import apiConfig from "./components/config.js";

import Api from "./components/api.js";

import addIcon from "./images/add-icon.svg";
import avatar from "./images/avatar.jpg";
import card_1 from "./images/card_1.jpg";
import card_2 from "./images/card_2.jpg";
import card_3 from "./images/card_3.jpg";
import close from "./images/close.svg";
import deleteIcon from "./images/delete-icon.svg";
import editIcon from "./images/edit-icon.svg";
import likeActive from "./images/like-active.svg";
import likeInactive from "./images/like-inactive.svg";
import logo from "./images/logo.svg";

const Pictures = [
  { name: "AddIcon", link: addIcon },
  { name: "Avatar", link: avatar },
  { name: "Card1", link: card_1 },
  { name: "Card2", link: card_2 },
  { name: "Card3", link: card_3 },
  { name: "Close", link: close },
  { name: "DeleteIcon", link: deleteIcon },
  { name: "EditIcon", link: editIcon },
  { name: "LikeActive", link: likeActive },
  { name: "LikeInactive", link: likeInactive },
  { name: "logo", link: logo },
];

import { checkInputValidity } from "./components/validate.js";

import {
  openModal,
  closeModal,
  addAnimationToPopups,
  addOverlayCloseListeners,
} from "./components/modal.js";

import "./pages/index.css";

const api = new Api(apiConfig);

const userInfo = {
  _id: null,
};

const profileAvatar = document.querySelector(".profile__image");

function createCard(cardData, currentUserId, onLike, onDelete, onRemoveLike) {
  const template = document.querySelector("#card-template").content;
  const cardElement = template.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");

  cardLikeCounter.textContent = cardData.likes.length;

  let likedByUser = cardData.likes.find((user) => user._id === currentUserId);

  if (currentUserId !== cardData.owner._id) {
    deleteButton.remove();
  }

  if (likedByUser) {
    likeButton.classList.add("card__like-button_is-active");
  }

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  likeButton.addEventListener("click", () => {
    if (likedByUser) {
      onRemoveLike(cardData._id)
        .then((resp) => {
          console.log(resp);
          likedByUser = false;
          likeButton.classList.remove("card__like-button_is-active"); // Используем правильный модификатор
          cardLikeCounter.textContent = resp.likes.length;
        })
        .catch((err) => console.warn(err));
    } else {
      onLike(cardData._id)
        .then((resp) => {
          console.log(resp);
          likedByUser = true;
          likeButton.classList.add("card__like-button_is-active"); // Используем правильный модификатор
          cardLikeCounter.textContent = resp.likes.length;
        })
        .catch((err) => console.warn(err));
    }
  });

  deleteButton &&
    deleteButton.addEventListener("click", () => {
      onDelete(cardData._id)
        .then((info) => {
          console.log(info);
          cardElement.remove();
        })
        .catch((err) => console.warn(err));
    });

  cardImage.addEventListener("click", () => {
    openImagePopup(cardData);
  });

  return cardElement;
}

function renderCards(cards) {
  const cardList = document.querySelector(".places__list");

  cards.forEach((cardData) => {
    const card = createCard(
      cardData,
      userInfo._id,
      api.likeCard,
      api.removeCard,
      api.unLikeCard
    );
    cardList.appendChild(card);
  });
}

api
  .getInitialCards()
  .then((allCards) => renderCards(allCards))
  .catch((err) => console.warn(err));

const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const avatarPopup = document.querySelector(".popup_type_avatar");

addAnimationToPopups();

const profileTitle = document.querySelector(".profile__title"); // Имя пользователя на странице
const profileDescription = document.querySelector(".profile__description"); // Описание пользователя

// Поп-ап для редактирования профиля
const profileFormElement = profilePopup.querySelector(".popup__form"); // Форма редактирования профиля

// Поля формы редактирования
const nameInput = profileFormElement.querySelector(".popup__input_type_name"); // Поле ввода имени
const jobInput = profileFormElement.querySelector(
  ".popup__input_type_description"
); 

const editButton = document.querySelector(".profile__edit-button"); // Кнопка "Редактировать"
const profileCloseButton = profilePopup.querySelector(".popup__close"); // Кнопка закрытия поп-апа

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const newUserInfo = {
    name: nameInput.value,
    about: jobInput.value,
  };

  const submitBtn = evt.target.querySelector(".popup__button");

  submitBtn.textContent = "Сохранение...";

  api
    .editProfile(newUserInfo)
    .then((resp) => {
      console.log(resp);
      profileTitle.textContent = resp.name; 
      profileDescription.textContent = resp.about; 

      closeModal(profilePopup);
    })
    .catch((err) => console.warn(err))
    .finally(() => {
      submitBtn.textContent = "Сохранить";
    });
}

editButton.addEventListener("click", openProfilePopup); 
profileCloseButton.addEventListener("click", () => closeModal(profilePopup)); 
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

const cardFormElement = cardPopup.querySelector(".popup__form"); 

const avatarFormElement = avatarPopup.querySelector(".popup__form");

const placeNameInput = cardFormElement.querySelector(
  ".popup__input_type_card-name"
);
const placeLinkInput = cardFormElement.querySelector(".popup__input_type_url"); 
const avatarInput = avatarPopup.querySelector(".popup__input_type_url");

const addButton = document.querySelector(".profile__add-button");
const cardCloseButton = cardPopup.querySelector(".popup__close");

function openProfilePopup() {
  nameInput.value = profileTitle.textContent; 
  jobInput.value = profileDescription.textContent; 
  openModal(profilePopup); 
}

function openCardPopup() {
  placeNameInput.value = ""; 
  placeLinkInput.value = ""; 
  openModal(cardPopup); 
}

function openImagePopup(cardData) {
  const imagePopupImage = imagePopup.querySelector(".popup__image");
  const imagePopupCaption = imagePopup.querySelector(".popup__caption");

  imagePopupImage.src = cardData.link;
  imagePopupImage.alt = cardData.name;
  imagePopupCaption.textContent = cardData.name;

  openModal(imagePopup);
}

function openAvatarPopup() {
  openModal(avatarPopup);
}


addButton.addEventListener("click", openCardPopup); 
cardCloseButton.addEventListener("click", () => closeModal(cardPopup)); 

function togleSaveButton() {
  const saveButton = cardFormElement.querySelector(".popup__button");
  const placeNameInput = cardFormElement.querySelector(
    ".popup__input_type_card-name"
  );
  const placeLinkInput = cardFormElement.querySelector(
    ".popup__input_type_url"
  );

  if (placeNameInput.validity.valid && placeLinkInput.validity.valid) {
    saveButton.removeAttribute("disabled");
    saveButton.classList.remove("popup__button_disabled"); 
  } else {
    saveButton.setAttribute("disabled", "true");
    saveButton.classList.add("popup__button_disabled"); 
  }
}

function toggleSaveButton() {
  const saveButton = profileFormElement.querySelector(".popup__button");
  const nameInput = profileFormElement.querySelector(".popup__input_type_name");
  const jobInput = profileFormElement.querySelector(
    ".popup__input_type_description"
  );

  if (nameInput.validity.valid && jobInput.validity.valid) {
    saveButton.removeAttribute("disabled");
    saveButton.classList.remove("popup__button_disabled"); 
  } else {
    saveButton.setAttribute("disabled", "true");
    saveButton.classList.add("popup__button_disabled");
  }
}

function toggleSaveAvatarBtn() {
  const saveButton = avatarPopup.querySelector(".popup__button");
  const avatarLinkInput = avatarPopup.querySelector(".popup__input_type_url");

  if (avatarLinkInput.validity.valid) {
    saveButton.removeAttribute("disabled");
    saveButton.classList.remove("popup__button_disabled"); 
  } else {
    saveButton.setAttribute("disabled", "true");
    saveButton.classList.add("popup__button_disabled"); 
  }
}


function handleCardFormSubmit(evt) {
  evt.preventDefault(); 

  const cardData = {
    name: placeNameInput.value.trim(), 
    link: placeLinkInput.value.trim(), 
  };

  if (!cardData.name || !cardData.link) {
    alert("Заполните все поля формы!");
    return;
  }

  const submitBtn = evt.target.querySelector(".popup__button");

  submitBtn.textContent = "Сохранение...";

  api
    .addNewCard(cardData)
    .then((cardInfo) => {
      const cardList = document.querySelector(".places__list"); 

      const newCard = createCard(
        cardInfo,
        userInfo._id,
        api.likeCard,
        api.removeCard,
        api.unLikeCard
      );

      cardList.prepend(newCard);

      closeModal(cardPopup);

      cardFormElement.reset();
    })
    .catch((err) => console.warn(err))
    .finally(() => {
      submitBtn.textContent = "Сохранить";
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const avatarUrl = avatarInput.value.trim();

  if (!avatarUrl) {
    alert("Заполните все поля формы!");
    return;
  }

  const submitBtn = evt.target.querySelector(".popup__button");

  submitBtn.textContent = "Сохранение...";

  api
    .updateAvatar(avatarUrl)
    .then((userInfo) => {
      profileAvatar.style.backgroundImage = `url("${userInfo.avatar}")`;
      closeModal(avatarPopup);
      evt.target.reset();
    })
    .catch((err) => console.warn(err))
    .finally(() => {
      submitBtn.textContent = "Сохранить";
    });
}

cardFormElement.addEventListener("submit", handleCardFormSubmit);
avatarFormElement.addEventListener("submit", handleAvatarFormSubmit);

const imagePopupCloseButton = imagePopup.querySelector(".popup__close");
imagePopupCloseButton.addEventListener("click", () => closeModal(imagePopup));

nameInput.addEventListener("input", () => {
  checkInputValidity(nameInput);
  toggleSaveButton(); 
});

jobInput.addEventListener("input", () => {
  checkInputValidity(jobInput);
  toggleSaveButton(); 
});

placeNameInput.addEventListener("input", () => {
  checkInputValidity(placeNameInput);
  togleSaveButton(); 
});

placeLinkInput.addEventListener("input", () => {
  checkInputValidity(placeLinkInput);
  togleSaveButton(); 
});

avatarInput.addEventListener("input", () => {
  checkInputValidity(avatarInput);
  toggleSaveAvatarBtn();
});

toggleSaveButton();

addOverlayCloseListeners();

profilePopup
  .querySelector(".popup__close")
  .addEventListener("click", () => closeModal(profilePopup));
cardPopup
  .querySelector(".popup__close")
  .addEventListener("click", () => closeModal(cardPopup));
imagePopup
  .querySelector(".popup__close")
  .addEventListener("click", () => closeModal(imagePopup));
avatarPopup
  .querySelector(".popup__close")
  .addEventListener("click", () => closeModal(avatarPopup));

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", openProfilePopup);
document
  .querySelector(".profile__add-button")
  .addEventListener("click", openCardPopup);

api
  .getUserInfo()
  .then((data) => {
    profileTitle.textContent = data.name; 
    profileDescription.textContent = data.about;
    profileAvatar.style.backgroundImage = `url("${data.avatar}")`;

    userInfo._id = data._id;
  })
  .catch((err) => console.warn(err));

profileAvatar.addEventListener("click", openAvatarPopup);
