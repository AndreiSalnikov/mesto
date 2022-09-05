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
const popupImg = document.querySelector("#popupShowImg");
const popupEditProfile = document.querySelector("#popupEditProfile");
const popupEditAdd = document.querySelector("#popupAddCard");
const template = document.querySelector("#photoGrid");
const closeButtonProfile = document.querySelector("#closeButton-EditProfile");
const closeButtonPopup = document.querySelector("#closeButton-popupImg");
const closeButtonAddImg = document.querySelector("#closeButton-AddCard");
const figcaption = document.querySelector("figcaption");
const imgPopup = document.querySelector(".popup__img");
const submitAddButton = document.querySelector("#submitAddButton");
const submitEditButton = document.querySelector("#submitEditButton");
function createCard(src, title) {
  const clone = template.content.cloneNode(true);
  const templateImg = clone.querySelector(".item__img");
  const templateText = clone.querySelector(".item__text");
  templateImg.src = src;
  templateImg.alt = title;
  templateText.textContent = title;
  eventListeners(clone, src, title);
  return clone;
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

function eventListeners(clone, src, title) {
  clone.querySelector(".item__icon").addEventListener("click", (e) => {
    e.target.classList.toggle("item__icon_active");
  });
  clone.querySelector(".item__delete-img").addEventListener("click", (e) => {
    e.target.closest(".item").remove();
  });
  clone.querySelector(".item__img").addEventListener("click", (e) => {
    imgPopup.setAttribute("src", src);
    imgPopup.setAttribute("alt", title);
    figcaption.textContent = title;
    openPopup(popupImg);
  });
}

const closePopupOverlay = (event) => {
  if (event.target.id === popupImg.id || event.target.id === popupEditProfile.id || event.target.id === popupEditAdd.id) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
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
  resetValidation(modalWindow);
  openPopup(modalWindow);
}

const openAddPopup = (modalWindow) => {
  popupAddForm.reset();
  resetValidation(modalWindow);
  openPopup(modalWindow);
}

function openPopup(modalWindow) {
  modalWindow.classList.add("popup_opened");
  document.addEventListener("keydown",  closePopupEsc);
  modalWindow.addEventListener("click", closePopupOverlay);
}

function closePopup(modalWindow) {
  modalWindow.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
  modalWindow.removeEventListener("click", closePopupOverlay);
}

const settingProfileInfo = () => {
  popupName.value = profileTitle.textContent;
  popupJob.value = profileSubtitle.textContent;
}

editButton.addEventListener("click", () => openProfilePopup(popupEditProfile));
addButton.addEventListener("click", () => openAddPopup(popupEditAdd));

closeButtonProfile.addEventListener("click", () => closePopup(popupEditProfile));
closeButtonPopup.addEventListener("click", () => closePopup(popupImg));
closeButtonAddImg.addEventListener("click", () => closePopup(popupEditAdd));

popupForm.addEventListener("submit", () => saveProfInf(popupName, popupJob));
popupAddForm.addEventListener("submit", () => addPopupImg(popupLinkImg, popupTitleImg));

settingProfileInfo();

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__info',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error_visible'
});