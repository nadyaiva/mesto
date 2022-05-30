export default class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
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
    if (formError != null) {
      formInput.classList.remove(this._inputErrorClass);
      formError.classList.remove(this._errorClass);
      formError.textContent = "";
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        if (this._hasInvalidInput(this._inputList)) {
          this.disableButton();
        } else {
          this.activateButton();
        }
      });
    });
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    if (this._hasInvalidInput(this._inputList)) {
      this.disableButton();
    } else {
      this.activateButton();
    }
    this._formElement.reset();
  }

  disableButton() {
    this._buttonElement.setAttribute("disabled", "disabled");
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  activateButton() {
    this._buttonElement.removeAttribute("disabled", "disabled");
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  }

  enableValidation() {
    this._setEventListeners();
  }
}
