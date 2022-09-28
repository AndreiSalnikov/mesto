const figcaption = document.querySelector("figcaption");
const imgPopup = document.querySelector(".popup__img");
const popupImg = document.querySelector("#popupShowImg");
import { openPopup } from './index.js'

export default class Card {
  constructor(data,templateSelector) {
    this._templateSelector = templateSelector;
    this._src = data.src;
    this._title = data.title;
    }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector(".item").cloneNode(true);
  }

  _eventListeners() {
    this._element.querySelector(".item__icon").addEventListener("click", (e) => {
      e.target.classList.toggle("item__icon_active");
    });
    this._element.querySelector(".item__delete-img").addEventListener("click", (e) => {
      e.target.closest(".item").remove();
    });
    this._element.querySelector(".item__img").addEventListener("click", () => {
      imgPopup.setAttribute("src", this._src);
      imgPopup.setAttribute("alt", this._title);
      figcaption.textContent = this._title;
      openPopup(popupImg);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    const templateImg =  this._element.querySelector(".item__img");
    const templateText = this._element.querySelector(".item__text");
    templateImg.src = this._src;
    templateImg.alt = this._title;
    templateText.textContent = this._title;
    this._eventListeners();
    return this._element;
  }

}