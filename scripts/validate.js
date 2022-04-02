// Validation

  const showInputError = (formElement, formInput, errorMessage) => {
    const formError = formElement.querySelector(`.${formInput.id}-error`);
    formError.textContent = errorMessage;
    formError.classList.add('popup__input-error_active');
    formInput.classList.add('popup__input_type_error');
  };

  const hideInputError = (formElement,formInput) => {
    const formError = formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove('popup__input_type_error');
    formError.classList.remove('popup__input-error_active');
    formError.textContent = '';
  };

  const checkInputValidity = (formElement, formInput) => {
    if (!formInput.validity.valid) {
        showInputError(formElement, formInput, formInput.validationMessage);}
        
      else {
        hideInputError(formElement, formInput);
      }
    };

    const setEventListeners = (formElement) => {
        // Находим все поля внутри формы,
        // сделаем из них массив методом Array.from
        const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
        const buttonElement = formElement.querySelector('.popup__save-button');
      
        // Обойдём все элементы полученной коллекции
        inputList.forEach((inputElement) => {
          // каждому полю добавим обработчик события input
          inputElement.addEventListener('input', () => {
            // Внутри колбэка вызовем isValid,
            // передав ей форму и проверяемый элемент
            checkInputValidity(formElement, inputElement)
            toggleButtonState(inputList, buttonElement);
          });
        });
      }; 

      const enableValidation = () => {
        // Найдём все формы с указанным классом в DOM,
        // сделаем из них массив методом Array.from
        const formList = Array.from(document.querySelectorAll('.form'));
      
        // Переберём полученную коллекцию
        formList.forEach((formElement) => {
          formElement.addEventListener('submit', (evt) => {
            // У каждой формы отменим стандартное поведение
            evt.preventDefault();
          });
      
          // Для каждой формы вызовем функцию setEventListeners,
          // передав ей элемент формы
          setEventListeners(formElement);
        });
      };
      
      // Вызовем функцию
      enableValidation(); 
  
      const hasInvalidInput = (inputList) => {
        // проходим по этому массиву методом some
        return inputList.some((inputElement) => {
          // Если поле не валидно, колбэк вернёт true
          // Обход массива прекратится и вся фунцкция
          // hasInvalidInput вернёт true
      
          return !inputElement.validity.valid;
        })
      }; 

      // Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.setAttribute("disabled", "disabled")
      buttonElement.classList.add('popup__save-button_disabled');
    } else {
      // иначе сделай кнопку активной
      buttonElement.removeAttribute("disabled", "disabled")
      buttonElement.classList.remove('popup__save-button_disabled');
    }
  }; 

enableValidation({
    formSelector: '.form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }); 
