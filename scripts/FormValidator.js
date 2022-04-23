export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _checkInputValidity(formInput) {
    if (!formInput.validity.valid) {
      this._showInputError(formInput, formInput.validationMessage);
    } else {
      this._hideInputError(formInput);
    }
  }

  _showInputError(formInput, errorMessage) {
    const formError = this._formElement.querySelector(`.${formInput.id}-error`);
    formError.textContent = errorMessage;
    formError.classList.add(this._errorClass);
    formInput.classList.add(this._inputErrorClass);
  }

  _hideInputError(formInput) {
    const formError = this._formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove(this._inputErrorClass);
    formError.classList.remove(this._errorClass);
    formError.textContent = "";
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute("disabled", "disabled");
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.removeAttribute("disabled", "disabled");
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
