import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._fullscreenImage = this._popup.querySelector(
      ".popup-fullscreen__image"
    );
    this._fullscreenCaption = this._popup.querySelector(
      ".popup-fullscreen__caption"
    );
  }
  open(cardItem) {
    this._fullscreenImage.src = cardItem.link;
    this._fullscreenCaption.textContent = cardItem.name;
    this._fullscreenImage.alt = cardItem.name;
    super.open();
  }
}