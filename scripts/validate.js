const showInputError = (formElement, inputElement, errorMessage, settingsValidation) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(settingsValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settingsValidation.errorClass);
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement, settingsValidation) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settingsValidation.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settingsValidation.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

const hideInputError = (formElement, inputElement, settingsValidation) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settingsValidation.inputErrorClass);
  errorElement.classList.remove(settingsValidation.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, settingsValidation) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settingsValidation);
  } else {
    hideInputError(formElement, inputElement, settingsValidation);
  }
};

const setEventListeners = (formElement, settingsValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(settingsValidation.inputSelector));
  const buttonElement = formElement.querySelector(settingsValidation.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, settingsValidation);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settingsValidation);
      toggleButtonState(inputList, buttonElement, settingsValidation);
    });
  });
};

const enableValidation = (settingsValidation) => {
  const formList = Array.from(document.querySelectorAll(settingsValidation.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, settingsValidation);
  });
};