import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, {handleCardDelete}) {
    super(popupSelector);
    this._handleCardDelete = handleCardDelete;
    this._submitButton = this._popup.querySelector(".popup__save-button");
    this._submitBtnText = this._submitButton.textContent
  }

  open(id, element) {
    super.open();
    this._id = id;
    this._element = element;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", () => {
      super._renderLoading(true, "Удаление...")
      this._handleCardDelete(this._id, this._element).then(() => this.close())
        .finally(() => {
          super._renderLoading(false)
        })
    })
  }
}