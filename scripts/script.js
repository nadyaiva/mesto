let popup = document.querySelector('.popup');
let form = popup.querySelector('.popup__container');

let buttonEdit = document.querySelector('.profile__button_type_edit');
let popupCloseButton = document.querySelector('.popup__close-button');

let nameInput = popup.querySelector('.popup__item_type_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = popup.querySelector('.popup__item_type_title');// Воспользуйтесь инструментом .querySelector()


let profileName = document.querySelector('.profile__name');
let profileTitle = document.querySelector('.profile__title');


function toggelPopup() {
    popup.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameInputValue = nameInput.value;// Получите значение полей jobInput и nameInput из свойства value
    let jobInputValue = jobInput.value;
    profileName.textContent = nameInputValue;
    profileTitle.textContent = jobInputValue;
    toggelPopup()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
form.addEventListener('submit', formSubmitHandler); 

buttonEdit.addEventListener('click', toggelPopup);
popupCloseButton.addEventListener('click', toggelPopup);