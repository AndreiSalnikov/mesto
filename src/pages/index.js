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
    cardsPath
} from "../components/constants.js";
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

Promise.all([api.getServerInfo(userPath), api.getServerInfo(cardsPath)])
    .then(([userData, cards]) => {
        userInformation.setUserInfo({name: userData.name, about: userData.about})
        userInformation.setAvatar({avatar: userData.avatar});
        const defaultCardList = new Section({
            items: cards, renderer: (item) => {
                item.likes.forEach((people) => {
                        if (people._id === userData._id) {
                            item.isLiked = true;
                        }
                    }
                )

                item.userId = userData._id;
                defaultCardList.addItem(createCard(item));
            }
        }, ".photo-grid");
        defaultCardList.renderItems();
    })

const popupImage = new PopupWithImage("#popupShowImg");

const popupWithConfirm = new PopupWithConfirmation("#popupDelete", {
    handleCardDelete: (id, element, button) => {
        api.deleteServerCard(id, cardsPath, button).then(() => {
            element.remove();
            popupWithConfirm.close()
        })
    }
});


const popupWithEditForm = new PopupWithForm("#popupEditProfile", {
    handleSubmitForm: (inputs, button) => {
        api.editServerProfileInfo({name: inputs[0].name, about: inputs[0].about}, userPath, button).then(() => {
            userInformation.setUserInfo({name: inputs[0].name, about: inputs[0].about})
        })
        popupWithEditForm.close();
    }
});

const popupWithEditAvatarForm = new PopupWithForm("#popupEditAvatar", {
    handleSubmitForm: (inputs, button) => {
        api.setServerAvatar({avatar: inputs[0].link}, userPath, button).then(() => {
                userInformation.setAvatar({avatar: inputs[0].link})
                popupWithEditAvatarForm.close();
            }
        );
    }
});

const popupWithAddForm = new PopupWithForm("#popupAddCard", {
    handleSubmitForm: (inputs, button) => {
        const newCard = new Section({
            items: inputs, renderer: () => {
            }
        }, ".photo-grid");
        api.addServerCard(inputs[0], cardsPath, button);
        api.getServerInfo(cardsPath).then((res) => {
            inputs[0]._id = res[0]._id;
            inputs[0].likes = res[0].likes;
            inputs[0].owner = {
                _id: res[0].owner._id
            };
            inputs[0].userId = res[0].owner._id;
            newCard.addItem(createCard(inputs[0]), true);
            ValidatorAddForm.disableSubmitButton(buttonSubmitAdd);
            popupWithAddForm.close("#popupAddCard");
        })

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

function handleLikeClick(button, cardId, counter, likes) {
    button.classList.toggle("item__icon_active");
    if (button.classList.contains('item__icon_active')) {
        api.setServerLike(cardId).then(counter.textContent = likes + 1);
    } else api.removeServerLike(cardId).then(() => {
        counter.textContent = likes - 1;
    });
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