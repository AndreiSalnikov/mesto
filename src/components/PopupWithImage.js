import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._figcaption = this._popup.querySelector("figcaption");
    this._imgPopup = this._popup.querySelector(".popup__img");
  }

  open(link, name) {
    this._imgPopup.setAttribute("src", link);
    this._imgPopup.setAttribute("alt", name);
    this._figcaption.textContent = name;
    super.open();
  }
}