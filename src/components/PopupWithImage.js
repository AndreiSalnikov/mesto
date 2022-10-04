import Popup from "./Popup.js";
const figcaption = document.querySelector("figcaption");
const imgPopup = document.querySelector(".popup__img");

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(link,name) {
    imgPopup.setAttribute("src", link);
    imgPopup.setAttribute("alt", name);
    figcaption.textContent = name;
    super.open();
  }
}