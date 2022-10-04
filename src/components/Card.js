export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._src = data.link;
    this._title = data.name;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector(".item").cloneNode(true);
  }

  _setLike() {
    this._element.querySelector(".item__icon").classList.toggle("item__icon_active");
  }

  _deleteCard() {
    this._element.closest(".item").remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector(".item__icon").addEventListener("click", () => (this._setLike(this._element)));
    this._element.querySelector(".item__delete-img").addEventListener("click", () => (this._deleteCard(this._element)));
    this._element.querySelector(".item__img").addEventListener("click", () => (this._handleCardClick(this._src, this._title)));
  }

  generateCard() {
    this._element = this._getTemplate();
    const templateImg = this._element.querySelector(".item__img");
    const templateText = this._element.querySelector(".item__text");
    templateImg.src = this._src;
    templateImg.alt = this._title;
    templateText.textContent = this._title;
    this._setEventListeners();
    return this._element;
  }
}