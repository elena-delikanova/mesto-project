export default class Section {
  constructor({ renderer }, container, action) {
    this._renderer = renderer;
    this._container = container;
    this._action = action;
  }

  setItem(element) {
    this._container[this._action](element);
  }

  renderItems(data) {
    this._renderedItems = data;
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}

