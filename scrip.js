let buttonEdit = document.querySelector('.button__edit');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
// Находим форму в DOM
let formElement = document.querySelector('.popup');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM

let nameInput = formElement.querySelector('.popup__item-name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__item-jobtitle');// Воспользуйтесь инструментом .querySelector()



function toggelPopup() {
    popup.classList.toggle('popup_opened');
}



// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    let nameInputValue = nameInput.value;// Получите значение полей jobInput и nameInput из свойства value
    let jobInputValue = jobInput.value;
    let profileName = document.querySelector('.profile__name');
    let profileTitle = document.querySelector('.profile__title');

    profileName.textContent = nameInputValue;
    profileTitle.textContent = jobInputValue;
    toggelPopup()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 

buttonEdit.addEventListener('click', toggelPopup);
popupCloseButton.addEventListener('click', toggelPopup);