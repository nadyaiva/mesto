import { Card } from "./Card.js";
import { initialCards } from "./cards.js";
import { FormValidator } from "./FormValidator.js";

const popupEdit = document.querySelector(".popup_place_edit-profile");
const formEdit = popupEdit.querySelector(".form_edit-profile");
const buttonAddPhoto = document.querySelector(".profile__button_type_add");
const buttonEditProfile = document.querySelector(".profile__button_type_edit");

const nameInput = popupEdit.querySelector(".popup__input_type_name");
const jobInput = popupEdit.querySelector(".popup__input_type_job");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");

const popupAdd = document.querySelector(".popup_place_add-photo");
const formAdd = popupAdd.querySelector(".form_add-photo");

const titleInput = popupAdd.querySelector(".popup__input_type_title");
const linkInput = popupAdd.querySelector(".popup__input_type_pic-link");

const elementsContainer = document.querySelector(".elements");
const elementTemplate = document.querySelector("#element-template").content;

// FULLSCREEN POPUP
const popupFullscreen = document.querySelector(".popup-fullscreen");
const fullscreenImage = document.querySelector(".popup-fullscreen__image");
const fullscreenCaption = document.querySelector(".popup-fullscreen__caption");

function renderCard(newCard) {
  elementsContainer.prepend(newCard);
}
initialCards.forEach((item) => {
  item.openPopup = openPopup;
  // Создадим экземпляр карточки
  const card = new Card(item, ".element-template_default");
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  //document.querySelector('.elements').prepend(cardElement);
  renderCard(cardElement);
});

function addNewPlaceFromUser(evt) {
  evt.preventDefault();

  const titleInputValue = titleInput.value;
  const linkInputValue = linkInput.value;

  if (titleInputValue && linkInputValue) {
    const cardInputData = {
      name: titleInput.value,
      link: linkInput.value,
      openPopup: openPopup,
    };
    const card = new Card(cardInputData, ".element-template_default");
    renderCard(card.generateCard());
    closePopup(popupAdd);
    titleInput.value = '';
    linkInput.value = '';
  }
}

function handleSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileTitle.textContent = jobInput.value;
  closePopup(popupEdit);
}

formEdit.addEventListener("submit", handleSubmitProfile);
buttonEditProfile.addEventListener("click", () => {
  openPopup(popupEdit);
});

formAdd.addEventListener("submit", (evt) => {
  addNewPlaceFromUser(evt);
  formAdd.querySelector(".popup__close").setAttribute("disabled", "disabled");
});

buttonAddPhoto.addEventListener("click", () => {
  openPopup(popupAdd);
});

const handleEsc = (evt) => {
  const escape = 27;
  if (evt.which === escape) {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
};

const handleOverlay = (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
};

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEsc);
  document.addEventListener("click", handleOverlay);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEsc);
  document.removeEventListener("click", handleOverlay);
}

function startValidate() {
  const config = {
    formSelector: ".form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active",
  };
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    const formValidated = new FormValidator(config, formElement);
    formValidated.enableValidation()
  });
}
startValidate();
