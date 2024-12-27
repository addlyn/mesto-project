// Функция для создания карточки
function createCard(cardData) {
  // Находим шаблон карточки
  const cardTemplate = document.getElementById('card-template');
  
  // Клонируем шаблон
  const cardElement = cardTemplate.content.cloneNode(true);

  // Находим элементы внутри клонированной карточки
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  // Заполняем элементы карточки данными из cardData
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Добавляем обработчики для кнопок (например, для лайка и удаления)
  cardLikeButton.addEventListener('click', function () {
    cardLikeButton.classList.toggle('card__like-button_liked');
  });

  cardDeleteButton.addEventListener('click', function () {
    cardElement.remove();
  });

  // Возвращаем готовую карточку
  return cardElement;
}

// Функция для добавления всех карточек на страницу
function renderCards(cardsArray) {
  // Находим контейнер для карточек
  const placesList = document.querySelector('.places__list');

  // Для каждого элемента массива вызываем функцию создания карточки
  cardsArray.forEach(function (cardData) {
    const cardElement = createCard(cardData);
    placesList.append(cardElement);
  });
}

// Вызов функции для отрисовки карточек
renderCards(initialCards);
//!!!!!!!!!!!!!!!!!конец первого задания




// Функция для открытия поп-апа
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  popup.classList.add('popup_is-animated'); // Добавляем класс для анимации
}

// Функция для закрытия поп-апа
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  setTimeout(() => {
    popup.classList.remove('popup_is-animated'); // Убираем класс анимации после закрытия
  }, 300); // Даем время на завершение анимации (300ms)
}

// Находим поп-апы
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

// Кнопки для открытия поп-апов
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

// Кнопки для закрытия поп-апов
const profilePopupCloseButton = profilePopup.querySelector('.popup__close');
const cardPopupCloseButton = cardPopup.querySelector('.popup__close');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');

// Обработчик открытия поп-апа для редактирования профиля
profileEditButton.addEventListener('click', function() {
  openModal(profilePopup);
});

// Обработчик открытия поп-апа для добавления карточки
profileAddButton.addEventListener('click', function() {
  openModal(cardPopup);
});

// Обработчик закрытия поп-апа для редактирования профиля
profilePopupCloseButton.addEventListener('click', function() {
  closeModal(profilePopup);
});

// Обработчик закрытия поп-апа для добавления карточки
cardPopupCloseButton.addEventListener('click', function() {
  closeModal(cardPopup);
});

// Обработчик закрытия поп-апа для изображения
imagePopupCloseButton.addEventListener('click', function() {
  closeModal(imagePopup);
});

// Функция для отображения изображения в поп-апе
function openImagePopup(imageSrc, imageAlt) {
  const imageElement = imagePopup.querySelector('.popup__image');
  const captionElement = imagePopup.querySelector('.popup__caption');
  
  imageElement.src = imageSrc;
  imageElement.alt = imageAlt;
  captionElement.textContent = imageAlt;
  
  openModal(imagePopup);
}

// Пример использования функции для отображения картинки при клике на изображение карточки
document.querySelectorAll('.card__image').forEach(image => {
  image.addEventListener('click', function() {
    openImagePopup(image.src, image.alt);
  });
});
// !!!!!!!!!!!!!!!!! 2


const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const profileInputName = profilePopup.querySelector('.popup__input_type_name');
const profileInputDescription = profilePopup.querySelector('.popup__input_type_description');

// Функция для заполнения формы данными профиля
function fillProfileForm() {
  // Заполняем поля формы значениями, которые отображаются на странице
  profileInputName.value = profileTitle.textContent;
  profileInputDescription.value = profileDescription.textContent;

  // Открываем поп-ап
  openModal(profilePopup);
}

// Кнопка для открытия поп-апа редактирования профиля
profileEditButton.addEventListener('click', fillProfileForm);

// Кнопка для закрытия поп-апа
profilePopupCloseButton.addEventListener('click', function() {
  closeModal(profilePopup);

  // После закрытия формы сбрасываем значения в полях формы
  profilePopupForm.reset();
});

// Функция для открытия поп-апа
function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

// Функция для закрытия поп-апа
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

// Пример использования функции для отображения изображения в поп-апе
function openImagePopup(imageSrc, imageAlt) {
  const imageElement = imagePopup.querySelector('.popup__image');
  const captionElement = imagePopup.querySelector('.popup__caption');
  
  imageElement.src = imageSrc;
  imageElement.alt = imageAlt;
  captionElement.textContent = imageAlt;
  
  openModal(imagePopup);
}

// Привязка обработчиков для изображений (если необходимо)
document.querySelectorAll('.card__image').forEach(image => {
  image.addEventListener('click', function() {
    openImagePopup(image.src, image.alt);
  });
});
//!!!!!!!!!!!!! 2.1


// Находим поп-ап и форму в нем
const profileForm = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');

// Функция для открытия поп-апа с заполнением формы данными
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profilePopup);
}

// Обработчик открытия поп-апа
profileEditButton.addEventListener('click', fillProfileForm);

