const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export default class Api {
  constructor(config) {
    //   this._url = config.url;
    this._authorization = config.authorization;
    this._id = config.id;
  }

  getUserInfoApi() {
    return fetch("https://nomoreparties.co/v1/cohort-42/users/me", {
      headers: {
        authorization: this._authorization,
      },
    }).then(handleResponse)
  }
  getInitialCards() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-42/cards", {
      headers: {
        authorization: this._authorization,
      },
    }).then(handleResponse)
  }
  updateUserInfo(nameInputValue, titleInputValue) {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-42/users/me", {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInputValue,
        about: titleInputValue,
      }),
    });
  }
  addNewCard(cardInputData) {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-42/cards", {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cardInputData.cardname,
        link: cardInputData.link,
      }),
    })
  }
  likeCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-42/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
      },
    });
  }

  dislikeCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-42/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    });
  }

  deletePost(cardId) {
    return fetch(
      "https://mesto.nomoreparties.co/v1/cohort-42/cards/" + cardId,
      {
        method: "DELETE",
        headers: {
          authorization: this._authorization,
        },
      }
    );
  }
}
