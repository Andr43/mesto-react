class Api {
  constructor(authorizationCode, url) {
    this._authorizationCode = authorizationCode;
    this._url = url;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      `Ошибка: ${res.status}. Проверьте правильность указанного URL-адреса.`
    );
  }

  getUserInfo() {
    return fetch(this._url + "/users/me", {
      headers: {
        authorization: this._authorizationCode,
      },
    }).then(this._checkStatus);
  }

  getCards() {
    return fetch(this._url + "/cards", {
      headers: {
        authorization: this._authorizationCode,
      },
    }).then(this._checkStatus);
  }

  updateUserInfo(name, about) {
    return fetch(this._url + "/users/me", {
      method: "PATCH",
      headers: {
        authorization: this._authorizationCode,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkStatus);
  }

  addNewCard(data) {
    return fetch(this._url + "/cards", {
      method: "POST",
      headers: {
        authorization: this._authorizationCode,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.heading,
        link: data.source,
      }),
    }).then(this._checkStatus);
  }

  deleteCard(id) {
    return fetch(this._url + "/cards/" + id, {
      method: "DELETE",
      headers: {
        authorization: this._authorizationCode,
      },
    }).then(this._checkStatus);
  }

  putLike(id) {
    return fetch(this._url + "/cards/" + id + "/likes", {
      method: "PUT",
      headers: {
        authorization: this._authorizationCode,
      },
    }).then(this._checkStatus);
  }

  deleteLike(id) {
    return fetch(this._url + "/cards/" + id + "/likes", {
      method: "DELETE",
      headers: {
        authorization: this._authorizationCode,
      },
    }).then(this._checkStatus);
  }

  updateUserImage(imageSource) {
    return fetch(this._url + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: this._authorizationCode,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: imageSource,
      }),
    }).then(this._checkStatus);
  }
}

const api = new Api(
  "61a5c5ab-9b62-4552-b9af-3bc710596f3a",
  "https://nomoreparties.co/v1/cohort-59"
);

export default api;
