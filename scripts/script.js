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

const popupEdit = document.querySelector('.popup-form_edit-profile');
const formEdit = popupEdit.querySelector('.popup__container_edit-profile');
const buttonAddPhoto = document.querySelector('.profile__button_type_add');
const buttonEditProfile = document.querySelector('.profile__button_type_edit');

// POPUP BUTTON CLOSE
const popupCloseButtonAddPhoto = document.querySelector('.popup__close-button_place_form-photo');
const popupCloseButtonEditProfile = document.querySelector('.popup__close-button_place_profile');
const popupCloseButtonFullscreen = document.querySelector('.popup__close-button_place_fullscreen');

let nameInput = popupEdit.querySelector('.popup__item_type_name');
let jobInput = popupEdit.querySelector('.popup__item_type_job');
let profileName = document.querySelector('.profile__name');
let profileTitle = document.querySelector('.profile__title');

const popupAdd = document.querySelector('.popup-form_add-photo');
const formAdd = popupAdd.querySelector('.popup__container_form_add-photo');

let titleInput = popupAdd.querySelector('.popup__item_type_title');
let linkInput = popupAdd.querySelector('.popup__item_type_pic-link');

const elementContainer = document.querySelector('.element-container');
const elementTemplate = document.querySelector('#element-template').content;

// FULLSCREEN POPUP
const popupFullscreen = document.querySelector('.popup__fullscreen');
const fullscreenImage = document.querySelector('.popup__fullscreen-image');
const fullscreenCaption = document.querySelector('.popup__fullscreen-caption');


function formSubmitHandlerEditProfile (evt) {
    evt.preventDefault();
    let nameInputValue = nameInput.value;// Получите значение полей jobInput и nameInput из свойства value
    let jobInputValue = jobInput.value;
    profileName.textContent = nameInputValue;
    profileTitle.textContent = jobInputValue;
    toggelPopupEdit()
}

// dynamic defolt PLACE CREATE



function addNewPlaceDefolt(titleValue='', linkValue='') {
  placeElement = formCardHendler('.elements__element', '.elements__caption', '.elements__image', titleValue, linkValue, '.elements__button_like', '.elements__button_trash')
  elementContainer.append(placeElement);
}
function showPlaces(initialCards) {
  initialCards.forEach(element => {
      addNewPlaceDefolt(element.name, element.link)
  });
}

//   PLACE CREATE FROM USER

function addNewPlaceFromUser (evt) {
    evt.preventDefault();
    let titleInputValue = titleInput.value;
    let linkInputValue = linkInput.value;
    if (titleInputValue && linkInputValue) {
        placeElement = formCardHendler('.elements__element', '.elements__caption', '.elements__image', titleInputValue, linkInputValue, '.elements__button_like', '.elements__button_trash')
        
        elementContainer.prepend(placeElement);
    }
    toggelPopupAdd()
}

function formCardHendler(elements__element, elements__caption, elements__image, titleValue, linkValue, elements__button_like, elements__button_trash) {
  const placeElement = elementTemplate.querySelector(elements__element).cloneNode(true);
  const elementImage = placeElement.querySelector(elements__image);
    captionValueContent = placeElement.querySelector(elements__caption).textContent = titleValue;
    linkValueSrc = placeElement.querySelector(elements__image).src = linkValue; 
    placeElement.querySelector(elements__image).alt = titleValue;
    placeElement.querySelector(elements__button_like).addEventListener('click', function (evt) {
      evt.target.classList.toggle('elements__button_like_active');
    });
    elementImage.addEventListener('click', function(event) {
      const mainElement = event.target.closest('.elements__element');
      fullscreenImage.src = mainElement.querySelector(elements__image).src;
      fullscreenCaption.textContent = mainElement.querySelector(elements__caption).textContent;
      fullscreenImage.alt = mainElement.querySelector(elements__image).alt;
      toggelPopupFullscreen()
    });
    const buttonTrash = placeElement.querySelector(elements__button_trash);
        buttonTrash.addEventListener('click', function (evt) {
        const element = evt.target.closest(elements__element);
        element.remove();  
}
)
    return placeElement
}

showPlaces(initialCards)

formEdit.addEventListener('submit', formSubmitHandlerEditProfile); 
buttonEditProfile.addEventListener('click', toggelPopupEdit);
popupCloseButtonEditProfile.addEventListener('click', toggelPopupEdit);
formAdd.addEventListener('submit', addNewPlaceFromUser ); 
buttonAddPhoto.addEventListener('click', toggelPopupAdd);
popupCloseButtonAddPhoto.addEventListener('click', toggelPopupAdd);

popupCloseButtonFullscreen.addEventListener('click', toggelPopupFullscreen);

function toggelPopupFullscreen() {
  popupFullscreen.classList.toggle('popup_opened');
}

function toggelPopupEdit() {
    popupEdit.classList.toggle('popup_opened');
}

function toggelPopupAdd() {
  popupAdd.classList.toggle('popup_opened');
}
