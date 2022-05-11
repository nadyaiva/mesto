import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._inputList = this._popup.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((inputItem) => {
      this._inputValues[inputItem.name] = inputItem.value;
    });
    return this._inputValues;
  }

  setInputValues({ name, job }) {
    this._popup.querySelector(".popup__input_type_name").value =
      name.textContent;
    this._popup.querySelector(".popup__input_type_job").value = job.textContent;
  }

  close() {
    super.close();
  }

  open() {
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
      this.close();
    });
  }
}
