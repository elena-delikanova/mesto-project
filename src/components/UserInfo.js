export default class UserInfo {
  constructor({selectorName, selectorCaption, selectorAvatar}) {
    this._profileNameElement = document.querySelector(selectorName);
    this._profileCaptionElement = document.querySelector(selectorCaption);
    this._userAvatar = document.querySelector(selectorAvatar);
  }

  setInfo({name, about, _id}) {
    this._profileNameElement.textContent = name;
    this._profileCaptionElement.textContent = about;
    this.userId = _id;
  }

  setAvatar(avatarLink) {
    this._userAvatar.src = avatarLink;
    this._userAvatar.onerror = () => {
      this._userAvatar.src = new URL('./../images/avatar.jpg', import.meta.url);
    };
  }

}
