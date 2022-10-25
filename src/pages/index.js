import './index.css';
import Card from '../components/Card.js';
import {FormValidator} from "../components/FormValidator.js";
import {
    settingValidation,
    settingUserApi,
    buttonEdit,
    buttonAdd,
    buttonSubmitAdd,
    buttonEditAvatar,
    userPath,
    cardsPath,
    loading
} from "../utils/utils.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";

const api = new Api(settingUserApi);


const userInformation = new UserInfo({
    userName: ".profile__title",
    userAbout: ".profile__subtitle",
    avatar: ".profile__avatar-image"
});

const defaultCardList = new Section({
    renderer: (item, userID) => {
        item.likes.forEach((people) => {
                if (people._id === userID) {
                    item.isLiked = true;
                }
            }
        )

        item.userId = userID;
        defaultCardList.addItem(createCard(item));
    }
}, ".photo-grid");


Promise.all([api.getServerInfo(userPath), api.getServerInfo(cardsPath)])
    .then(([userData, cards]) => {
        userInformation.setUserInfo({name: userData.name, about: userData.about})
        userInformation.setAvatar({avatar: userData.avatar});
        defaultCardList.renderItems(cards, userData._id);
    }).catch((err) => console.log(err))

const popupImage = new PopupWithImage("#popupShowImg");

const popupWithConfirm = new PopupWithConfirmation("#popupDelete", {
    handleCardDelete: (id, element, button) => {
        api.deleteServerCard(id, cardsPath).then(() => {
            loading(button, true);
            element.remove();
            popupWithConfirm.close()
        }).catch((err) => console.log(err)).finally(() => {
            loading(button, false)
        });
    }
});

const popupWithEditForm = new PopupWithForm("#popupEditProfile", {
    handleSubmitForm: (inputs, button) => {
        loading(button, true);
        api.editServerProfileInfo({name: inputs[0].name, about: inputs[0].about}, userPath).then(() => {
            userInformation.setUserInfo({name: inputs[0].name, about: inputs[0].about})
        }).catch((err) => console.log(err)).finally(() => {
            loading(button, false)
        });
        popupWithEditForm.close();
    }
});

const popupWithEditAvatarForm = new PopupWithForm("#popupEditAvatar", {
    handleSubmitForm: (inputs, button) => {
        loading(button, true);
        api.setServerAvatar({avatar: inputs[0].link}, userPath).then(() => {
                userInformation.setAvatar({avatar: inputs[0].link})
                popupWithEditAvatarForm.close();
            }
        ).catch((err) => console.log(err)).finally(() => {
            loading(button, false)
        });
    }
});

const popupWithAddForm = new PopupWithForm("#popupAddCard", {
    handleSubmitForm: (inputs, button) => {
        api.addServerCard(inputs[0], cardsPath).then((data) => {
            loading(button, true);
            data.userId = data.owner._id;
            defaultCardList.addItem(createCard(data), true);
            ValidatorAddForm.disableSubmitButton(buttonSubmitAdd);
            popupWithAddForm.close("#popupAddCard");
        }).catch((err) => console.log(err)).finally(() => {
            loading(button, false)
        });
    }
})

popupWithConfirm.setEventListeners();
popupImage.setEventListeners();
popupWithEditForm.setEventListeners();
popupWithAddForm.setEventListeners();
popupWithEditAvatarForm.setEventListeners();

const ValidatorEditForm = new FormValidator(settingValidation, '#popupEditForm');
const ValidatorAddForm = new FormValidator(settingValidation, '#popupAddForm');
const ValidatorEditAvatarForm = new FormValidator(settingValidation, '#popupEditAvatar');

ValidatorEditForm.enableValidation();
ValidatorAddForm.enableValidation();
ValidatorEditAvatarForm.enableValidation();

function handleLikeClick(button, cardId, counter) {
    button.classList.toggle("item__icon_active");
    if (button.classList.contains('item__icon_active')) {
        api.setServerLike(cardId).then(()=>counter.textContent = Number(counter.textContent) + 1).catch((err)=>console.log(err));
    } else api.removeServerLike(cardId).then(() =>
        counter.textContent = Number(counter.textContent) - 1
    ).catch((err)=>console.log(err));
}


function createCard(item) {
    const newCard = new Card(item, '#photoGrid', handleCardClick, handleDeleteButtonClick, handleLikeClick);
    return newCard.generateCard();
}

function handleCardClick(link, name) {
    popupImage.open(link, name);
}

function handleDeleteButtonClick(id, element) {
    popupWithConfirm.open(id, element);
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

const openEditAvatarPopup = () => {
    ValidatorEditAvatarForm.resetValidation();
    popupWithEditAvatarForm.open();
}

buttonEdit.addEventListener("click", () => openProfilePopup());
buttonAdd.addEventListener("click", () => openAddPopup());
buttonEditAvatar.addEventListener("click", () => openEditAvatarPopup());