export function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup); 
    }
  }
}

export function closePopupOnOverlayClick(event, popup) {
  if (event.target === popup) {
    closeModal(popup);
  }
}

export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEsc);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  // Удаляем слушатель события для клавиши Escape
  document.removeEventListener("keydown", closeByEsc);
}

export function addAnimationToPopups() {
  const popups = document.querySelectorAll(".popup");
  popups.forEach((popup) => {
    popup.classList.add("popup_is-animated");
  });
}

export function addOverlayCloseListeners() {
  const popups = document.querySelectorAll(".popup");
  popups.forEach((popup) => {
    popup.addEventListener("click", (event) =>
      closePopupOnOverlayClick(event, popup)
    );
  });
}
