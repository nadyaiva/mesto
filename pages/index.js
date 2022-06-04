import "../pages/index.css";
import { Card } from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";
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


 
const handleDeleteCardWithPopup = (cardItem, cardElement) => {
  const popupWithConfirmation = new PopupWithConfirmation('.popup_place_confirm',
      function() { 
        return handleDeleteCard(cardItem, cardElement);
      });
  popupWithConfirmation.open();
}

const handleDeleteCard = (cardItem, cardElement) => {
  api
    .deletePost(cardItem._id)
    .then((res) => {
      if (res.ok) {
        cardElement.remove();
        return res.json();
      }
    })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

function createCard(item) {
  const card = new Card(
    {
      data: item,
      handleCardClick: handleFullscreenClick,
      handleDeleteClick: handleDeleteCardWithPopup
    },

    ".element-template_default"
  );
  const cardElement = card.generateCard();
  return cardElement;
}

const formAddPopup = new PopupWithForm(
  ".popup_place_add-photo",
  formValidators["popup-add-photo"],
  (cardInputData) => {
    api
      .addNewCard(cardInputData)
      .then((res) => res.json())
      .then((card) => cardsList.addItem(createCard(card)))
      .catch((err) => {
        console.log(err);
      });
    formAddPopup.close();
  }
);

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__title",
  ".profile__avatar"
);

const formEditPopup = new PopupWithForm(
  ".popup_place_edit-profile",
  formValidators["form-profile"],
  (userInputData) => {
    userInfo.setUserInfo({
      nameInput: userInputData.fullname,
      jobInput: userInputData.jobtitle,
    });
    const userInfoUpdate = api.updateUserInfo(
      userInputData.fullname,
      userInputData.jobtitle
    );
    userInfoUpdate
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
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
  formValidators[formAddPopup.getFormElement().name].resetValidation();
  formAddPopup.open();
});

const api = new Api({
  authorization: "d94e7cf1-3761-45b6-9798-0ad1da8f2858",
  id: "24139442016d554a06446484",
});

const userInfoApi = api.getUserInfoApi();
userInfoApi
  .then((data) => {
    userInfo.setUserInfo({ nameInput: data.name, jobInput: data.about });
    userInfo.setUserAvatar(data.avatar);
  })

  .catch((err) => {
    console.log(err);
  });

const cardsList = new Section(
  {
    renderer: (cardItem) => {
      cardsList.addItem(createCard(cardItem));
    },
  },
  ".elements"
);

function uplodeCards() {
  const cardsApi = api.getInitialCards();
  cardsApi
    .then((cards) => {
      cardsList.renderItems(cards);
    })
    .catch((err) => {
      console.log(err);
    });
}
uplodeCards();
