// Validation

  const showInputError = (formElement, formInput, errorMessage, {...rest}) => {
    const formError = formElement.querySelector(`.${formInput.id}-error`);
    formError.textContent = errorMessage;
    formError.classList.add(rest.errorClass);
    formInput.classList.add(rest.inputErrorClass);
  };

  const hideInputError = (formElement, formInput, {...rest}) => {
    const formError = formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove(rest.inputErrorClass);
    formError.classList.remove(rest.errorClass);
    formError.textContent = '';
  };

  const checkInputValidity = (formElement, formInput, {...rest}) => {
    if (!formInput.validity.valid) {
        showInputError(formElement, formInput, formInput.validationMessage, rest);}
        
      else {
        hideInputError(formElement, formInput, rest);
      }
    };

    const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {
        const inputList = Array.from(formElement.querySelectorAll(inputSelector));
        const buttonElement = formElement.querySelector(submitButtonSelector);

        inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, rest)
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
          });
        });
      }; 

      const enableValidation = ({formSelector, ...rest}) => {
        const formList = Array.from(document.querySelectorAll(formSelector));

        formList.forEach((formElement) => {
          formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
          }); 
          setEventListeners(formElement, rest);
        });
      };
      
      enableValidation({
        formSelector: '.form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__save-button',
        inactiveButtonClass: 'popup__save-button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_active'
      }); 
  
      const hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        })
      }; 


const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.setAttribute("disabled", "disabled")
      buttonElement.classList.add(inactiveButtonClass);
    } else {
      buttonElement.removeAttribute("disabled", "disabled")
      buttonElement.classList.remove(inactiveButtonClass);
    }
  }; 


