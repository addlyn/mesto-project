// Функция для отображения или скрытия ошибки

export function showInputError(input, errorMessage) {
  const errorElement = input
    .closest(".popup__form")
    .querySelector(`.popup__input-error_${input.name}`);
  input.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
}

// Функция для отображения или скрытия ошибки

export function hideInputError(input) {
  const errorElement = input
    .closest(".popup__form")
    .querySelector(`.popup__input-error_${input.name}`);
  input.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__input-error_active");
}

export function checkInputValidity(input) {
  if (input.validity.valid) {
    hideInputError(input);
  } else {
    showInputError(input, input.validationMessage);
  }
}
