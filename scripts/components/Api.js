export default class Api {
  constructor(config) {
    this._authorization = config.authorization;
    this._cohort = config.cohort;
    this._baseurl = config.baseurl
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfoApi() {
    return fetch(`${this._baseurl}${this._cohort}/users/me`, {
      headers: {
        authorization: this._authorization,
      },
    }).then(this._handleResponse);
  }
  getInitialCards() {
    return fetch(`${this._baseurl}${this._cohort}/cards`, {
      headers: {
        authorization: this._authorization,
      },
    }).then(this._handleResponse);
  }
  updateUserInfo(nameInputValue, titleInputValue) {
    return fetch(`${this._baseurl}${this._cohort}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInputValue,
        about: titleInputValue,
      }),
    }).then(this._handleResponse);
  }
  addNewCard(cardInputData) {
    return fetch(`${this._baseurl}${this._cohort}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cardInputData.cardname,
        link: cardInputData.link,
      }),
    }).then(this._handleResponse);
  }
  likeCard(cardId) {
    return fetch(
      `${this._baseurl}${this._cohort}/cards/${cardId}/likes`,
      {
        method: "PUT",
        headers: {
          authorization: this._authorization,
        },
      }
    ).then(this._handleResponse);
  }

  dislikeCard(cardId) {
    return fetch(
      `${this._baseurl}${this._cohort}/cards/${cardId}/likes`,
      {
        method: "DELETE",
        headers: {
          authorization: this._authorization,
        },
      }
    ).then(this._handleResponse);
  }

  deletePost(cardId) {
    return fetch(
      `${this._baseurl}${this._cohort}/cards/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: this._authorization,
        },
      }
    ).then(this._handleResponse);
  }
  updateAvatar(urlImage) {
    return fetch(
      `${this._baseurl}${this._cohort}/users/me/avatar`,
      {
        method: "PATCH",
        headers: {
          authorization: this._authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: urlImage,
        }),
      }
    ).then(this._handleResponse);
  }
}
