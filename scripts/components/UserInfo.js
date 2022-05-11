export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }
  getUserInfo() {
    return { name: this._nameElement, job: this._jobElement };
  }

  setUserInfo({ nameInput, jobInput }) {
    this._nameElement.textContent = nameInput;
    this._jobElement.textContent = jobInput;
  }
}
