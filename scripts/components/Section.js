export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._items = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
    
  }

  addItemesList() {
    this._items.forEach((item) => {
      this.addItem(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
