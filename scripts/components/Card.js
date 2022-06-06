export class Card {
  constructor(
    { data, handleCardClick, handleDeleteClick, handleToggleLike },
    cardSelector
  ) {
    this._cardItem = data;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this.countCardLikes();
    this._trashButtonElement = this._element.querySelector(
      ".elements__button_trash"
    );
    this._buttonLikeElement = this._element.querySelector(
      ".elements__button_like"
    );
    this.checkDisplayBin();
    this._handleDelete = handleDeleteClick;
    this._handleToggleLike = handleToggleLike;
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

  _handleFullscreen() {
    this._handleCardClick(this._cardItem);
  }

  _setEventListeners() {
    this._buttonLikeElement.addEventListener("click", () => {
      this._handleToggleLike(
        this._element,
        this._buttonLikeElement,
        this._cardItem._id
      );
    });

    this._trashButtonElement.addEventListener("click", () => {
      this._handleDelete(this._cardItem, this._element);
    });

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
    if (this._cardItem.owner._id != "24139442016d554a06446484") {
      this._trashButtonElement.classList.add("elements__button_trash_hidden");
    }
  }
}
