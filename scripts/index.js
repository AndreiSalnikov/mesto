import Card from '../scripts/Card.js';
import {FormValidator} from "./FormValidator.js";
import {initialCards, settingValidation} from "./constants.js";

const photoGrid = document.querySelector(".photo-grid");
const popupAddForm = document.querySelector("#popupAddForm");
const popupForm = document.querySelector("#popupEditForm");
const popupTitleImg = document.querySelector(".popup__info_text_title");
const popupLinkImg = document.querySelector(".popup__info_text_link");
const popupName = document.querySelector(".popup__info_text_name");
const popupJob = document.querySelector(".popup__info_text_job");
const popupEditProfile = document.querySelector("#popupEditProfile");
const popupEditAdd = document.querySelector("#popupAddCard");
const popupsAll = document.querySelectorAll(".popup");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonSubmitAdd = document.querySelector("#submitAddButton");
const FormValidateEdit = new FormValidator(settingValidation, '#popupEditForm');
const FormValidateAdd = new FormValidator(settingValidation, '#popupAddForm');

const settingProfileInfo = () => {
  popupName.value = profileTitle.textContent;
  popupJob.value = profileSubtitle.textContent;
}

function createCard(cardData) {
  const newCard = new Card(cardData,'#photoGrid')
  return newCard.generateCard();
}

for (let i = 0;i < initialCards.length;i++) {
  renderCard(initialCards[i],photoGrid)
}

function renderCard(card,template) {
   template.prepend(createCard(card));
}

function saveProfileInformation(name, job) {
  profileTitle.textContent = name.value;
  profileSubtitle.textContent = job.value;
  closePopup(popupEditProfile);
}

function addPopupImg(link, name) {
  renderCard({
    link: link.value, name: name.value,
  },photoGrid);
  FormValidateAdd.disableSubmitButton(buttonSubmitAdd);
  closePopup(popupEditAdd);
  popupAddForm.reset();
}

const closePopupOverlay = (event) => {
  if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
    closePopup(event.currentTarget);
  }
}

popupsAll.forEach((el) => {
  el.addEventListener("mousedown", closePopupOverlay);
})

const closePopupEsc = (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

const openProfilePopup = () => {
  settingProfileInfo();
  openPopup(popupEditProfile);
}

 const openAddPopup = () => {
  popupAddForm.reset();
  openPopup(popupEditAdd);
}

export function openPopup(modalWindow) {
  modalWindow.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}

function closePopup(modalWindow) {
  modalWindow.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}

buttonEdit.addEventListener("click", () => openProfilePopup(popupEditProfile));
buttonAdd.addEventListener("click", () => openAddPopup(popupEditAdd));
popupForm.addEventListener("submit", () => saveProfileInformation(popupName, popupJob));
popupAddForm.addEventListener("submit", () => addPopupImg(popupLinkImg, popupTitleImg));

//В прошлом спринте было сказано, что при открытии попаппа с редакитированием профиля, если он заполнен,
// то кнопка должна быть активной и работать.По умолчанию он заполняется только при открытии профиля,
// а валидация и сама проверка на заполненность полей начинает работать ещё до его открытия
// и поэтому при первом открытии кнопка не активна, хотя данные в полях есть,
// но если это ошибка, то в следущей итерации я уберу отсюда эту функцию
settingProfileInfo();

FormValidateEdit.enableValidation();
FormValidateAdd.enableValidation();