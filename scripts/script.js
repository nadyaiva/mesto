const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

//   POPUP EDIT PROFILE

const popupEdit = document.querySelector('.popup_place_profile');
const formEdit = popupEdit.querySelector('.popup__container_place_profile');

const buttonEditProfile = document.querySelector('.profile__button_type_edit');
const popupCloseButtonEditProfile = document.querySelector('.popup__close-button_place_profile');

let nameInput = popupEdit.querySelector('.popup__item_type_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = popupEdit.querySelector('.popup__item_type_job');// Воспользуйтесь инструментом .querySelector()


let profileName = document.querySelector('.profile__name');
let profileTitle = document.querySelector('.profile__title');


function toggelPopupEdit() {
    popupEdit.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameInputValue = nameInput.value;// Получите значение полей jobInput и nameInput из свойства value
    let jobInputValue = jobInput.value;
    profileName.textContent = nameInputValue;
    profileTitle.textContent = jobInputValue;
    toggelPopupEdit()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEdit.addEventListener('submit', formSubmitHandler); 

buttonEditProfile.addEventListener('click', toggelPopupEdit);
popupCloseButtonEditProfile.addEventListener('click', toggelPopupEdit);

//   POPUP ADD PHOTO


const popupAdd = document.querySelector('.popup_place_photo');
const formAdd = popupAdd.querySelector('.popup__container_place_photo');

const buttonAddPhoto = document.querySelector('.profile__button_type_add');
const popupCloseButtonAddPhoto = document.querySelector('.popup__close-button_place_photo');

let titleInput = popupAdd.querySelector('.popup__item_type_title'); // Воспользуйтесь инструментом .querySelector()
let linkInput = popupAdd.querySelector('.popup__item_type_pic-link');// Воспользуйтесь инструментом .querySelector()

function toggelPopupAdd() {
    popupAdd.classList.toggle('popup_opened');
}

function formSubmitHandlerAddPhoto (evt) {
    evt.preventDefault();
    let titleInputValue = titleInput.value;
    let linkInputValue = linkInput.value;
    if (titleInputValue && linkInputValue) {
        const placeElement = elementTemplate.querySelector('.elements__element').cloneNode(true);
        placeElement.querySelector('.elements__info').querySelector('.elements__caption').textContent = titleInputValue;
        placeElement.querySelector('.elements__image').src = linkInputValue;
        elementContainer.prepend(placeElement);
    }
    toggelPopupAdd()
}

formAdd.addEventListener('submit', formSubmitHandlerAddPhoto); 
buttonAddPhoto.addEventListener('click', toggelPopupAdd);
popupCloseButtonAddPhoto.addEventListener('click', toggelPopupAdd);

// dynamic defolt PLACE CREATE

const elementContainer = document.querySelector('.element-container');
const elementTemplate = document.querySelector('#element-template').content;

function addNewPlaceDefolt(titleValue='', linkValue='') {
    const placeElement = elementTemplate.querySelector('.elements__element').cloneNode(true);
    placeElement.querySelector('.elements__info').querySelector('.elements__caption').textContent = titleValue;
    placeElement.querySelector('.elements__image').src = linkValue;
    
    
    elementContainer.append(placeElement);
}

function showPlaces(initialCards) {
    initialCards.forEach(element => {
        addNewPlaceDefolt(element.name, element.link)
    });
}
showPlaces(initialCards)

//  new place add by user
