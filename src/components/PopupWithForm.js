import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleSubmitForm}) {
    super(popupSelector);
    this._formElement = this._containerSelector.querySelector(".popup__form");
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues() {
    let values = {};
    this._formElement.querySelectorAll(".popup__info").forEach((input) => {
      values[input.name] = input.value;
    })
    return [values];
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", () => {
      this._handleSubmitForm(this._getInputValues())
    })
    super.setEventListeners();
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}