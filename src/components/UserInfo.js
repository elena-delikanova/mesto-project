export default class UserInfo {
  constructor({ selectorName, selectorCaption, selectorAvatar }) {
    this._profileNameElement = document.querySelector(selectorName);
    this._profileCaptionElement = document.querySelector(selectorCaption);
    this._userAvatar = document.querySelector(selectorAvatar);
  }

  setUserInfo({ name, about, avatar, _id }) {
    this.userId = _id;
    this._profileNameElement.textContent = name;
    this._profileCaptionElement.textContent = about;
    this._userAvatar.src = avatar;
    this._userAvatar.onerror = () => {
      this._userAvatar.src = new URL('./../images/avatar.jpg', import.meta.url);
    };
  }

  getCurrentInfo() {
    return { name: this._profileNameElement.textContent, about: this._profileCaptionElement.textContent };
  }
}
