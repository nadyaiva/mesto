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
const buttonAvatar = document.querySelector(".profile__avatar");
const config = {
  formSelector: ".form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const api = new Api({
  authorization: "d94e7cf1-3761-45b6-9798-0ad1da8f2858",
  cohort: "cohort-42",
  baseurl: "https://nomoreparties.co/v1/",
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

const userInfoApi = api.getUserInfoApi();
userInfoApi
  .then((data) => {
    userInfo.setUserInfo({ nameInput: data.name, jobInput: data.about });
    userInfo.setUserAvatar(data.avatar);
  })

  .catch((err) => {
    console.log(err);
  });

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

const handleToggleLikeClick = (cardElement, buttonLikeElement, cardId) => {
  if (buttonLikeElement.classList.contains("elements__button_like_active")) {
    api
      .dislikeCard(cardId)
      .then((res) => {
        if (res.ok) {
          buttonLikeElement.classList.toggle("elements__button_like_active");
          return res.json();
        }
      })
      .then((cardItem) => updateLikesCard(cardElement, cardItem.likes.length))
      .catch((err) => console.log(err));
  } else {
    api
      .likeCard(cardId)
      .then((res) => {
        if (res.ok) {
          buttonLikeElement.classList.toggle("elements__button_like_active");
          return res.json();
        }
      })
      .then((cardItem) => updateLikesCard(cardElement, cardItem.likes.length))
      .catch((err) => console.log(err));
  }
};

const handleDeleteCardWithPopup = (cardItem, cardElement) => {
  const popupWithConfirmation = new PopupWithConfirmation(
    ".popup_place_confirm",
    function () {
      return handleDeleteCard(cardItem, cardElement);
    }
  );
  popupWithConfirmation.open();
};

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
      handleDeleteClick: handleDeleteCardWithPopup,
      handleToggleLike: handleToggleLikeClick,
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
    formAddPopup.renderLoading(true);
    api
      .addNewCard(cardInputData)
      .then((res) => res.json())
      .then((card) => cardsList.addItem(createCard(card)))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        formAddPopup.close();
        formAddPopup.renderLoading(false);
      });
  }
);

const formAvatar = new PopupWithForm(
  ".popup_place_avatar",
  formValidators["popup-avatar"],
  (urlImage) => {
    api
      .updateAvatar(urlImage.link)
      .then((res) => res.json())
      .then((data) => (buttonAvatar.src = data.avatar))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        formAvatar.renderLoading(false);
        formAvatar.close();
      });
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
      })
      .finally(() => {
        formEditPopup.renderLoading(false);
      });
    formEditPopup.close();
  }
);

const updateLikesCard = (cardElement, likeCount) => {
  cardElement.querySelector(".elements__info_like-count").textContent =
    likeCount;
};

buttonEditProfile.addEventListener("click", () => {
  formValidators[formEditPopup.getFormElement().name].resetValidation();
  formEditPopup.setInputValues(userInfo.getUserInfo());
  formEditPopup.open();
});

buttonAddPhoto.addEventListener("click", () => {
  formValidators[formAddPopup.getFormElement().name].resetValidation();
  formAddPopup.open();
});

buttonAvatar.addEventListener("click", () => {
  formValidators[formAvatar.getFormElement().name].resetValidation();
  formAvatar.open();
});
