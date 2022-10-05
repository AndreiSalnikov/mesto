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
   this._likeButton.classList.toggle("item__icon_active");
  }

  _deleteCard() {
    this._element.closest(".item").remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".item__icon");
    this._likeButton.addEventListener("click", () => (this._setLike()));
    this._element.querySelector(".item__delete-img").addEventListener("click", () => (this._deleteCard(this._element)));
    this._templateImg.addEventListener("click", () => (this._handleCardClick(this._src, this._title)));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._templateImg = this._element.querySelector(".item__img");
    this._templateText = this._element.querySelector(".item__text");
    this._templateImg.src = this._src;
    this._templateImg.alt = this._title;
    this._templateText.textContent = this._title;
    this._setEventListeners();
    return this._element;
  }
}