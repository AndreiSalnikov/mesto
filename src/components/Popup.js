export default class Popup {
  constructor(containerSelector) {
    this._popup = document.querySelector(containerSelector);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _renderLoading(isLoading, loadingText = 'Сохранение...') {
    if (!this._submitButton) return;
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitBtnText;
    }
  }

  _closePopupOverlay = (event) => {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", this._closePopupOverlay);
  }
}