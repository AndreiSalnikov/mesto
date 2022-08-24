const editButton = document.querySelector(".profile__edit-button");
const popupAddForm = document.querySelector("#popupAddForm");
const popupForm = document.querySelector("#popupEditForm");
const closeButtons = document.querySelectorAll('.popup__close-button');
const popupTitleImg = document.querySelector('.popup__info_text_title');
const popupLinkImg = document.querySelector('.popup__info_text_link');
const popupName = document.querySelector('.popup__info_text_name');
const popupJob = document.querySelector('.popup__info_text_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const photoGrid = document.querySelector('.photo-grid');
const addButton = document.querySelector('.profile__add-button');
const popupImg = document.querySelector('#popupShowImg');
const popupEditProfile = document.querySelector('#popupEditProfile');
const popupEditAdd = document.querySelector('#popupAddCard');
const template = document.querySelector('#photoGrid');

function createCard(src, title) {
    const img = template.content.querySelector('.item__img');
    const h2 = template.content.querySelector('.item__text');
    img.src = src;
    img.alt = title;
    h2.textContent = title;
    const clone = template.content.cloneNode(true);
    eventListeners(clone);
    return clone;
}

initialCards.forEach(renderCard);

function renderCard(card) {
    photoGrid.prepend(createCard(card.link, card.name));
}
function saveProfInf (name,job,event) {
  event.preventDefault();
  profileTitle.textContent = name.value;
  profileSubtitle.textContent = job.value;
  popupClose(popupEditProfile);
}

function popupAddImg(name,link,event) {
  event.preventDefault();
  renderCard({
        link: name.value,
        name: link.value
    });
  popupClose(popupEditAdd);
  popupTitleImg.value = '';
  popupLinkImg.value = '';
}

function eventListeners(clone) {
      clone
          .querySelector('.item__icon')
          .addEventListener('click',(e)=>{
            e.target.classList.toggle('item__icon_active');
          });
      clone
          .querySelector('.item__delete-img')
          .addEventListener('click',(e)=>{
            e.target.closest('.item').remove();
          });
      clone
          .querySelector('.item__img')
          .addEventListener('click',(e)=>{
          const elem = e.target.closest('article');
          const src = e.target.src;
          const imgPopup = document.querySelector('.popup__img');
          imgPopup.setAttribute('src', src);
          const figcaption = document.querySelector('figcaption');
          const txt = elem.querySelector('h2').textContent;
          imgPopup.setAttribute('alt',txt);
          figcaption.textContent =  txt;
          popupOpen(popupImg);
          });
}

function popupOpen(modalWindow) {
  if (modalWindow === popupEditProfile){
    popupName.value = profileTitle.textContent;
    popupJob.value= profileSubtitle.textContent;
  }
  modalWindow.classList.add('popup_opened');
}

function popupClose(modalWindow) {
  if(modalWindow.classList === undefined)
  { popupImg.classList.remove('popup_opened');
    popupEditProfile.classList.remove('popup_opened');
    popupEditAdd.classList.remove('popup_opened');
  }
  else
    modalWindow.classList.remove('popup_opened');
}

    closeButtons.forEach(question => {
    question.addEventListener('click',popupClose)
});

  editButton.addEventListener('click', () => popupOpen(popupEditProfile));
  addButton.addEventListener('click', () => popupOpen(popupEditAdd));
  popupForm.addEventListener('submit',() => saveProfInf(popupName,popupJob,event));
  popupAddForm.addEventListener('submit', () => popupAddImg(popupLinkImg,popupTitleImg,event));


