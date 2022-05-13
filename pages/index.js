const header__logo = new URL('../images/logo.svg', import.meta.url);
const profile__avatar = new URL('../images/profile__avatar.jpg', import.meta.url);
import '../pages/index.css';
import { Card } from "../scripts/components/Card.js";
import { initialCards } from "../scripts/cards.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
const buttonAddPhoto = document.querySelector(".profile__button_type_add");
const buttonEditProfile = document.querySelector(".profile__button_type_edit");
const config = {
  formSelector: ".form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    formValidators[formElement.name] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

const popupWithImage = new PopupWithImage(".popup-fullscreen");
const handleFullscreenClick = (cardItem) => {
  popupWithImage.open(cardItem);
};


function createCard(item) {
  const card = new Card(
       { data: item, handleCardClick: handleFullscreenClick },
       ".element-template_default"
     );
     const cardElement = card.generateCard();
     return cardElement
}


const cardsList = new Section(
  {
    data: initialCards,
    renderer: (cardItem) => {
      cardsList.addItem(createCard(cardItem));
    },
  },
  ".elements"
);

cardsList.renderItems();

const formAddPopup = new PopupWithForm(
  ".popup_place_add-photo", formValidators["popup-add-photo"],
  (cardInputData) => {
    cardsList.addItem(createCard(cardInputData));
    formAddPopup.close();
  }
);
const userInfo = new UserInfo(".profile__name", ".profile__title");
const formEditPopup = new PopupWithForm(
  ".popup_place_edit-profile", formValidators["form-profile"],
  (userInputData) => {
    userInfo.setUserInfo({
      nameInput: userInputData.fullname,
      jobInput: userInputData.jobtitle,
    });
    formEditPopup.close();
  }
);

buttonEditProfile.addEventListener("click", () => {
  formValidators[formEditPopup.getFormElement().name].resetValidation();
  formEditPopup.setInputValues(userInfo.getUserInfo());
  formEditPopup.open();
});

buttonAddPhoto.addEventListener("click", () => {
  formAddPopup.open();
});


