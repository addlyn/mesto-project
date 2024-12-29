const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];


import addIcon from '../images/add-icon.svg'
import avatar from '../images/avatar.jpg'
import card_1 from '../images/card_1.jpg'
import card_2 from '../images/card_2.jpg'
import card_3 from '../images/card_3.jpg'
import close from '../images/close.svg'
import deleteIcon from '../images/delete-icon.svg'
import editIcon from '../images/edit-icon.svg'
import likeActive from '../images/like-active.svg'
import likeInactive from '../images/like-inactive.svg'
import logo from '../images/logo.svg'

const Pictures = [
    {name:'AddIcon', link: addIcon },
    {name: 'Avatar' , link: avatar },
    {name: 'Card1' , link: card_1 },
    {name: 'Card2', link: card_2 },
    {name: 'Card3', link: card_3 },
    {name: 'Close' , link: close },
    {name: 'DeleteIcon' , link: deleteIcon },
    {name: 'EditIcon' , link: editIcon },
    {name: 'LikeActive' , link: likeActive },
    {name: 'LikeInactive' , link: likeInactive },
    {name: 'logo' , link: logo },
]

import '../pages/index.css';



// Функция для создания карточки
function createCard(cardData) {
    const template = document.querySelector('#card-template').content;
    const cardElement = template.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    // Обработчик для лайка
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active'); // Используем правильный модификатор
    });

    deleteButton.addEventListener('click', () => {
        cardElement.remove();
    });

    cardImage.addEventListener('click', () => {
        openImagePopup(cardData);
    });

    return cardElement;
}

// Функция для добавления карточек на страницу
function renderCards(cards) {
    const cardList = document.querySelector('.places__list'); // Контейнер для карточек

    // Перебрать массив карточек и добавить их в список
    cards.forEach(cardData => {
        const card = createCard(cardData);
        cardList.appendChild(card);
    });
}

// Загрузка начальных карточек на страницу
renderCards(initialCards);


// Поп-апы
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

// Функция для добавления модификатора popup_is-animated
function addAnimationToPopups() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
        popup.classList.add('popup_is-animated');
    });
}

// Вызываем функцию при загрузке приложения
addAnimationToPopups();



// Функция для открытия поп-апа
function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);

}

// Функция для закрытия поп-апа
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    // Удаляем слушатель события для клавиши Escape
    document.removeEventListener('keydown', closeByEsc);
}

//--------------------------------------------------------
// Элементы профиля
const profileTitle = document.querySelector('.profile__title'); // Имя пользователя на странице
const profileDescription = document.querySelector('.profile__description'); // Описание пользователя

// Поп-ап для редактирования профиля
const profileFormElement = profilePopup.querySelector('.popup__form'); // Форма редактирования профиля

// Поля формы редактирования
const nameInput = profileFormElement.querySelector('.popup__input_type_name'); // Поле ввода имени
const jobInput = profileFormElement.querySelector('.popup__input_type_description'); // Поле ввода описания

// Кнопки
const editButton = document.querySelector('.profile__edit-button'); // Кнопка "Редактировать"
const profileCloseButton = profilePopup.querySelector('.popup__close'); // Кнопка закрытия поп-апа

// Функция заполнения полей формы текущими данными профиля и открытия поп-апа
function openProfilePopup() {
    nameInput.value = profileTitle.textContent; // Подставить текущий текст имени в поле формы
    jobInput.value = profileDescription.textContent; // Подставить текущий текст описания в поле формы
    openModal(profilePopup); // Открыть поп-ап
}

// Функция обработки отправки формы
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Остановить стандартное поведение отправки формы
    profileTitle.textContent = nameInput.value; // Обновить текст имени на странице
    profileDescription.textContent = jobInput.value; // Обновить текст описания на странице
    closeModal(profilePopup); // Закрыть поп-ап
}

// Слушатели событий
editButton.addEventListener('click', openProfilePopup); // Открыть поп-ап при нажатии на кнопку "Редактировать"
profileCloseButton.addEventListener('click', () => closeModal(profilePopup)); // Закрыть поп-ап при нажатии на крестик
profileFormElement.addEventListener('submit', handleProfileFormSubmit); // Обработать сохранение формы

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Поп-ап для добавления новой карточки
const cardFormElement = cardPopup.querySelector('.popup__form'); // Форма добавления карточки

// Поля формы добавления карточки
const placeNameInput = cardFormElement.querySelector('.popup__input_type_card-name'); // Поле ввода названия места
const placeLinkInput = cardFormElement.querySelector('.popup__input_type_url'); // Поле ввода ссылки на изображение

// Кнопки
const addButton = document.querySelector('.profile__add-button'); // Кнопка "+"
const cardCloseButton = cardPopup.querySelector('.popup__close'); // Кнопка закрытия поп-апа карточки

// Функция открытия поп-апа добавления карточки
function openCardPopup() {
    placeNameInput.value = ''; // Очистить поле названия места
    placeLinkInput.value = ''; // Очистить поле ссылки на изображение
    openModal(cardPopup); // Открыть поп-ап
}

// Слушатели событий
addButton.addEventListener('click', openCardPopup); // Открыть поп-ап при нажатии на кнопку "+"
cardCloseButton.addEventListener('click', () => closeModal(cardPopup)); // Закрыть поп-ап при нажатии на крестик

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

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
        alert('Заполните все поля формы!');
        return;
    }

    // Получить контейнер для карточек
    const cardList = document.querySelector('.places__list'); // Контейнер для карточек

    // Создать новую карточку
    const newCard = createCard(cardData);

    // Добавить карточку в начало списка
    cardList.prepend(newCard);

    // Закрыть поп-ап
    closeModal(cardPopup);

    // Очистить поля формы
    cardFormElement.reset();
}

