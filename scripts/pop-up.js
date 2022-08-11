let editButton = document.querySelector("button.profile__edit-button");
let saveButton =  document.querySelector("button.popup__save-button");
let closeButton = document.querySelector("button.popup__close-button");
let popupElement = document.querySelector('.popup');
let popupName = document.querySelector('input.popupName');
let popupJob = document.querySelector('input.popupJob');
let profileTitle = document.querySelector('h1.profile__title');
let profileSubtitle = document.querySelector('p.profile__subtitle');

function popupOpen() { 
  event.preventDefault();
  popupElement.classList.add('popup_opened');
  popupName.value = profileTitle.textContent;
  popupJob.value = profileSubtitle.textContent;
};

function popupSave() {
  event.preventDefault();
  profileTitle.textContent = document.querySelector('input.popupName').value;
  profileSubtitle.textContent = document.querySelector('input.popupJob').value;
  popupElement.classList.remove('popup_opened');
}

function popupClose() {
  event.preventDefault();
  popupElement.classList.remove('popup_opened');
};

function popupSaveEnter (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    profileTitle.textContent = document.querySelector('input.popupName').value;
    profileSubtitle.textContent = document.querySelector('input.popupJob').value;
    popupElement.classList.remove('popup_opened');
  }
};

editButton.addEventListener('click', popupOpen);
saveButton.addEventListener('click', popupSave);
popupElement.addEventListener('keypress', popupSaveEnter);
closeButton.addEventListener('click', popupClose);