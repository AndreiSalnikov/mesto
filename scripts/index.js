const editButton = document.querySelector(".profile__edit-button");
const popupForm = document.querySelector(".popup__form");
const closeButton = document.querySelector(".popup__close-button");
const popupName = document.querySelector('.popup__info_text_name');
const popupJob = document.querySelector('.popup__info_text_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const photoGrid = document.querySelector('.photo-grid');
const addButton = document.querySelector('.profile__add-button');
const popupTitle = document.querySelector('.popup__title');
const popupImg = document.querySelector('#popupShowImg');
const popupEditProfile = document.querySelector('#popupEditProfile');
const popupSaveButton = document.querySelector('.popup__save-button');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function preAddCards() {
  for (let i = 0;i<initialCards.length;i++)
  {
    const photoContainer = document.createElement('article');
  photoContainer.classList.add('item');
  photoGrid.append(photoContainer);

  const deleteImg =  document.createElement('button');
  deleteImg.id = 'trash'
  deleteImg.classList.add('item__delete-img');
  photoContainer.append(deleteImg);

  const imgCard = document.createElement('img');/*massive links*/
  imgCard.classList.add('item__img');
  imgCard.id = 'photoGridImg';
  imgCard.setAttribute('src', initialCards[i].link);
  photoContainer.append(imgCard);

  const itemGroup = document.createElement('div');
  itemGroup.classList.add('item__group-icon');
  photoContainer.append(itemGroup);

  const itemText = document.createElement('h2');
  itemText.classList.add('item__text');
  itemText.textContent = initialCards[i].name;
  itemGroup.append(itemText);

  const buttonLike = document.createElement('button');
  buttonLike.id = 'like';
  buttonLike.classList.add('item__icon');
  itemGroup.append(buttonLike);
  }
}

preAddCards();

function popupEditOpen() {
  popupSaveButton.textContent = 'Сохранить';
  popupTitle.textContent = 'Редактировать профиль';
  popupEditProfile.classList.add('popup_opened');
  popupName.value = profileTitle.textContent;
  popupJob.value = profileSubtitle.textContent;
}

function popupAddOpen() {
 /* popupEditProfile.classList.add('popup_opened');

  const popupContainer = document.createElement('div');
  popupContainer.classList.add('popup__container');
  popupEditProfile.append(popupContainer);

  const popupCloseButton = document.createElement('button');
  popupCloseButton.classList.add('popup__close-button');
  popupContainer.append(popupCloseButton);

  const popupTitle = document.createElement('h3');
  popupTitle.classList.add('popup__title');
  popupTitle.textContent = 'Новое место';
  popupContainer.append(popupTitle);

  const popupForm = document.createElement("form");
  popupForm.classList.add('popup__form');
  popupForm.name = 'edit-form';
  popupContainer.append(popupForm);

  const popupInfoName = document.createElement('input');
  popupInfoName.classList.add('popup__info','popup__info_text_name');
  popupInfoName.placeholder = 'Название';
  popupInfoName.name = 'nameInput';
  popupInfoName.type = 'text';
  popupForm.append(popupInfoName);

  const popupInfoJob = document.createElement('input');
  popupInfoJob.classList.add('popup__info','popup__info_text_job');
  popupInfoJob.placeholder = 'Ссылка на картинку';
  popupInfoJob.name = 'jobInput';
  popupInfoJob.type = 'text';
  popupForm.append(popupInfoJob);

  const popupSaveButton = document.createElement('button');
  popupSaveButton.classList.add('popup__save-button');
  popupSaveButton.type = 'submit';
  popupSaveButton.textContent = 'Создать';
  popupForm.append(popupSaveButton);

  popupForm.addEventListener('submit',function (event) {
    event.preventDefault();
  const photoContainer = document.createElement('article');
  photoContainer.classList.add('item');
  photoGrid.prepend(photoContainer);

  const deleteImg =  document.createElement('button');
  deleteImg.id = 'trash'
  deleteImg.classList.add('item__delete-img');
  photoContainer.append(deleteImg);

  const imgCard = document.createElement('img');
  imgCard.id = 'photoGridImg';
  imgCard.classList.add('item__img');
  imgCard.setAttribute('src', popupJob.value);
  photoContainer.append(imgCard);

  const itemGroup = document.createElement('div');
  itemGroup.classList.add('item__group-icon');
  photoContainer.append(itemGroup);

  const itemText = document.createElement('h2');
  itemText.classList.add('item__text');
  itemText.textContent = popupName.value;
  itemGroup.append(itemText);

  const buttonLike = document.createElement('button');
  buttonLike.id = 'like';
  buttonLike.classList.add('item__icon');
  itemGroup.append(buttonLike);

  popupElement.classList.remove('popup_opened');
  popupContainer.remove();
  });


  popupCloseButton.addEventListener('click', function (){
    popupElement.classList.remove('popup_opened');
    popupContainer.remove();
  })*/
  popupEditProfile.classList.add('popup_opened');
  popupTitle.textContent = 'Новое место';
  popupName.value = '';
  popupJob.value = '';
  popupName.placeholder = 'Название';
  popupJob.placeholder = 'Ссылка на картинку';
  popupSaveButton.textContent = 'Добавить';
}

function popupAddImg() {
  // event.preventDefault();
  const photoContainer = document.createElement('article');
  photoContainer.classList.add('item');
  photoGrid.prepend(photoContainer);

  const deleteImg =  document.createElement('button');
  deleteImg.id = 'trash'
  deleteImg.classList.add('item__delete-img');
  photoContainer.append(deleteImg);

  const imgCard = document.createElement('img');
  imgCard.id = 'photoGridImg';
  imgCard.classList.add('item__img');
  imgCard.setAttribute('src', popupJob.value);
  photoContainer.append(imgCard);

  const itemGroup = document.createElement('div');
  itemGroup.classList.add('item__group-icon');
  photoContainer.append(itemGroup);

  const itemText = document.createElement('h2');
  itemText.classList.add('item__text');
  itemText.textContent = popupName.value;
  itemGroup.append(itemText);

  const buttonLike = document.createElement('button');
  buttonLike.id = 'like';
  buttonLike.classList.add('item__icon');
  itemGroup.append(buttonLike);
  popupClose();
}

function popupSave() {
  profileTitle.textContent = popupName.value;
  profileSubtitle.textContent = popupJob.value;
  popupClose();
}

function popupCloseProfile(evt) {
  if(evt.target.id === 'close-button')
  popupEditProfile.classList.remove('popup_opened');
}

function popupClose() {
  popupEditProfile.classList.remove('popup_opened');
  popupImg.classList.remove('popup_opened');
}

function like(evt){
  if (evt.target.id === 'like')
    evt.target.classList.toggle('item__icon_active');
}

function deleteImg(evt) {
  if(evt.target.id === 'trash')
    evt.target.closest('.item').remove();
}

function editOrAdd (evt) {
  evt.preventDefault();
  if(popupTitle.textContent === 'Редактировать профиль')
  popupSave();
  else popupAddImg();
}

function popupImgOpen (evt) {
/*  if (evt.target.id === 'photoGridImg')
  { const elem = evt.target.closest('article');
    const src = evt.target.src;
    const figure =  document.createElement('figure');
    const buttonCloseImg = document.createElement('button');
    buttonCloseImg.classList.add('popup__close-button');
    const imgPopup = document.createElement('img');
    imgPopup.classList.add('photoGridImg11');
    imgPopup.setAttribute('src', src);
    const figcaption = document.createElement('figcaption');
    const txt = elem.querySelector('h2').textContent;
    figcaption.textContent =  txt;
    popupImg.append(buttonCloseImg);
    popupImg.append(figure);
    figure.append(imgPopup);
    figure.append(figcaption);
    popupImg.classList.add('popup_opened');
  }*/
  if (evt.target.id === 'photoGridImg') {
    const elem = evt.target.closest('article');
    const src = evt.target.src;
    const imgPopup = document.querySelector('.popup__img');
    imgPopup.setAttribute('src', src);
    const figcaption = document.querySelector('figcaption');
    const txt = elem.querySelector('h2').textContent;
    imgPopup.setAttribute('alt',txt);
    figcaption.textContent =  txt;
    popupImg.classList.add('popup_opened');
  }
}

  popupEditProfile.addEventListener('click', popupCloseProfile);
  editButton.addEventListener('click', popupEditOpen);
  closeButton.addEventListener('click', popupClose);
  addButton.addEventListener('click', popupAddOpen);
  photoGrid.addEventListener('click', deleteImg);
  photoGrid.addEventListener('click', like);
  popupForm.addEventListener('submit',editOrAdd);
  photoGrid.addEventListener('click', popupImgOpen);

  const popups = document.querySelectorAll(".popup");
  popups.forEach((popup) =>
  popup.style.transition = "visibility 0.3s linear, opacity 0.3s linear");
