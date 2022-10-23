import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector,{handleCardDelete}) {
    super(popupSelector);
    this._handleCardDelete = handleCardDelete;
  }

  open(id,element) {
    super.open();
    this._id = id;
    this._element = element;
    this._elementButton = this._popup.querySelector(".popup__save-button");

  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector(".popup__save-button").addEventListener("click", () => {this._handleCardDelete(this._id,this._element,this._elementButton);})
  }
}