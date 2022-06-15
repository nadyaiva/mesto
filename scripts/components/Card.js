export class Card {
  constructor(
    { handleCardClick, handleDeleteClick, handleToggleLike },
    data,
    cardSelector,
    userId
  ) {
    this._cardItem = data;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
    this._likes = data.likes;
    this._element = this._getTemplate();
    this._trashButtonElement = this._element.querySelector(
      ".elements__button_trash"
    );
    this._buttonLikeElement = this._element.querySelector(
      ".elements__button_like"
    );
    this._handleDelete = handleDeleteClick;
    this._handleToggleLike = handleToggleLike;
    this._userId = userId;
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
    this._element.querySelector(".elements__info_like-count").textContent =
      this._likes.length;
    this._setEventListeners();
    if (this._cardItem.owner._id != this._userId) {
      this._trashButtonElement.classList.add("elements__button_trash_hidden");
    }
    if (this.isLiked())
      this._buttonLikeElement.classList.add("elements__button_like_active");
    return this._element;
  }

  _handleFullscreen() {
    this._handleCardClick(this._cardItem);
  }

  _setEventListeners() {
    this._buttonLikeElement.addEventListener("click", () => {
      this._handleToggleLike(this, this._cardItem._id);
    });

    this._trashButtonElement.addEventListener("click", () => {
      this._handleDelete(this, this._cardItem, this._element);
    });

    this._element
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this._handleFullscreen();
      });
  }

  isLiked() {
    return Boolean(this._likes.find((item) => item._id === this._userId));
  }
  statusliketoggle(data) {
    this._element.querySelector(".elements__info_like-count").textContent =
      data.likes.length;
    if (!this.isLiked())
      this._buttonLikeElement.classList.add("elements__button_like_active");
    else
      this._buttonLikeElement.classList.remove("elements__button_like_active");
    this._likes = data.likes;
  }

  deleteCard() {
    this._element.remove();
  }
}
