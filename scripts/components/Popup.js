export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.setEventListeners();
  }

  getFormElement() {
    return this._popup.querySelector(".form");
  }

  open() {
    this._popup.classList.add("popup_opened");
  }
  close() {
    this._popup.classList.remove("popup_opened");
  }
  _handleEscClose(evt) {
    const escape = 27;
    if (evt.which === escape) {
      const activePopup = document.querySelector(".popup_opened");
      this.close(activePopup);
    }
  }
  setEventListeners() {
    document.addEventListener("keydown", (evt) => this._handleEscClose(evt));
    document.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}
