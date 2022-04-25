export class FormValidator {
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
    this._formError = this._formElement.querySelector(
      `.${this._formElement.querySelector(this._inputSelector).id}-error`
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
    this._formError.textContent = errorMessage;
    this._formError.classList.add(this._errorClass);
    formInput.classList.add(this._inputErrorClass);
  }

  _hideInputError(formInput) {
    if (this._formError != null) {
      formInput.classList.remove(this._inputErrorClass);
      this._formError.classList.remove(this._errorClass);
      this._formError.textContent = "";
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
