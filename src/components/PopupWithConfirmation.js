import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
 constructor(popupSelector) {
    super(popupSelector);
    this._submitButton = this._form.querySelector('.popup__save-button');
 }

 renderLoading(text) {
  this._submitButton.textContent = `${text}`;
}

 visualizeLoading(text) {
  this._submitButton.textContent = `${text}`;
}

setSubmitHandler(collback) {
  this._formSubmit = collback;
}

 setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmit();
      this.close();
    });
  }
}