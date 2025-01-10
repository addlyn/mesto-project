import apiConfig from "./config.js";

import Api from "./api.js";

// Импорт функций для валидации форм

import { checkInputValidity, hideInputError } from "./validate.js";

import { createCard } from "./card.js";

// Импорт функций для работы поп-апов

import {
  openModal,
  closeModal,
  addAnimationToPopups,
  addOverlayCloseListeners,
} from "./modal.js";

import "../pages/index.css";

const api = new Api(apiConfig);

const userInfo = {
  _id: null,
};

const profileAvatar = document.querySelector(".profile__image");

// Функция для добавления карточек на страницу
function renderCards(cards) {
  const cardList = document.querySelector(".places__list"); // Контейнер для карточек

  // Перебрать массив карточек и добавить их в список
  cards.forEach((cardData) => {
    const card = createCard(
      cardData,
      userInfo._id,
      api.likeCard,
      api.removeCard,
      openImagePopup,
      api.unLikeCard
    );
    cardList.appendChild(card);
  });
}

// Загрузка начальных карточек на страницу
api
  .getInitialCards()
  .then((allCards) => renderCards(allCards))
  .catch((err) => console.warn(err));

// Поп-апы
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const avatarPopup = document.querySelector(".popup_type_avatar");

// Вызываем функцию при загрузке приложения
addAnimationToPopups();

//--------------------------------------------------------
// Элементы профиля
const profileTitle = document.querySelector(".profile__title"); // Имя пользователя на странице
const profileDescription = document.querySelector(".profile__description"); // Описание пользователя

// Поп-ап для редактирования профиля
const profileFormElement = profilePopup.querySelector(".popup__form"); // Форма редактирования профиля

// Поля формы редактирования
const nameInput = profileFormElement.querySelector(".popup__input_type_name"); // Поле ввода имени
const jobInput = profileFormElement.querySelector(
  ".popup__input_type_description"
); // Поле ввода описания

// Кнопки
const editButton = document.querySelector(".profile__edit-button"); // Кнопка "Редактировать"
const profileCloseButton = profilePopup.querySelector(".popup__close"); // Кнопка закрытия поп-апа

// Функция обработки отправки формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Остановить стандартное поведение отправки формы

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
      profileTitle.textContent = resp.name; // Обновить текст имени на странице
      profileDescription.textContent = resp.about; // Обновить текст описания на странице

      closeModal(profilePopup); // Закрыть поп-ап
    })
    .catch((err) => console.warn(err))
    .finally(() => {
      submitBtn.textContent = "Сохранить";
      toggleSaveButton();
    });
}

// Слушатели событий
editButton.addEventListener("click", openProfilePopup); // Открыть поп-ап при нажатии на кнопку "Редактировать"
profileCloseButton.addEventListener("click", () => closeModal(profilePopup)); // Закрыть поп-ап при нажатии на крестик
profileFormElement.addEventListener("submit", handleProfileFormSubmit); // Обработать сохранение формы

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Поп-ап для добавления новой карточки
const cardFormElement = cardPopup.querySelector(".popup__form"); // Форма добавления карточки

const avatarFormElement = avatarPopup.querySelector(".popup__form");

// Поля формы добавления карточки
const placeNameInput = cardFormElement.querySelector(
  ".popup__input_type_card-name"
); // Поле ввода названия места
const placeLinkInput = cardFormElement.querySelector(".popup__input_type_url"); // Поле ввода ссылки на изображение
const avatarInput = avatarPopup.querySelector(".popup__input_type_url");

// Кнопки
const addButton = document.querySelector(".profile__add-button"); // Кнопка "+"
const cardCloseButton = cardPopup.querySelector(".popup__close"); // Кнопка закрытия поп-апа карточки

// Функции для открытия основных поп-ап'ов

function openProfilePopup() {
  nameInput.value = profileTitle.textContent; // Подставить текущий текст имени в поле формы
  jobInput.value = profileDescription.textContent; // Подставить текущий текст описания в поле формы
  openModal(profilePopup); // Открыть поп-ап
}

