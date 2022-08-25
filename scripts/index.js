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

function createCard(src, title) {
  const templateImg = template.content.querySelector(".item__img");
  const templateText = template.content.querySelector(".item__text");
  templateImg.src = src;
  templateImg.alt = title;
  templateText.textContent = title;
  const clone = template.content.cloneNode(true);
  eventListeners(clone);
  return clone;
}

initialCards.forEach(renderCard);

function renderCard(card) {
  photoGrid.prepend(createCard(card.link, card.name));
}

function saveProfInf(name, job, event) {
  event.preventDefault();
  profileTitle.textContent = name.value;
  profileSubtitle.textContent = job.value;
  popupClose(popupEditProfile);
}

function popupAddImg(name, link, event) {
  event.preventDefault();
  renderCard({
    link: name.value,
    name: link.value,
  });
  popupClose(popupEditAdd);
  popupAddForm.reset();
}

function eventListeners(clone) {
  clone.querySelector(".item__icon").addEventListener("click", (e) => {
    e.target.classList.toggle("item__icon_active");
  });
  clone.querySelector(".item__delete-img").addEventListener("click", (e) => {
    e.target.closest(".item").remove();
  });
  clone.querySelector(".item__img").addEventListener("click", (e) => {
    const elem = e.target.closest("article");
    const src = e.target.src;
    const figcaption = document.querySelector("figcaption");
    const txt = elem.querySelector("h2").textContent;
    const imgPopup = document.querySelector(".popup__img");
    imgPopup.setAttribute("src", src);
    imgPopup.setAttribute("alt", txt);
    figcaption.textContent = txt;
    popupOpen(popupImg);
  });
}

function popupOpen(modalWindow) {
  if (modalWindow === popupEditProfile) {
    popupName.value = profileTitle.textContent;
    popupJob.value = profileSubtitle.textContent;
  }
  modalWindow.classList.add("popup_opened");
}

function popupClose(modalWindow) {
  modalWindow.classList.remove("popup_opened");
}

editButton.addEventListener("click", () => popupOpen(popupEditProfile));
addButton.addEventListener("click", () => popupOpen(popupEditAdd));
closeButtonProfile.addEventListener("click", () =>
  popupClose(popupEditProfile)
);
closeButtonPopup.addEventListener("click", () => popupClose(popupImg));
closeButtonAddImg.addEventListener("click", () => popupClose(popupEditAdd));
popupForm.addEventListener("submit", () =>
  saveProfInf(popupName, popupJob, event)
);
popupAddForm.addEventListener("submit", () =>
  popupAddImg(popupLinkImg, popupTitleImg, event)
);
