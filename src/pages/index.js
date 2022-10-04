import './index.css';
import Card from '../components/Card.js';
import {FormValidator} from "../components/FormValidator.js";
import {initialCards, settingValidation} from "../components/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";


const popupImg = document.querySelector("#popupShowImg");
const popupName = document.querySelector(".popup__info_text_name");
const popupJob = document.querySelector(".popup__info_text_job");
const popupEditProfile = document.querySelector("#popupEditProfile");
const popupEditAdd = document.querySelector("#popupAddCard");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonSubmitAdd = document.querySelector("#submitAddButton");

const ValidatorEditForm = new FormValidator(settingValidation, '#popupEditForm');
const ValidatorAddForm = new FormValidator(settingValidation, '#popupAddForm');
const userInformation = new UserInfo({userName: profileTitle, userAbout: profileSubtitle});
const popupImage = new PopupWithImage(popupImg);

const popupWithEditForm = new PopupWithForm(popupEditProfile, {
  handleSubmitForm: (inputs) => {
    userInformation.setUserInfo({name: inputs[0].nameInput, about: inputs[0].jobInput});
    popupWithEditForm.close();
  }
});

const popupWithAddForm = new PopupWithForm(popupEditAdd, {
  handleSubmitForm: (inputs) => {
    const newCardRender = new Section({
      items: inputs, renderer: (item) => {
        const newCard = new Card(item, '#photoGrid', handleCardClick);
        const cardElement = newCard.generateCard();
        newCardRender.addItem(cardElement);
      }
    }, ".photo-grid");
    newCardRender.renderItems();
    ValidatorAddForm.disableSubmitButton(buttonSubmitAdd);
    popupWithAddForm.close(popupEditAdd);
  }
});

const defaultCardList = new Section({
  items: initialCards, renderer: (item) => {
    const newCard = new Card(item, '#photoGrid', handleCardClick);
    const cardElement = newCard.generateCard();
    defaultCardList.addItem(cardElement);
  }
}, ".photo-grid");

const settingProfileInfo = () => {
  popupName.value = userInformation.getUserInfo().name;
  popupJob.value = userInformation.getUserInfo().about;
}

function handleCardClick(link, name) {
  popupImage.open(link, name);
}

const openProfilePopup = () => {
  settingProfileInfo();
  popupWithEditForm.open();
}

const openAddPopup = () => {
  popupWithAddForm.open();
}

buttonEdit.addEventListener("click", () => openProfilePopup());
buttonAdd.addEventListener("click", () => openAddPopup());

settingProfileInfo();

popupImage.setEventListeners();
popupWithEditForm.setEventListeners();
popupWithAddForm.setEventListeners();
defaultCardList.renderItems();
ValidatorEditForm.enableValidation();
ValidatorAddForm.enableValidation();