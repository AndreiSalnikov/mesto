export default class Section {
  constructor({renderer}, containerSelector) {

    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addItem(element, reverse) {
    if (reverse) {
      this._container.prepend(element)
    } else {
      this._container.append(element)
    }
  }

  renderItems(cards, userID) {
    cards.forEach(item => {
      this._renderer(item, userID);
    });
  }
}