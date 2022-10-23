export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteButtonClick,handleLikeClick) {
    this._templateSelector = templateSelector;
    this._src = data.link;
    this._title = data.name;
    this._likes = data.likes.length;
    this._idCard = data._id;
    this._idOwner = data.owner._id;
    this._userId = data.userId;
    this._handleLikeClick = handleLikeClick;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._isLiked = data.isLiked;
  }


  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector(".item").cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".item__icon");
    this._likeButton.addEventListener("click", () => (this._handleLikeClick(this._likeButton,this._idCard,this._likePosition,this._likes)));
   this._templateImg.addEventListener("click", () => (this._handleCardClick(this._src, this._title)));
    if(this._idOwner === this._userId)
    {
      this._element.querySelector(".item__delete-img").addEventListener("click", () =>
          (this._handleDeleteButtonClick(this._idCard, this._element)));
    }

  }


generateCard() {
this._element = this._getTemplate();
 if(this._idOwner !== this._userId)
 {
   this._element.querySelector("#trash").remove();
 }
 if(this._isLiked) {
   this._element.querySelector(".item__icon").classList.add("item__icon_active");
 }
this._likePosition = this._element.querySelector(".item__like-counter");
this._templateImg = this._element.querySelector(".item__img");
this._templateText = this._element.querySelector(".item__text");
this._likePosition.textContent = this._likes;
this._templateImg.src = this._src;
this._templateImg.alt = this._title;
this._templateText.textContent = this._title;
this._setEventListeners();
return this._element;
}
}