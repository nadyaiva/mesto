import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
 constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
 }
 setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      super.renderLoading(true)
      evt.preventDefault();
      this._formSubmit()
      this.close();
    });
  }
}