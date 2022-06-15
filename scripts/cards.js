export const initialCards = [
    {
      cardname: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      cardname: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      cardname: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      cardname: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      cardname: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      cardname: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];

  const popupConfirm = new PopupWithConfirm('.popup_type_confirm');

  const renderCards = new Section({
  renderer: (item) => {
    const card = new Card(item, selectorsCard, userId, {
      changeLikePosition: (item) => {
        api.changeLikePosition(item._id, !card.isLiked())
        .then(data => card.turnLikeButton(data))
        .catch(err => console.log(err))
      },
      handleCardClick: () => {
        const imagePreview = new PopupWithImage('.popup_type_preview');
        imagePreview.open(item);
        imagePreview.setEventListeners();
      },
      handleDeleteClick: (item) => {
        console.log(item._card._id)
        popupConfirm.visualizeLoading('Да');
        popupConfirm.setSubmitHanlder(() => {
          api.deleteImage(item._card._id)
            .then((res) => {
              popupConfirm.close();
              item.deleteImage();
            })
            .catch((res) => {
              console.log(res);
            })
            .finally(popupConfirm.visualizeLoading('Удаление...'));
        });
        popupConfirm.open();
      }
    });
    const cardElement = card.generateCard();
    return cardElement;
  }},
  cardContainer
);
