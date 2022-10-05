import './index.css';
import Card from '../components/Card.js';
import {FormValidator} from "../components/FormValidator.js";
import {initialCards, settingValidation} from "../components/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonSubmitAdd = document.querySelector("#submitAddButton");

const ValidatorEditForm = new FormValidator(settingValidation, '#popupEditForm');
const ValidatorAddForm = new FormValidator(settingValidation, '#popupAddForm');
const userInformation = new UserInfo({userName: ".profile__title", userAbout: ".profile__subtitle"});
const popupImage = new PopupWithImage("#popupShowImg");

const defaultCardList = new Section({
  items: initialCards, renderer: (item) => {
    defaultCardList.addItem(createCard(item));
  }
}, ".photo-grid");

const popupWithEditForm = new PopupWithForm("#popupEditProfile", {
  handleSubmitForm: (inputs) => {
    userInformation.setUserInfo({name: inputs[0].name, about: inputs[0].about});
    popupWithEditForm.close();
  }
});

const popupWithAddForm = new PopupWithForm("#popupAddCard", {
  handleSubmitForm: (inputs) => {
    defaultCardList.addItem(createCard(inputs[0]));
    ValidatorAddForm.disableSubmitButton(buttonSubmitAdd);
    popupWithAddForm.close("#popupAddCard");
  }
})

function createCard(item) {
  const newCard = new Card(item, '#photoGrid', handleCardClick);
  return newCard.generateCard();
}


function handleCardClick(link, name) {
  popupImage.open(link, name);
}

const openProfilePopup = () => {
  popupWithEditForm.setInputValues(userInformation.getUserInfo());
  ValidatorEditForm.resetValidation();
  popupWithEditForm.open();
}

const openAddPopup = () => {
  ValidatorAddForm.resetValidation();
  popupWithAddForm.open();
}

buttonEdit.addEventListener("click", () => openProfilePopup());
buttonAdd.addEventListener("click", () => openAddPopup());

popupImage.setEventListeners();
popupWithEditForm.setEventListeners();
popupWithAddForm.setEventListeners();
defaultCardList.renderItems();
ValidatorEditForm.enableValidation();
ValidatorAddForm.enableValidation();