import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleSubmitForm}) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(".popup__form");
    this._handleSubmitForm = handleSubmitForm;
    this._inputList = this._formElement.querySelectorAll(".popup__info");
  }

  _getInputValues() {
   this._values = {};
   this._inputList.forEach((input) => {
       this._values[input.name] = input.value;
    })
    return [this._values];
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

    setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }
}