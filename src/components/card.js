// Функция для создания карточки
export function createCard(
  cardData,
  currentUserId,
  onLike,
  onDelete,
  openImagePopup,
  onRemoveLike
) {
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

  // Обработчик для лайка
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
