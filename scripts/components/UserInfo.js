export default class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return { fullname: this._nameElement, jobtitle: this._jobElement };
  }

  setUserInfo({ nameInput, jobInput }) {
    this._nameElement.textContent = nameInput;
    this._jobElement.textContent = jobInput;
  }
  setUserAvatar(avatarURL) {
    this._avatarElement.src = avatarURL;
  }
}