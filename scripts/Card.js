export class Card {
    constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._image = data.link;
    this._caption = data.name;
    this._openPopupFunction = data.openPopup; 
    this._closePopupFunction = data.closePopup;
    this._buttonClose = data.buttonClose;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".elements__image").src = this._image;
    this._element.querySelector(".elements__caption").textContent =
      this._caption;
    this._setEventListeners();

    // Вернём элемент наружу
    return this._element;
  }

  _handleDeleteClick() {
    this._element
      .querySelector(".elements__button_trash")
      .closest(".elements__element")
      .remove();
  }

  _handleLikeClick() {
    this._element
      .querySelector(".elements__button_like")
      .classList.toggle("elements__button_like_active");
  }

  _handleFullscreen() {
    const popupFullscreen = document.querySelector(".popup-fullscreen");
    const fullscreenImage = popupFullscreen.querySelector(".popup-fullscreen__image");
    const fullscreenCaption = popupFullscreen.querySelector(".popup-fullscreen__caption");
    fullscreenImage.src = this._image;
    fullscreenCaption.textContent = this._caption;
    fullscreenImage.alt = this._caption;
    this._openPopupFunction(popupFullscreen);
  }

  _setEventListeners() {
    this._element
      .querySelector(".elements__button_like")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

    this._element
      .querySelector(".elements__button_trash")
      .addEventListener("click", () => {
        this._handleDeleteClick();
      });

    this._element.querySelector('.elements__image').addEventListener("click", () => {
        this._handleFullscreen();
    });

}
}