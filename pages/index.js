import "./index.css";
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
const buttonAvatar = document.querySelector(".profile__avatar");
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

let userId;

const api = new Api({
  authorization: "d94e7cf1-3761-45b6-9798-0ad1da8f2858",
  cohort: "cohort-42",
  baseurl: "https://nomoreparties.co/v1/",
});

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__title",
  ".profile__avatar"
);

Promise.all([api.getUserInfoApi(), api.getInitialCards()])
  .then(([data, cards]) => {
    userInfo.setUserAvatar(data.avatar);
    userInfo.setUserInfo({ nameInput: data.name, jobInput: data.about });
    userId = data._id;
    cardsList.renderItems(cards);
  })
  .catch((err) => console.log(err));

const cardsList = new Section(
  {
    renderer: (cardItem) => {
      cardsList.addItem(createCard(cardItem));
    },
  },
  ".elements"
);

const popupWithImage = new PopupWithImage(".popup-fullscreen");
const handleFullscreenClick = (cardItem) => {
  popupWithImage.open(cardItem);
};

// const handleToggleLikeClick = (card, cardId) => {
//   api
//     .changeCardLikeStatus(cardId, !card.isLiked())
//     .then((data) => {
//       console.log('andleToggleLikeClick', data)
//       card.statusliketoggle(data);
//     })
//     .catch((err) => console.log(err));
// };

const popupWithConfirmation = new PopupWithConfirmation(".popup_place_confirm");

function createCard(cardItem) {
  const card = new Card(
    {
      handleCardClick: handleFullscreenClick,
      handleDeleteClick: (cardItem) => {
        popupWithConfirmation.visualizeLoading("Да");
        popupWithConfirmation.setSubmitHandler(() => {
          api
            .deletePost(cardItem._cardItem._id)
            .then((data) => {
              popupWithConfirmation.close();
              card.deleteCard();
            })
            .catch((err) => console.log(err))
            .finally(popupWithConfirmation.visualizeLoading("Удаление..."));
        });
        popupWithConfirmation.open();
      },
      handleToggleLike: (card, cardId) => {
        api
          .changeCardLikeStatus(cardId, !card.isLiked())
          .then((data) => {
            console.log("andleToggleLikeClick", data);
            card.statusliketoggle(data);
          })
          .catch((err) => console.log(err));
      },
    },
    cardItem,
    ".element-template_default",
    userId
  );
  const cardElement = card.generateCard();
  return cardElement;
}

const formAddPopup = new PopupWithForm(
  ".popup_place_add-photo",
  formValidators["popup-add-photo"],
  (cardInputData) => {
    // formAddPopup.renderLoading(true);
    api
      .addNewCard(cardInputData)
      .then((card) => {
        cardsList.addItem(createCard(card));
        formAddPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // formAddPopup.renderLoading(false);
      });
  }
);

const formAvatar = new PopupWithForm(
  ".popup_place_avatar",
  formValidators["popup-avatar"],
  (urlImage) => {
    api
      .updateAvatar(urlImage.link)
      .then((data) => {
        userInfo.setUserAvatar(data.avatar);
        formAvatar.close();
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      })
      .finally(() => {
        formAvatar.renderLoading(false);
      });
  }
);

const formEditPopup = new PopupWithForm(
  ".popup_place_edit-profile",
  formValidators["form-profile"],
  (userInputData) => {
    const userInfoUpdate = api
      .updateUserInfo(userInputData.fullname, userInputData.jobtitle)
      .then(() => {
        userInfo.setUserInfo({
          nameInput: userInputData.fullname,
          jobInput: userInputData.jobtitle,
        });
        formEditPopup.close();
      });
    userInfoUpdate
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      })
      .finally(() => {
        formEditPopup.renderLoading(false);
      });
  }
);

formAvatar.setEventListeners();
formEditPopup.setEventListeners();
popupWithConfirmation.setEventListeners();
formAddPopup.setEventListeners();
popupWithImage.setEventListeners();

buttonEditProfile.addEventListener("click", () => {
  formValidators['form-profile'].resetValidation();
  formEditPopup.setInputValues(userInfo.getUserInfo());
  formEditPopup.open();
});

buttonAddPhoto.addEventListener("click", () => {
  formValidators['popup-add-photo'].resetValidation();
  formAddPopup.open();
});

buttonAvatar.addEventListener("click", () => {
  formValidators['popup-avatar'].resetValidation();
  formAvatar.open();
});