// Обработчик закрытия поп-апа
profilePopupCloseButton.addEventListener('click', function () {
  closeModal(profilePopup);
  profileForm.reset(); // Сбрасываем значения формы, если поп-ап закрыт
});

// Функция для открытия поп-апа
function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

// Функция для закрытия поп-апа
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

// Обработчик отправки формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартное поведение формы

  // Получаем значения полей формы
  const name = nameInput.value;
  const job = jobInput.value;

  // Обновляем данные на странице
  profileTitle.textContent = name;
  profileDescription.textContent = job;

  // Закрываем поп-ап после сохранения данных
  closeModal(profilePopup);

  // Сбрасываем форму (на всякий случай)
  profileForm.reset();
}

// Прикрепляем обработчик к форме
profileForm.addEventListener('submit', handleProfileFormSubmit);
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!конец 2.1


// Находим форму и поля в поп-апе для добавления карточки
const cardInputTitle = cardPopup.querySelector('.popup__input_type_card-name');
const cardInputLink = cardPopup.querySelector('.popup__input_type_url');

// Функция для очистки формы добавления карточки
function clearCardForm() {
  cardInputTitle.value = '';
  cardInputLink.value = '';
}

// Обработчик открытия поп-апа для добавления карточки
profileAddButton.addEventListener('click', function() {
  // Очищаем поля формы перед открытием поп-апа
  clearCardForm();
  openModal(cardPopup);
});

// Обработчик закрытия поп-апа для добавления карточки
cardPopupCloseButton.addEventListener('click', function() {
  closeModal(cardPopup);
  // Сбрасываем форму добавления карточки при закрытии поп-апа
  clearCardForm();
});
//!!!!!!!!!!!!!!!!!! 2.2




// Функция для создания карточки
// Функция для создания карточки
// Функция для создания карточки
function createCard(cardData) {
  const cardTemplate = document.getElementById('card-template');
  const cardElement = cardTemplate.content.cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Обработчик для кнопки лайка
  cardLikeButton.addEventListener('click', function () {
    cardLikeButton.classList.toggle('card__like-button_is-active'); // Добавляем/удаляем класс при клике
  });

  // Обработчик для кнопки удаления
  cardDeleteButton.addEventListener('click', function () {
    // Находим родительский элемент (карточку) и удаляем ее
    const card = cardDeleteButton.closest('.card');
    card.remove();
  });

  return cardElement;
}



// Функция для добавления карточек на страницу
function renderCards(cardsArray) {
  const placesList = document.querySelector('.places__list');

  cardsArray.forEach(function (cardData) {
    const cardElement = createCard(cardData);
    placesList.prepend(cardElement);  // Добавляем карточку в начало списка
  });
}

// Обработчик отправки формы для добавления карточки
const cardForm = cardPopup.querySelector('.popup__form');

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: cardInputTitle.value,
    link: cardInputLink.value
  };

  renderCards([newCardData]);  // Добавляем одну новую карточку

  closeModal(cardPopup);
  cardForm.reset();
}

cardForm.addEventListener('submit', handleCardFormSubmit);
//!!!!!!!!!!!!!!!!!!!!!3

document.querySelectorAll('.popup').forEach(popup => {
  popup.classList.add('popup_is-animated');
});
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!










// Общие элементы формы
const descriptionInput = document.querySelector('.popup__input_type_description');
const formElement = document.querySelector('.popup__form');
const saveButton = formElement.querySelector('.popup__button');

// Показать ошибку
function showInputError(inputElement, errorMessage) {
  const errorElement = document.querySelector(`.${inputElement.name}-error`);
  errorElement.textContent = errorMessage; // Устанавливаем кастомное сообщение
  errorElement.classList.add('popup__input-error_active');
  inputElement.classList.add('popup__input_type_error');
}

