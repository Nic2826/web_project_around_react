class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  async getInitialCards() {
    return await fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => {
      console.log(err); // registra el error en la consola
    });

  }

  async getUserInfo() {
    return await fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => {
      console.log(err); // registra el error en la consola
    });
  }

  async updateUserInfo(data) {
    return await fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
        avatar: data.avatar,
        _id: data._id
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => {
      console.log(err); // registra el error en la consola
    });
  }

   async updateAvatar(avatar) {
    const late = await fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    return late.json();
  }

   async postCards(card) {
   const late = await fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      })
      
    })
    return await late.json();
  }

   async deleteCard(cardId) {
    return await fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => {
      console.log(err); // registra el error en la consola
    });
  }

   async addLike(cardId) {
    return await fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this.headers,
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // si el servidor devuelve un error, rechaza el promise
      return Promise.reject(`Error: ${res.status}`)
        .catch((err) => {
          console.log(err); // registra el error en la consola
        });
    })
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.deleteLike(cardId);
    } else {
      return this.addLike(cardId);
    }
  }

   async deleteLike(cardId) {
     return await fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    })
    .then(res => {
      if (res.ok) {
        return  res.json();
      }
    })
    .catch((err) => {
      console.log(err); // registra el error en la consola
    });
  }
}


const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_es_11",
  headers: {
    authorization: "96b4dc3c-0ccb-4f44-b22d-30d4ca64744f",
    "Content-Type": "application/json",
  },
  groupId: "web_es_11",
});

export default api;