const popupEdit = document.querySelector(".popup-form_edit-profile");
const formEdit = popupEdit.querySelector(".popup__container_edit-profile");
const buttonAddPhoto = document.querySelector(".profile__button_type_add");
const buttonEditProfile = document.querySelector(".profile__button_type_edit");

// POPUP BUTTON CLOSE
const popupCloseButtonAddPhoto = document.querySelector(
  ".popup__close-button_place_form-photo"
);
const popupCloseButtonEditProfile = document.querySelector(
  ".popup__close-button_place_profile"
);
const popupCloseButtonFullscreen = document.querySelector(
  ".popup__close-button_place_fullscreen"
);

const nameInput = popupEdit.querySelector(".popup__item_type_name");
const jobInput = popupEdit.querySelector(".popup__item_type_job");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");

const popupAdd = document.querySelector(".popup-form_add-photo");
const formAdd = popupAdd.querySelector(".popup__container_form_add-photo");

const titleInput = popupAdd.querySelector(".popup__item_type_title");
const linkInput = popupAdd.querySelector(".popup__item_type_pic-link");

const elementsContainer = document.querySelector(".elements");
const elementTemplate = document.querySelector("#element-template").content;

// FULLSCREEN POPUP
const popupFullscreen = document.querySelector(".popup-fullscreen");
const fullscreenImage = document.querySelector(".popup-fullscreen__image");
const fullscreenCaption = document.querySelector(".popup-fullscreen__caption");

function handleSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileTitle.textContent = jobInput.value;
  closePopup(popupEdit);
}

// dynamic defolt PLACE CREATE
function renderCard(newCard) {
  elementsContainer.prepend(newCard);
}

function addNewPlaceDefolt(titleValue = "", linkValue = "") {
  placeElement = hendelFormCard(
    titleValue,
    linkValue
  );
  renderCard(placeElement);
}
function showPlaces(initialCards) {
  initialCards.forEach((element) => {
    addNewPlaceDefolt(element.name, element.link);
  });
}

//   PLACE CREATE FROM USER
function addNewPlaceFromUser(evt) {
  evt.preventDefault();
  const titleInputValue = titleInput.value;
  const linkInputValue = linkInput.value;
  if (titleInputValue && linkInputValue) {
    placeElement = hendelFormCard(
      titleInputValue,
      linkInputValue
    );
    renderCard(placeElement);
  }
  closePopup(popupAdd);
  titleInput.value = '';
  linkInput.value = '';
}

function hendelFormCard(
  titleValue,
  linkValue
) {
  const placeElement = elementTemplate
    .querySelector(".elements__element")
    .cloneNode(true);
  const elementImage = placeElement.querySelector(".elements__image");
  placeElement.querySelector(".elements__caption").textContent = titleValue;
  elementImage.src = linkValue;
  elementImage.alt = titleValue;
  placeElement
    .querySelector(".elements__button_like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("elements__button_like_active");
    });
  elementImage.addEventListener("click", function (event) {
    fullscreenImage.src = linkValue;
    fullscreenCaption.textContent = titleValue;
    fullscreenImage.alt = titleValue;
    openPopup(popupFullscreen);
  });
  const buttonTrash = placeElement.querySelector(".elements__button_trash");
  buttonTrash.addEventListener("click", function (evt) {
    const element = evt.target.closest(".elements__element");
    element.remove();
  });
  return placeElement;
}

showPlaces(initialCards);

formEdit.addEventListener("submit", handleSubmitProfile);
buttonEditProfile.addEventListener("click", () => {
  openPopup(popupEdit);
});

popupCloseButtonEditProfile.addEventListener("click", () => {
  closePopup(popupEdit);
});

formAdd.addEventListener("submit", addNewPlaceFromUser);

buttonAddPhoto.addEventListener("click", () => {
  openPopup(popupAdd);
});
popupCloseButtonAddPhoto.addEventListener("click", () => {
  closePopup(popupAdd);
});

popupCloseButtonFullscreen.addEventListener("click", () => {
  closePopup(popupFullscreen);
});

function openPopup(popup) {
  popup.classList.add("popup_opened");
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
