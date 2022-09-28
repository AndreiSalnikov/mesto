import Card from '../scripts/Card.js';
import FormValidator from "./FormValidator.js";
import {initialCards} from "./constants.js";

const settingValidation =
  {
  inputSelector: '.popup__info',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error_visible'
  }
const editButton = document.querySelector(".profile__edit-button");
const popupAddForm = document.querySelector("#popupAddForm");
const popupForm = document.querySelector("#popupEditForm");
const popupTitleImg = document.querySelector(".popup__info_text_title");
const popupLinkImg = document.querySelector(".popup__info_text_link");
const popupName = document.querySelector(".popup__info_text_name");
const popupJob = document.querySelector(".popup__info_text_job");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const photoGrid = document.querySelector(".photo-grid");
const addButton = document.querySelector(".profile__add-button");
const popupEditProfile = document.querySelector("#popupEditProfile");
const popupEditAdd = document.querySelector("#popupAddCard");
const submitAddButton = document.querySelector("#submitAddButton");

const settingProfileInfo = () => {
  popupName.value = profileTitle.textContent;
  popupJob.value = profileSubtitle.textContent;
}

function onValidation() {
  const validateEditForm = new FormValidator(settingValidation, '#popupEditForm');
  validateEditForm.enableValidation();
  const validateAddForm = new FormValidator(settingValidation, '#popupAddForm');
  validateAddForm.enableValidation();

}
settingProfileInfo();

onValidation();


function createCard(src, title) {
  const newCard = new Card({src,title},'#photoGrid')
  return newCard.generateCard();
}

initialCards.forEach(renderCard);

function renderCard(card) {
   photoGrid.prepend(createCard(card.link, card.name));
}

function saveProfInf(name, job) {
  profileTitle.textContent = name.value;
  profileSubtitle.textContent = job.value;
  closePopup(popupEditProfile);
}

const offButton = (button) => {
  button.classList.add('popup__save-button_disabled');
  button.disabled = true;
}

function addPopupImg(name, link) {
  renderCard({
    link: name.value, name: link.value,
  });
  offButton(submitAddButton);
  closePopup(popupEditAdd);
  popupAddForm.reset();
}

const closePopupOverlay = (event) => {
  if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
    closePopup(event.currentTarget);
  }
}

const closePopupEsc = (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

const openProfilePopup = (modalWindow) => {
  popupName.value = profileTitle.textContent;
  popupJob.value = profileSubtitle.textContent;
  openPopup(modalWindow);
}

 const openAddPopup = (modalWindow) => {
  popupAddForm.reset();
  openPopup(modalWindow);
}

export function openPopup(modalWindow) {
  modalWindow.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
  modalWindow.addEventListener("mousedown", closePopupOverlay);
}

function closePopup(modalWindow) {
  modalWindow.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
  modalWindow.removeEventListener("mousedown", closePopupOverlay);
}

editButton.addEventListener("click", () => openProfilePopup(popupEditProfile));
addButton.addEventListener("click", () => openAddPopup(popupEditAdd));
popupForm.addEventListener("submit", () => saveProfInf(popupName, popupJob));
popupAddForm.addEventListener("submit", () => addPopupImg(popupLinkImg, popupTitleImg));