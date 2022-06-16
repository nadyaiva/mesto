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
    this._submitButton = this._form.querySelector('.popup__save-button');
  }

  visualizeLoading(text) {
    this._submitButton.textContent = `${text}`;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((inputItem) => {
      this._inputValues[inputItem.name] = inputItem.value;
    });
    return this._inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((inputElement) => {
      inputElement.value = data[inputElement.name].textContent;
    });
  } 

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // super.renderLoading(true);
      this._formSubmit(this._getInputValues());
    });
  }
}