// Добавляем обработчик на форму добавления карточки
cardFormElement.addEventListener('submit', handleCardFormSubmit);

// Функция для открытия поп-апа с изображением
function openImagePopup(cardData) {
    const imagePopupImage = imagePopup.querySelector('.popup__image');
    const imagePopupCaption = imagePopup.querySelector('.popup__caption');

    imagePopupImage.src = cardData.link;
    imagePopupImage.alt = cardData.name;
    imagePopupCaption.textContent = cardData.name;

    openModal(imagePopup);
}


const imagePopupCloseButton = imagePopup.querySelector('.popup__close');
imagePopupCloseButton.addEventListener('click', () => closeModal(imagePopup));
//-------------------1ПРОЕКТ ЗАКОНЧЕН------------------------
//-------------------1ПРОЕКТ ЗАКОНЧЕН------------------------
//-------------------1ПРОЕКТ ЗАКОНЧЕН------------------------
//-------------------1ПРОЕКТ ЗАКОНЧЕН------------------------
//-------------------1ПРОЕКТ ЗАКОНЧЕН------------------------
//-------------------1ПРОЕКТ ЗАКОНЧЕН------------------------
//-------------------1ПРОЕКТ ЗАКОНЧЕН------------------------
// Функция для включения/выключения кнопки "Сохранить" в зависимости от валидности формы
function toggleSaveButton() {
    const saveButton = profileFormElement.querySelector('.popup__button');
    const nameInput = profileFormElement.querySelector('.popup__input_type_name');
    const jobInput = profileFormElement.querySelector('.popup__input_type_description');

    // Если оба поля валидны, активируем кнопку "Сохранить", иначе - деактивируем
    if (nameInput.validity.valid && jobInput.validity.valid) {
        saveButton.removeAttribute('disabled');
        saveButton.classList.remove('popup__button_disabled'); // Если кнопка была серой, убираем серый цвет
    } else {
        saveButton.setAttribute('disabled', 'true');
        saveButton.classList.add('popup__button_disabled'); // Добавляем серый цвет
    }
}

// Слушатели событий для всех полей формы
nameInput.addEventListener('input', () => {
    checkInputValidity(nameInput);
    toggleSaveButton(); // Проверяем, можно ли активировать кнопку
});

jobInput.addEventListener('input', () => {
    checkInputValidity(jobInput);
    toggleSaveButton(); // Проверяем, можно ли активировать кнопку
});

// Функция для проверки валидности всех полей формы
function checkInputValidity(input) {
    if (input.validity.valid) {
        hideInputError(input);
    } else {
        showInputError(input, input.validationMessage);
    }
}

// Функция для отображения или скрытия ошибки
function showInputError(input, errorMessage) {
    const errorElement = input.closest('.popup__form').querySelector(`.popup__input-error_${input.name}`);
    input.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
}

function hideInputError(input) {
    const errorElement = input.closest('.popup__form').querySelector(`.popup__input-error_${input.name}`);
    input.classList.remove('popup__input_type_error');
    errorElement.textContent = '';
    errorElement.classList.remove('popup__input-error_active');
}

// Изначально проверим кнопку при загрузке страницы
toggleSaveButton();

// Функция для включения/выключения кнопки "Сохранить" в зависимости от валидности формы
function togleSaveButton() {
    const saveButton = cardFormElement.querySelector('.popup__button');
    const placeNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
    const placeLinkInput = cardFormElement.querySelector('.popup__input_type_url');

    // Если оба поля валидны, активируем кнопку "Сохранить", иначе - деактивируем
    if (placeNameInput.validity.valid && placeLinkInput.validity.valid) {
        saveButton.removeAttribute('disabled');
        saveButton.classList.remove('popup__button_disabled'); // Убираем серый цвет с кнопки
    } else {
        saveButton.setAttribute('disabled', 'true');
        saveButton.classList.add('popup__button_disabled'); // Добавляем серый цвет на кнопку
    }
}

// Слушатели событий для всех полей формы
placeNameInput.addEventListener('input', () => {
    checkInputValidity(placeNameInput);
    togleSaveButton(); // Проверяем, можно ли активировать кнопку
});

placeLinkInput.addEventListener('input', () => {
    checkInputValidity(placeLinkInput);
    togleSaveButton(); // Проверяем, можно ли активировать кнопку
});

// Изначально проверим кнопку при загрузке страницы
toggleSaveButton();

// Функция для закрытия поп-апа при клике на оверлей
function closePopupOnOverlayClick(event, popup) {
    if (event.target === popup) {
        closeModal(popup);
    }
}

// Добавляем обработчик для каждого поп-апа
function addOverlayCloseListeners() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
        popup.addEventListener('click', (event) => closePopupOnOverlayClick(event, popup));
    });
}

// Вызываем функцию после загрузки страницы
addOverlayCloseListeners();


// Функция для закрытия поп-апа по клавише Escape
function closeByEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup); // Закрыть открытый поп-ап
        }
    }
}

// Слушатели для кнопок закрытия поп-апов
profilePopup.querySelector('.popup__close').addEventListener('click', () => closeModal(profilePopup));
cardPopup.querySelector('.popup__close').addEventListener('click', () => closeModal(cardPopup));
imagePopup.querySelector('.popup__close').addEventListener('click', () => closeModal(imagePopup));

// Пример открытия поп-апов
document.querySelector('.profile__edit-button').addEventListener('click', openProfilePopup);
document.querySelector('.profile__add-button').addEventListener('click', openCardPopup);
