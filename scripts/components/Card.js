export class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._cardItem = data;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this.countCardLikes();
  }

  // displayCardLike(numberLikes) {
  //   this._element.querySelector('.elements__info_like-count').textContent = numberLikes;
  // }


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
      this._cardItem.cardname;

    this._setEventListeners();
    return this._element;
  }

  _handleDeleteClick() {
    this._element.remove();
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

    this._element
      .querySelector(".elements__button_trash")
      .addEventListener("click", () => {
        this._handleDeleteClick();
      });

    this._element
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this._handleFullscreen();
      });
  }
  countCardLikes() {
    this._element.querySelector('.elements__info_like-count').textContent = this._cardItem.likes.length;

  }
}
