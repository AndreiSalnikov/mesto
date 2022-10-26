export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteButtonClick, handleLikeClick) {
    this._templateSelector = templateSelector;
    this._src = data.link;
    this._title = data.name;
    this._likes = data.likes;
    this._idCard = data._id;
    this._idCardOwner = data.owner._id;
    this._userId = data.userId;
    this._handleLikeClick = handleLikeClick;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this.isLiked = false;
  }

  setLike(res) {
    this._likeButton.classList.add("item__icon_active");
    this._likePosition.textContent = res.likes.length;
    this.isLiked = true;
  }

  removeLike(res) {
    this._likeButton.classList.remove("item__icon_active");
    this._likePosition.textContent = res.likes.length;
    this.isLiked = false;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector(".item").cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => (this._handleLikeClick(this)));
    this._templateImg.addEventListener("click", () => (this._handleCardClick(this._src, this._title)));
    if (this._idCardOwner === this._userId) {
      this._element.querySelector(".item__delete-img").addEventListener("click", () => (this._handleDeleteButtonClick(this._idCard, this._element)));
    }
  }
  
  generateCard() {
    this._element = this._getTemplate();
    if (this._idCardOwner !== this._userId) {
      this._element.querySelector("#trash").remove();
    }
    this._likes.forEach((people) => {
      if (people._id === this._userId) {
        this.isLiked = true;
      }
    })
    this._likeButton = this._element.querySelector(".item__icon");
    if (this.isLiked) {
      this._likeButton.classList.add("item__icon_active");
    }
    this._likePosition = this._element.querySelector(".item__like-counter");
    this._templateImg = this._element.querySelector(".item__img");
    this._templateText = this._element.querySelector(".item__text");
    this._likePosition.textContent = this._likes.length;
    this._templateImg.src = this._src;
    this._templateImg.alt = this._title;
    this._templateText.textContent = this._title;
    this._setEventListeners();
    return this._element;
  }
}