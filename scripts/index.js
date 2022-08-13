let editButton = document.querySelector(".profile__edit-button");
let popupForm = document.querySelector(".popup__form");
let closeButton = document.querySelector(".popup__close-button");
let popupElement = document.querySelector('.popup');
let popupName = document.querySelector('.popup__info_text_name');
let popupJob = document.querySelector('.popup__info_text_job');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function popupOpen() {
  popupElement.classList.add('popup_opened');
  popupName.value = profileTitle.textContent;
  popupJob.value = profileSubtitle.textContent;
};

function popupSave() {
  event.preventDefault();
  profileTitle.textContent = popupName.value;
  profileSubtitle.textContent = popupJob.value;
  popupClose();
}

function popupClose() {
  popupElement.classList.remove('popup_opened');
};

editButton.addEventListener('click', popupOpen);
popupForm.addEventListener('submit', popupSave);
closeButton.addEventListener('click', popupClose);