function openCardPopup() {
  placeNameInput.value = ""; // Очистить поле названия места
  placeLinkInput.value = ""; // Очистить поле ссылки на изображение
  openModal(cardPopup); // Открыть поп-ап
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
  openModal(avatarPopup); // Открыть поп-ап
}

// Слушатели событий
addButton.addEventListener("click", openCardPopup); // Открыть поп-ап при нажатии на кнопку "+"
cardCloseButton.addEventListener("click", () => closeModal(cardPopup)); // Закрыть поп-ап при нажатии на крестик

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function togleSaveButton() {
  const saveButton = cardFormElement.querySelector(".popup__button");
  const placeNameInput = cardFormElement.querySelector(
    ".popup__input_type_card-name"
  );
  const placeLinkInput = cardFormElement.querySelector(
    ".popup__input_type_url"
  );

  // Если оба поля валидны, активируем кнопку "Сохранить", иначе - деактивируем
  if (placeNameInput.validity.valid && placeLinkInput.validity.valid) {
    saveButton.removeAttribute("disabled");
    saveButton.classList.remove("popup__button_disabled"); // Убираем серый цвет с кнопки
  } else {
    saveButton.setAttribute("disabled", "true");
    saveButton.classList.add("popup__button_disabled"); // Добавляем серый цвет на кнопку
  }
}

function toggleSaveButton() {
  const saveButton = profileFormElement.querySelector(".popup__button");
  const nameInput = profileFormElement.querySelector(".popup__input_type_name");
  const jobInput = profileFormElement.querySelector(
    ".popup__input_type_description"
  );

  // Если оба поля валидны, активируем кнопку "Сохранить", иначе - деактивируем
  if (nameInput.validity.valid && jobInput.validity.valid) {
    saveButton.removeAttribute("disabled");
    saveButton.classList.remove("popup__button_disabled"); // Если кнопка была серой, убираем серый цвет
  } else {
    saveButton.setAttribute("disabled", "true");
    saveButton.classList.add("popup__button_disabled"); // Добавляем серый цвет
  }
}

function toggleSaveAvatarBtn() {
  const saveButton = avatarPopup.querySelector(".popup__button");
  const avatarLinkInput = avatarPopup.querySelector(".popup__input_type_url");

  if (avatarLinkInput.validity.valid) {
    saveButton.removeAttribute("disabled");
    saveButton.classList.remove("popup__button_disabled"); // Если кнопка была серой, убираем серый цвет
  } else {
    saveButton.setAttribute("disabled", "true");
    saveButton.classList.add("popup__button_disabled"); // Добавляем серый цвет
  }
}

// Обработчик события "submit" для формы добавления карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault(); // Остановить стандартное поведение отправки формы

  // Получить данные из полей формы
  const cardData = {
    name: placeNameInput.value.trim(), // Получить и обрезать лишние пробелы
    link: placeLinkInput.value.trim(), // Получить и обрезать лишние пробелы
  };

  // Проверить, что поля не пустые
  if (!cardData.name || !cardData.link) {
    alert("Заполните все поля формы!");
    return;
  }

  const submitBtn = evt.target.querySelector(".popup__button");

  submitBtn.textContent = "Сохранение...";

  api
    .addNewCard(cardData)
    .then((cardInfo) => {
      // Получить контейнер для карточек
      const cardList = document.querySelector(".places__list"); // Контейнер для карточек

      // Создать новую карточку
      const newCard = createCard(
        cardInfo,
        userInfo._id,
        api.likeCard,
        api.removeCard,
        openImagePopup,
        api.unLikeCard
      );

      // Добавить карточку в начало списка
      cardList.prepend(newCard);

      // Закрыть поп-ап
      closeModal(cardPopup);

      // Очистить поля формы
      cardFormElement.reset();
      togleSaveButton();
    })
    .catch((err) => console.warn(err))
    .finally(() => {
      submitBtn.textContent = "Сохранить";
      togleSaveButton();
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault(); // Остановить стандартное поведение отправки формы

  // Получить данные из полей формы
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
      evt.target.reset();
      profileAvatar.style.backgroundImage = `url("${userInfo.avatar}")`;
      closeModal(avatarPopup);
    })
    .catch((err) => console.warn(err))
    .finally(() => {
      submitBtn.textContent = "Сохранить";
      toggleSaveAvatarBtn();
    });
}

