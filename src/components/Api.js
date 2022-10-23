export default class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  getServerInfo(path) {
    return fetch(this._url + path, {headers: this._headers}).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    }).catch((err) => {
      console.log(err)
    })
  };

  editServerProfileInfo(data, path,button) {
      this._loading(button,true);
     return fetch(this._url + path, {
      method: "PATCH",
      headers: this._headers, body: JSON.stringify({
        name: data.name, about: data.about,
      }),
    }).catch((err) => console.log(err)).finally(()=>this._loading(button,false))
  };

  addServerCard(data,path,button) {
      this._loading(button,true);
   return fetch(this._url + path, {
      method: "POST",
      headers: this._headers, body: JSON.stringify({
        name: data.name, link: data.link,
      }),
    }).catch((err) => console.log(err)).finally(()=>this._loading(button,false))
  };

    deleteServerCard(id, path, button) {
        this._loading(button,true);
        return fetch(this._url + path + `/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).catch((err) =>console.log(err)).finally(()=>this._loading(button,false))
    };

    setServerLike(cardId) {
        return fetch(this._url + `/cards/${cardId}`+ "/likes", {
            method: "PUT",
            headers: this._headers,
        }).catch((err)=> console.log(err));
    }

    removeServerLike(cardId) {
        return fetch(this._url + `/cards/${cardId}` + "/likes", {
            method: "DELETE",
            headers: this._headers,
        }).catch((err)=> console.log(err));
    }

    setServerAvatar(data,path,button) {
         this._loading(button,true);
            return fetch(this._url + path + "/avatar", {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    avatar: data.avatar,
                }),
            }).catch((err)=> console.log(err)).finally(()=>this._loading(button,false))

    }
    _loading(button,isLoading) {
        if(isLoading){
            button.textContent = "Сохранение...";
        }
        else  button.textContent = "Сохранить"
    }
}