export default class UserInfo {
  constructor({userName,userAbout}) {
    this._elementName = userName;
    this._elementAbout = userAbout;
  }

  getUserInfo() {
    const info = {};
    info.name = this._elementName.textContent;
    info.about = this._elementAbout.textContent
    return info;
  }

  setUserInfo({name,about}) {
    this._elementName.textContent = name;
    this._elementAbout.textContent = about;
  }
}