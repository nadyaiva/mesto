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
      super.renderLoading(true);
      this._formSubmit(this._getInputValues());
      this.close();
    });
  }
}
