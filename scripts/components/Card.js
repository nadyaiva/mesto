export class Card {
  constructor({ data, handleCardClick, handleDeleteClick}, cardSelector) {
    this._cardItem = data;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this.countCardLikes();
    this._trashButtonElement = this._element
    .querySelector(".elements__button_trash");
    this.checkDisplayBin();
    this._handleDelete = handleDeleteClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element.querySelector(".elements__image").src = this._cardItem.link;
    this._element.querySelector(".elements__image").alt = this._cardItem.name;
    this._element.querySelector(".elements__caption").textContent =
      this._cardItem.name;

    this._setEventListeners();
    return this._element;
  }

  _handleLikeClick() {
    this._element
      .querySelector(".elements__button_like")
      .classList.toggle("elements__button_like_active");
  }

  _handleFullscreen() {
    this._handleCardClick(this._cardItem);
  }

  _setEventListeners() {
    this._element
      .querySelector(".elements__button_like")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

      this._trashButtonElement
      .addEventListener("click", () => {
        this._handleDelete(this._cardItem, this._element);
      });
      // this._trashButtonElement
      // .addEventListener("click", () => {
      //   this._handleConfirmationPopup();
      // });

    this._element
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this._handleFullscreen();
      });
  }
  countCardLikes() {
    this._element.querySelector(".elements__info_like-count").textContent =
      this._cardItem.likes.length;
  }

  checkDisplayBin() {
    if (this._cardItem.owner._id != '24139442016d554a06446484') {

      this._trashButtonElement.classList.add('elements__button_trash_hidden');
    }
    else {
      console.log(this._cardItem);
    }
}

}
