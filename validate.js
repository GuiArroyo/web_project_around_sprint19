const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  // Verifica a propriedade ValidityState e define a mensagem de erro apropriada
  if (inputElement.validity.valueMissing) {
    errorMessage = 'Este campo é obrigatório.';
  } else if (inputElement.validity.typeMismatch) {
    errorMessage = 'Por favor, insira um valor no formato correto.';
  } else if (inputElement.validity.patternMismatch) {
    errorMessage = 'O valor inserido não corresponde ao padrão esperado.';
  } else if (inputElement.validity.tooShort) {
    errorMessage = `O valor deve ter pelo menos ${inputElement.minLength} caracteres; você inseriu ${inputElement.value.length}.`;
  } else if (inputElement.validity.tooLong) {
    errorMessage = `O valor deve ter no máximo ${inputElement.maxLength} caracteres; você inseriu ${inputElement.value.length}.`;
  } else if (inputElement.validity.rangeUnderflow) {
    errorMessage = `O valor deve ser maior ou igual a ${inputElement.min}.`;
  } else if (inputElement.validity.rangeOverflow) {
    errorMessage = `O valor deve ser menor ou igual a ${inputElement.max}.`;
  } else if (inputElement.validity.stepMismatch) {
    errorMessage = 'Por favor, insira um valor válido.';
  } else if (inputElement.validity.customError) {
    errorMessage = errorMessage; // Use a mensagem de erro personalizada passada como argumento
  }
  
  errorElement.textContent = errorMessage;
};


const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button_disabled");
  } else {
    buttonElement.classList.remove("popup__button_disabled");
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error-visible",
});

const popupOverlay = document.querySelectorAll(".popup__overlay");
const allPopup = document.querySelectorAll(".popup");

popupOverlay.forEach((overlay) => {
  overlay.addEventListener("click", () => {
    overlay.parentNode.classList.remove("popup__open");
  });
});
