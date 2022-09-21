export default class Section {
  constructor({ data, renderer }, containerSelector, action) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._action = action;
  }

  setItem(element) {
    this._container[this._action](element);
  }

  renderItems() {

    this._renderedItems.forEach(item => {
      this._renderer(item);

    });
  }
}
