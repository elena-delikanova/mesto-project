export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }

  setItem(element, action = 'prepend') {
    this._container[action](element);
  }

  renderItems(data) {
    this._renderedItems = data;
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
