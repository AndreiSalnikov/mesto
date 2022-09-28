export default class FormValidator {
  constructor(settingsValidation, form) {
    this._formSelector = document.querySelector(form);
    this._settingsValidation = settingsValidation;
    this._buttonElement = this._formSelector.querySelector(this._settingsValidation.submitButtonSelector);
    this._inputList = Array.from(this._formSelector.querySelectorAll(this._settingsValidation.inputSelector));
  }

  _showInputError = (inputElement) => {
    const errorElement = this._formSelector.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._settingsValidation.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._settingsValidation.errorClass);
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._settingsValidation.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._settingsValidation.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _hideInputError = (inputElement) => {
    const errorElement = this._formSelector.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._settingsValidation.inputErrorClass);
    errorElement.classList.remove(this._settingsValidation.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
     this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._formSelector.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
};
