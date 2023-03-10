import "../index.css";
import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isPopupEditOpened, setIsPopupEditOpened] = React.useState(false);
  const [isPopupAddPlaceOpened, setIsPopupAddPlaceOpened] =
    React.useState(false);
  const [isPopupEditImageOpened, setIsPopupEditImageOpened] =
    React.useState(false);
  const [isPopupDeleteCardOpened, setIsPopupDeleteCardOpened] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const classNameEdit = `${isPopupEditOpened ? "visible" : "invisible"}`;
  const classNameAdd = `${isPopupAddPlaceOpened ? "visible" : "invisible"}`;
  const classNameDelete = `${
    isPopupDeleteCardOpened ? "visible" : "invisible"
  }`;
  const classNameEditImage = `${
    isPopupEditImageOpened ? "visible" : "invisible"
  }`;
  const classNamePopupImage = `${
    Object.keys(selectedCard).length === 0 ? "invisible" : "visible"
  }`;

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

  function handlePopupMouseDown(evt, state, setState) {
    if (evt.target.classList.contains("visible")) {
      if (typeof state == "boolean") {
        setState(!state);
      } else {
        setState({});
      }
    } else if (
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
      setState(state);
    }
  }

  function closeAllPopups(evt) {
    if (isPopupEditOpened === true) {
      setIsPopupEditOpened(!isPopupEditOpened);
      document.removeEventListener("keydown", handleEscClose);
      handlePopupMouseDown(evt, isPopupEditOpened, setIsPopupEditOpened);
    }
    if (isPopupAddPlaceOpened === true) {
      setIsPopupAddPlaceOpened(!isPopupAddPlaceOpened);
      document.removeEventListener("keydown", handleEscClose);
      handlePopupMouseDown(
        evt,
        isPopupAddPlaceOpened,
        setIsPopupAddPlaceOpened
      );
    }
    if (isPopupEditImageOpened === true) {
      setIsPopupEditImageOpened(!isPopupEditImageOpened);
      document.removeEventListener("keydown", handleEscClose);
      handlePopupMouseDown(
        evt,
        isPopupEditImageOpened,
        setIsPopupEditImageOpened
      );
    }
    if (isPopupDeleteCardOpened === true) {
      setIsPopupDeleteCardOpened(!isPopupDeleteCardOpened);
      document.removeEventListener("keydown", handleEscClose);
      handlePopupMouseDown(
        evt,
        isPopupDeleteCardOpened,
        setIsPopupDeleteCardOpened
      );
    }
    if (selectedCard !== {}) {
      setSelectedCard({});
      document.removeEventListener("keydown", handleEscClose);
      handlePopupMouseDown(evt, selectedCard, setSelectedCard);
    }
  }

  return (
    <>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardImageClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        isOpen={classNameEdit}
        onClose={closeAllPopups}
        onMouseDown={closeAllPopups}
        name="edit"
        title="Редактировать профиль"
        buttonName="Сохранить"
      >
        {" "}
        <input
          placeholder="Имя"
          id="name"
          className="popup__field popup__field_name"
          type="text"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__error name-error"></span>
        <input
          placeholder="Вид деятельности"
          id="job"
          className="popup__field popup__field_job"
          type="text"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__error job-error"></span>{" "}
      </PopupWithForm>
      <PopupWithForm
        isOpen={classNameAdd}
        onClose={closeAllPopups}
        onMouseDown={closeAllPopups}
        name="add"
        title="Новое место"
        buttonName="Создать"
      >
        {" "}
        <input
          placeholder="Название"
          id="heading"
          className="popup__field popup__field_heading"
          type="text"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__error heading-error"></span>
        <input
          placeholder="Ссылка на картинку"
          id="source"
          className="popup__field popup__field_source"
          type="url"
          required
        />
        <span className="popup__error source-error"></span>{" "}
      </PopupWithForm>
      <PopupWithForm
        isOpen={classNameDelete}
        onClose={closeAllPopups}
        onMouseDown={closeAllPopups}
        name="delete"
        title="Вы уверены?"
        buttonName="Да"
      />
      <PopupWithForm
        isOpen={classNameEditImage}
        onClose={closeAllPopups}
        onMouseDown={closeAllPopups}
        name="edit-avatar"
        title="Обновить аватар"
        buttonName="Сохранить"
      >
        {" "}
        <input
          placeholder="Ссылка на картинку"
          id="avatar"
          className="popup__field popup__field_source"
          type="url"
          required
        />
        <span className="popup__error avatar-error"></span>{" "}
      </PopupWithForm>
      <ImagePopup
        isOpen={classNamePopupImage}
        card={selectedCard}
        onClose={closeAllPopups}
        onMouseDown={closeAllPopups}
      />
    </>
  );
}

export default App;
