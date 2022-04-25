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

function createCard(cardItem) {
  cardItem.openPopup = openPopup;
  const card = new Card(cardItem, ".element-template_default");
  return card;
}

function renderCard(newCard) {
  elementsContainer.prepend(newCard);
}
initialCards.forEach((item) => {
  const card = createCard(item);
  const cardElement = card.generateCard();
  renderCard(cardElement);
});

function addNewPlaceFromUser(evt) {
  evt.preventDefault();

  const cardInputData = {
    name: titleInput.value,
    link: linkInput.value,
  };
  const card = createCard(cardInputData);
  renderCard(card.generateCard());
  closePopup(popupAdd);
  formValidators[formAdd.name].resetValidation();
}

function handleSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileTitle.textContent = jobInput.value;
  closePopup(popupEdit);
}

formEdit.addEventListener("submit", handleSubmitProfile);
buttonEditProfile.addEventListener("click", () => {
  formValidators[formEdit.name].resetValidation();
  nameInput.value = profileName.textContent;
  jobInput.value = profileTitle.textContent;
  openPopup(popupEdit);
});

formAdd.addEventListener("submit", (evt) => {
  addNewPlaceFromUser(evt);
});

buttonAddPhoto.addEventListener("click", () => {
  formValidators[formAdd.name].resetValidation();
  formValidators[formAdd.name].disableButton();
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
  let formAdd = popup.querySelector(".form_add-photo");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEsc);
  document.removeEventListener("click", handleOverlay);
  let form = popup.querySelector(".form");
}

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