// Добавляем обработчик на форму добавления карточки
cardFormElement.addEventListener("submit", handleCardFormSubmit);
avatarFormElement.addEventListener("submit", handleAvatarFormSubmit);

const imagePopupCloseButton = imagePopup.querySelector(".popup__close");
imagePopupCloseButton.addEventListener("click", () => closeModal(imagePopup));
//-------------------1ПРОЕКТ ЗАКОНЧЕН------------------------
//-------------------1ПРОЕКТ ЗАКОНЧЕН------------------------
//-------------------1ПРОЕКТ ЗАКОНЧЕН------------------------
//-------------------1ПРОЕКТ ЗАКОНЧЕН------------------------
//-------------------1ПРОЕКТ ЗАКОНЧЕН------------------------
//-------------------1ПРОЕКТ ЗАКОНЧЕН------------------------
//-------------------1ПРОЕКТ ЗАКОНЧЕН------------------------
// Функция для включения/выключения кнопки "Сохранить" в зависимости от валидности формы

// Слушатели событий для всех полей формы
nameInput.addEventListener("input", () => {
  checkInputValidity(nameInput);
  toggleSaveButton(); // Проверяем, можно ли активировать кнопку
});

jobInput.addEventListener("input", () => {
  checkInputValidity(jobInput);
  toggleSaveButton(); // Проверяем, можно ли активировать кнопку
});

// Слушатели событий для всех полей формы
placeNameInput.addEventListener("input", () => {
  checkInputValidity(placeNameInput);
  togleSaveButton(); // Проверяем, можно ли активировать кнопку
});

placeLinkInput.addEventListener("input", () => {
  checkInputValidity(placeLinkInput);
  togleSaveButton(); // Проверяем, можно ли активировать кнопку
});

avatarInput.addEventListener("input", () => {
  checkInputValidity(avatarInput);
  toggleSaveAvatarBtn();
});

// Изначально проверим кнопку при загрузке страницы
toggleSaveButton();
togleSaveButton();
toggleSaveAvatarBtn();

// Вызываем функцию после загрузки страницы
addOverlayCloseListeners();

// Слушатели для кнопок закрытия поп-апов
profilePopup.querySelector(".popup__close").addEventListener("click", () => {
  closeModal(profilePopup);
  profilePopup
    .querySelectorAll("input")
    .forEach((inpEl) => hideInputError(inpEl));
});

cardPopup.querySelector(".popup__close").addEventListener("click", () => {
  closeModal(cardPopup);
  cardPopup.querySelectorAll("input").forEach((inpEl) => hideInputError(inpEl));
});

imagePopup.querySelector(".popup__close").addEventListener("click", () => {
  closeModal(imagePopup);
  imagePopup
    .querySelectorAll("input")
    .forEach((inpEl) => hideInputError(inpEl));
});

avatarPopup.querySelector(".popup__close").addEventListener("click", () => {
  closeModal(avatarPopup);
  avatarPopup
    .querySelectorAll("input")
    .forEach((inpEl) => hideInputError(inpEl));
  avatarPopup.querySelector("form").reset();
  toggleSaveAvatarBtn();
});

// Пример открытия поп-апов
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", openProfilePopup);
document
  .querySelector(".profile__add-button")
  .addEventListener("click", openCardPopup);

// Получения данных профиля

api
  .getUserInfo()
  .then((data) => {
    profileTitle.textContent = data.name; // Обновить текст имени на странице
    profileDescription.textContent = data.about; // Обновить текст описания на странице
    profileAvatar.style.backgroundImage = `url("${data.avatar}")`;

    userInfo._id = data._id;
  })
  .catch((err) => console.warn(err));

profileAvatar.addEventListener("click", openAvatarPopup);
