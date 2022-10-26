import './index.css';
import Card from '../components/Card.js';
import {FormValidator} from "../components/FormValidator.js";
import {
  settingValidation, settingUserApi, buttonEdit, buttonAdd, buttonEditAvatar, userPath, cardsPath, formValidators
} from "../utils/utils.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";

const api = new Api(settingUserApi);

const userInformation = new UserInfo({
  userName: ".profile__title", userAbout: ".profile__subtitle", avatar: ".profile__avatar-image"
});

const defaultCardList = new Section({
  renderer: (item, userID) => {
    item.userId = userID;
    defaultCardList.addItem(createCard(item));
  }
}, ".photo-grid");


Promise.all([api.getServerInfo(userPath), api.getServerInfo(cardsPath)])
  .then(([userData, cards]) => {
    userInformation.setUserInfo({name: userData.name, about: userData.about})
    userInformation.setAvatar({avatar: userData.avatar});
    defaultCardList.renderItems(cards, userData._id);
  }).catch((err) => console.log(err))

const popupImage = new PopupWithImage("#popupShowImg");

const popupWithConfirm = new PopupWithConfirmation("#popupDelete", {
  handleCardDelete: (id, element) => api.deleteServerCard(id, cardsPath).then(() => {
    element.remove();
  }).catch((err) => console.log(err))
});

const popupWithEditForm = new PopupWithForm("#popupEditProfile", {
  handleSubmitForm: (inputs) => api.editServerProfileInfo({
    name: inputs.name, about: inputs.about
  }, userPath).then(() => userInformation.setUserInfo({
    name: inputs.name, about: inputs.about
  })).catch((err) => console.log(err))
});

const popupWithEditAvatarForm = new PopupWithForm("#popupEditAvatar", {
  handleSubmitForm: (inputs) => api.setServerAvatar({avatar: inputs.link}, userPath).then(() => {
    userInformation.setAvatar({avatar: inputs.link})
  }).catch((err) => console.log(err))
});

const popupWithAddForm = new PopupWithForm("#popupAddCard", {
  handleSubmitForm: (inputs) => api.addServerCard(inputs, cardsPath).then((data) => {
    data.userId = data.owner._id;
    defaultCardList.addItem(createCard(data), true);
  }).catch((err) => console.log(err))
})

popupWithConfirm.setEventListeners();
popupImage.setEventListeners();
popupWithEditForm.setEventListeners();
popupWithAddForm.setEventListeners();
popupWithEditAvatarForm.setEventListeners();

function handleLikeClick(card) {
  if (!card.isLiked) {
    api.setServerLike(card._idCard)
      .then((res) => {
        card.setLike(res)
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api.removeServerLike(card._idCard)
      .then((res) => {
        card.removeLike(res)
      })
      .catch((err) => {
        console.log(err);
      });
  }

}

function createCard(item) {
  const newCard = new Card(item, '#photoGrid', handleCardClick, handleDeleteButtonClick, handleLikeClick);
  return newCard.generateCard();
}

function handleCardClick(link, name) {
  popupImage.open(link, name);
}

function handleDeleteButtonClick(id, element) {
  popupWithConfirm.open(id, element);
}

const openProfilePopup = () => {
  popupWithEditForm.setInputValues(userInformation.getUserInfo());
  formValidators['editProfileForm'].resetValidation();
  popupWithEditForm.open();
}

const openAddPopup = () => {
  formValidators['editAddForm'].resetValidation();
  popupWithAddForm.open();
}

const openEditAvatarPopup = () => {
  formValidators['editAvatarForm'].resetValidation();
  popupWithEditAvatarForm.open();
}

buttonEdit.addEventListener("click", openProfilePopup);
buttonAdd.addEventListener("click", openAddPopup);
buttonEditAvatar.addEventListener("click", openEditAvatarPopup);

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settingValidation);
