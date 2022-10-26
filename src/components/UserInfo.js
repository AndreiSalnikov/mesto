export default class UserInfo {
  constructor({userName, userAbout, avatar}) {
    this._elementName = document.querySelector(userName);
    this._elementAbout = document.querySelector(userAbout);
    this._elementAvatar = document.querySelector(avatar);
  }

  getUserInfo() {
    this._info = {};
    this._info.name = this._elementName.textContent;
    this._info.about = this._elementAbout.textContent
    return this._info;
  }

  setUserInfo({name, about}) {
    this._elementName.textContent = name;
    this._elementAbout.textContent = about;
  }

  setAvatar({avatar}) {
    this._elementAvatar.src = avatar;
  }
}