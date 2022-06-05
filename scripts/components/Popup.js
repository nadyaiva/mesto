export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this)
    this.setEventListeners();
  }

  renderLoading(isLoading) {
    // console.log('renderLoading: isLoading = ' + isLoading);
    this._saveButton = document.querySelector('.popup__save-button');
    if (isLoading) {
      // console.log('trying to set a textContent to saveButton = ' + this._saveButton);
      // console.log('current textContent = ' + this._saveButton.textContent);
      this._saveButton.textContent = 'Сохранение..';
      // setTimeout('', 5000);
    }
    else {
      this._saveButton.textContent = document.querySelector('.popup__save-button').textContent;
    }
  }

  getFormElement() {
    return this._popup.querySelector(".form");
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', this._handleEscClose);
  }
  _handleEscClose(evt) {
    const escape = 27;
    if (evt.which === escape) {
      const activePopup = document.querySelector(".popup_opened");
      this.close(activePopup);
    }
  }
  setEventListeners() {
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
