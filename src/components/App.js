import { useState, useEffect } from "react";
import profileAvatar from "../images/profile__avatar.jpg";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CurrentCardContext } from "../contexts/CurrentCardContext";
import api from "../utils/api";

function App() {
  const [isPopupEditOpened, setIsPopupEditOpened] = useState(false);
  const [isPopupAddPlaceOpened, setIsPopupAddPlaceOpened] = useState(false);
  const [isPopupEditImageOpened, setIsPopupEditImageOpened] = useState(false);
  const [isPopupDeleteCardOpened, setIsPopupDeleteCardOpened] = useState(false);
  const [isMouseOverAvatar, setIsMouseOverAvatar] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({
    name: "Жак-Ив Кусто",
    about: "Исследователь океана",
  });
  const [cards, setCards] = useState([]);

  function showError(err) {
    console.error(err);
  }

  useEffect(() => {
    api
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser({
          name: userInfo.name,
          about: userInfo.about,
          avatar: userInfo.avatar,
          id: userInfo._id,
        });
      })
      .catch((err) => {
        showError(err);
        setCurrentUser({
          name: "Жак-Ив Кусто",
          about: "Исследователь океана",
          avatar: profileAvatar,
        });
      });
    api
      .getCards()
      .then((cardInfo) => {
        setCards(cardInfo);
      })
      .catch((err) => {
        showError(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser.id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        showError(err);
      });
  }

  function handleDeleteCard(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        showError(err);
      });
  }

  function handleEscClose(esc) {
    if (esc.key === "Escape" || esc.key === "Esc") {
      setIsPopupEditOpened(isPopupEditOpened);

      setIsPopupAddPlaceOpened(isPopupAddPlaceOpened);

      setIsPopupEditImageOpened(isPopupEditImageOpened);

      setIsPopupDeleteCardOpened(isPopupDeleteCardOpened);

      setSelectedCard({});
    }
  }

  function handleEditProfileClick() {
    setIsPopupEditOpened(!isPopupEditOpened);
    document.addEventListener("keydown", handleEscClose);
  }

  function handleAddPlaceClick() {
    setIsPopupAddPlaceOpened(!isPopupAddPlaceOpened);
    document.addEventListener("keydown", handleEscClose);
  }

  function handleEditAvatarClick() {
    setIsPopupEditImageOpened(!isPopupEditImageOpened);
    setIsMouseOverAvatar(false);
    document.addEventListener("keydown", handleEscClose);
  }
  function handleDeleteCardClick() {
    setIsPopupDeleteCardOpened(!isPopupDeleteCardOpened);
    document.addEventListener("keydown", handleEscClose);
  }
  function handleCardClick({ name, link }) {
    setSelectedCard({ name, link });
    document.addEventListener("keydown", handleEscClose);
  }

  function closeAllPopups(evt) {
    setIsPopupEditOpened(false);
    setIsPopupAddPlaceOpened(false);
    setIsPopupEditImageOpened(false);
    setIsPopupDeleteCardOpened(false);
    setSelectedCard({});

    if (
      evt.target.classList.contains("popup__container") ||
      evt.target.classList.contains("popup__form") ||
      evt.target.classList.contains("popup__heading") ||
      evt.target.classList.contains("popup__field") ||
      evt.target.classList.contains("popup__error") ||
      evt.target.classList.contains("popup__button_save") ||
      evt.target.classList.contains("popup-image__container") ||
      evt.target.classList.contains("popup-image__image") ||
      evt.target.classList.contains("popup-image__heading")
    ) {
      setIsPopupEditOpened(isPopupEditOpened);
      setIsPopupAddPlaceOpened(isPopupAddPlaceOpened);
      setIsPopupEditImageOpened(isPopupEditImageOpened);
      setIsPopupDeleteCardOpened(isPopupDeleteCardOpened);
      setSelectedCard(selectedCard);
    }

    document.removeEventListener("keydown", handleEscClose);
  }

  function handleUpdateUser({ name, about }) {
    api.updateUserInfo(name, about).catch((err) => {
      showError(err);
    });
    setCurrentUser({
      ...currentUser,
      name: name,
      about: about,
    });
    setIsPopupEditOpened(false);
  }

  function handleUpdateAvatar({ avatar }) {
    api.updateUserImage(avatar).catch((err) => {
      showError(err);
    });
    setCurrentUser({
      ...currentUser,
      avatar: avatar,
    });
    setIsPopupEditImageOpened(false);
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        showError(err);
      });
    setIsPopupAddPlaceOpened(false);
  }

  function handleDeleteCardSubmit() {
    setIsPopupDeleteCardOpened(false);
  }

  return (
    <>
      <Header />
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentCardContext.Provider value={cards}>
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            setIsMouseOverAvatar={setIsMouseOverAvatar}
            isMouseOverAvatar={isMouseOverAvatar}
            onCardImageClick={handleCardClick}
            onLikeClick={handleCardLike}
            onDeleteButtonClick={handleDeleteCardClick}
            onDeleteCard={handleDeleteCard}
            cards={cards}
          />
        </CurrentCardContext.Provider>
        <EditProfilePopup
          isOpen={isPopupEditOpened}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isPopupEditImageOpened}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isPopupAddPlaceOpened}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
        />
        <DeleteCardPopup
          isOpen={isPopupDeleteCardOpened}
          onClose={closeAllPopups}
          onDeleteCard={handleDeleteCardSubmit}
        />
      </CurrentUserContext.Provider>
      <Footer />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        onMouseDown={closeAllPopups}
      />
    </>
  );
}

export default App;