// Скрыть ошибку
function hideInputError(inputElement) {
  const errorElement = document.querySelector(`.${inputElement.name}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove('popup__input-error_active');
  inputElement.classList.remove('popup__input_type_error');
}

// Проверка валидности поля
function checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    let errorMessage = '';
    if (inputElement.validity.valueMissing) {
      errorMessage = 'Вы пропустили это поле.';
    } else if (inputElement.validity.tooShort) {
      errorMessage = `Минимальная длина ${inputElement.minLength} символа. Сейчас ${inputElement.value.length}.`;
    } else if (inputElement.validity.tooLong) {
      errorMessage = `Максимальная длина ${inputElement.maxLength} символов.`;
    }
    showInputError(inputElement, errorMessage);
  } else {
    hideInputError(inputElement);
  }
}

// Проверка валидности формы
function checkFormValidity() {
  const isValid = nameInput.validity.valid && descriptionInput.validity.valid;
  saveButton.disabled = !isValid;
  saveButton.classList.toggle('button_disabled', !isValid);
}

// Навешиваем обработчики
[nameInput, descriptionInput].forEach((inputElement) => {
  inputElement.addEventListener('input', () => {
    checkInputValidity(inputElement);
    checkFormValidity();
  });
});

// Проверяем при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  checkFormValidity();
});



// Функция для очистки ошибок
function clearInputErrors() {
  const inputElements = profilePopup.querySelectorAll('.popup__input');
  inputElements.forEach(inputElement => {
    const errorElement = document.querySelector(`.${inputElement.name}-error`);
    errorElement.textContent = ''; // Очищаем текст ошибки
    errorElement.classList.remove('popup__input-error_active');
    inputElement.classList.remove('popup__input_type_error');
  });
}

// Обработчик закрытия поп-апа для редактирования профиля
profilePopupCloseButton.addEventListener('click', function() {
  closeModal(profilePopup);
  profilePopupForm.reset(); // Сбрасываем значения формы

  // Очищаем все ошибки
  clearInputErrors();
});

// Функция для открытия поп-апа с заполнением формы данными
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profilePopup);
}

// Обработчик отправки формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартное поведение формы

  const name = nameInput.value;
  const job = jobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;

  closeModal(profilePopup);
  profileForm.reset();
  clearInputErrors(); // Очищаем ошибки после отправки формы
}

// Проверка валидности поля
function checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    let errorMessage = '';
    if (inputElement.validity.valueMissing) {
      errorMessage = 'Вы пропустили это поле.';
    } else if (inputElement.validity.tooShort) {
      errorMessage = `Минимальная длина ${inputElement.minLength} символа. Сейчас ${inputElement.value.length}.`;
    } else if (inputElement.validity.tooLong) {
      errorMessage = `Максимальная длина ${inputElement.maxLength} символов.`;
    }
    showInputError(inputElement, errorMessage);
  } else {
    hideInputError(inputElement);
  }
}

// Проверка валидности формы
function checkFormValidity() {
  const isValid = nameInput.validity.valid && descriptionInput.validity.valid;
  saveButton.disabled = !isValid;
  saveButton.classList.toggle('button_disabled', !isValid);
}

// Навешиваем обработчики
[nameInput, descriptionInput].forEach((inputElement) => {
  inputElement.addEventListener('input', () => {
    checkInputValidity(inputElement);
    checkFormValidity();
  });
});
// !!!!!!!!!!!!!!!!!!!!!!!!! 1






// Находим форму и поля в поп-апе для добавления карточки
const saveCardButton = cardPopup.querySelector('.popup__button');

// Функция для проверки валидности поля
function checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    let errorMessage = '';
    
    if (inputElement.validity.valueMissing) {
      errorMessage = 'Это обязательное поле';
    } else if (inputElement.validity.typeMismatch) {
      errorMessage = 'Введите правильный URL';
    } else if (inputElement.validity.tooShort) {
      errorMessage = `Минимальная длина ${inputElement.minLength} символов. Сейчас ${inputElement.value.length}.`;
    } else if (inputElement.validity.tooLong) {
      errorMessage = `Максимальная длина ${inputElement.maxLength} символов.`;
    }
    showInputError(inputElement, errorMessage);
  } else {
    hideInputError(inputElement);
  }
}

// Показать ошибку
function showInputError(inputElement, errorMessage) {
  const errorElement = document.querySelector(`.${inputElement.name}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
  inputElement.classList.add('popup__input_type_error');
}

// Скрыть ошибку
function hideInputError(inputElement) {
  const errorElement = document.querySelector(`.${inputElement.name}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove('popup__input-error_active');
  inputElement.classList.remove('popup__input_type_error');
}

// Функция для проверки валидности формы (для кнопки "Сохранить")
function checkFormValidity() {
  const isValid = cardInputTitle.validity.valid && cardInputLink.validity.valid;
  saveCardButton.disabled = !isValid;
  saveCardButton.classList.toggle('button_disabled', !isValid);
}

// Навешиваем обработчики
[cardInputTitle, cardInputLink].forEach((inputElement) => {
  inputElement.addEventListener('input', () => {
    checkInputValidity(inputElement);
    checkFormValidity();
  });
});

// Проверка при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  checkFormValidity();
});


function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: cardInputTitle.value,
    link: cardInputLink.value
  };

  renderCards([newCardData]);  // Добавляем одну новую карточку

  closeModal(cardPopup);
  cardForm.reset(); // Сбрасываем форму
  checkFormValidity(); // Перепроверяем форму после сброса
}

cardForm.addEventListener('submit', handleCardFormSubmit);
//!!!!!!!!!!!!!!!!!!!!!!!!!! 2



// Функция для открытия поп-апа
function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

// Функция для закрытия поп-апа
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

// Обработчики для закрытия поп-апов по клику на оверлей
document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
      closeModal(popup);
    }
  });
});

// Пример кода для открытия и закрытия поп-апов (оставляем ваши предыдущие обработчики):
profileEditButton.addEventListener('click', function() {
  openModal(profilePopup);
});

profilePopupCloseButton.addEventListener('click', function() {
  closeModal(profilePopup);
});
//!!!!!!!!!!!!!!!!!!3


// Функция для открытия поп-апа
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose); // Добавляем обработчик нажатия Esc
}

// Функция для закрытия поп-апа
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose); // Убираем обработчик нажатия Esc
}

// Функция для закрытия поп-апов по нажатию Esc
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

// Обработчик для закрытия поп-апов по клику на оверлей
document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', function (evt) {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});
//!!!!!!!!!!!!!!!!!!4

