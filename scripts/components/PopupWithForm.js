import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, formValidator, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._inputName = this._popup.querySelector(".popup__input_type_name");
    this._inputJob = this._popup.querySelector(".popup__input_type_job");
    this._formValidator = formValidator;
    this._formValidator.resetValidation();
    
  }

  renderLoading(isLoading) {
    // console.log('renderLoading: isLoading = ' + isLoading);
    this._saveButton = document.querySelector('.popup__save-button');
    if (isLoading) {
      // console.log('trying to set a textContent to saveButton = ' + this._saveButton);
      // console.log('current textContent = ' + this._saveButton.textContent);
      this._saveButton.textContent = 'Сохранение..';
      // setTimeout('', 5000);
    }
    else {
      this._saveButton.textContent = 'Сохранить';
    }
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((inputItem) => {
      this._inputValues[inputItem.name] = inputItem.value;
    });
    return this._inputValues;
  }

  setInputValues({ name, job }) {
    this._inputName.value = name.textContent;
    this._inputJob.value = job.textContent;
  }

  close() {
    super.close();
    this._formValidator.resetValidation();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true)
      this._formSubmit(this._getInputValues());
      this.close();
    });
  }
}
