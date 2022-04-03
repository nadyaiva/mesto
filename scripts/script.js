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
  placeElement = handleFormCard(
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
    placeElement = handleFormCard(
      titleInputValue,
      linkInputValue
    );
    renderCard(placeElement);
  }
  closePopup(popupAdd);
  titleInput.value = '';
  linkInput.value = '';
}

function handleFormCard(
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

formAdd.addEventListener("submit", addNewPlaceFromUser);

buttonAddPhoto.addEventListener("click", () => {
  openPopup(popupAdd);
});

const handlePopup = (evt) => {
  const escape = 27
  if (evt.which === escape || evt.target.classList.contains('popup__close-button')) {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  };
};

const handleOverlay = (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  };
};

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', handlePopup);
  document.addEventListener('click', handlePopup);
  document.addEventListener('click', handleOverlay);
};

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', handlePopup);
  document.removeEventListener('click', handlePopup);
  document.removeEventListener('click', handleOverlay);
};