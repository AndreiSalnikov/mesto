export const buttonEdit = document.querySelector(".profile__edit-button");
export const buttonAdd = document.querySelector(".profile__add-button");
export const buttonEditAvatar = document.querySelector(".profile__avatar")
export const userPath = "/users/me";
export const cardsPath = "/cards";
export const formValidators = {}
export const settingValidation = {
  formSelector: ".popup__form",
  inputSelector: '.popup__info',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error_visible'
}
export const settingUserApi = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-52", headers: {
    authorization: '16231cdf-2d24-4740-acd1-51d355ac1755', 'Content-Type': 'application/json'
  }
}