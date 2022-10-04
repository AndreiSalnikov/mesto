export default class Popup {
  constructor(containerSelector) {
    this._containerSelector = containerSelector;
  }

  open() {
    this._containerSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._containerSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (event) => {
    if (event.key === "Escape"){
      this.close();
    }
  }


  _closePopupOverlay =  (event)  =>{
     if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
       this.close();
     }
  }

  setEventListeners() {
      this._containerSelector.addEventListener("mousedown", this._closePopupOverlay);
  }
}