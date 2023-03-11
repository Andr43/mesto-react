import "../index.css";
import {useState} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isPopupEditOpened, setIsPopupEditOpened] = useState(false);
  const [isPopupAddPlaceOpened, setIsPopupAddPlaceOpened] =
    useState(false);
  const [isPopupEditImageOpened, setIsPopupEditImageOpened] =
    useState(false);
  const [isPopupDeleteCardOpened, setIsPopupDeleteCardOpened] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState({});

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

  function closeAllPopups(evt) {

      setIsPopupEditOpened(false);
    
      setIsPopupAddPlaceOpened(false);
    
      setIsPopupEditImageOpened(false);
      
      setIsPopupDeleteCardOpened(false);
    
      setSelectedCard({});

      if (evt.target.classList.contains("visible")) {
          setIsPopupEditOpened(false);
          setIsPopupAddPlaceOpened(false);
          setIsPopupEditImageOpened(false);
          setIsPopupDeleteCardOpened(false);
          setSelectedCard({});
        }
      else if (
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
      };
      
      document.removeEventListener("keydown", handleEscClose);
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
        isOpen={isPopupEditOpened}
        onClose={closeAllPopups}
        onMouseDown={closeAllPopups}
        name="edit"
        title="Редактировать профиль"
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
        isOpen={isPopupAddPlaceOpened}
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
        isOpen={isPopupDeleteCardOpened}
        onClose={closeAllPopups}
        onMouseDown={closeAllPopups}
        name="delete"
        title="Вы уверены?"
        buttonName="Да"
      />
      <PopupWithForm
        isOpen={isPopupEditImageOpened}
        onClose={closeAllPopups}
        onMouseDown={closeAllPopups}
        name="edit-avatar"
        title="Обновить аватар"
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
        card={selectedCard}
        onClose={closeAllPopups}
        onMouseDown={closeAllPopups}
      />
    </>
  );
}

export default App;
