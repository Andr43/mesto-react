import profileAvatar from "../images/profile__avatar.jpg";
import React from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [isMouseOverAvatar, setIsMouseOverAvatar] = React.useState(false);
  const classNameEditImage = `${isMouseOverAvatar ? "visible" : "invisible"}`;

  function handleClick(card) {
    props.onCardImageClick(card);
  }

  function hoverUserImage() {
    setIsMouseOverAvatar(!isMouseOverAvatar);
  }

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userInfo, cardInfo]) => {
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
        setCards(cardInfo);
      })
      .catch(() => {
        setUserName("Жак-Ив Кусто");
        setUserDescription("Исследователь океана");
        setUserAvatar(profileAvatar);
      });
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar">
          <img
            src={userAvatar}
            alt="аватар"
            className="profile__image"
            onMouseEnter={hoverUserImage}
          />
          <div
            className={`profile__background ${classNameEditImage}`}
            onMouseLeave={hoverUserImage}
          >
            <button
              className={`profile__button profile__button_edit-image ${classNameEditImage}`}
              onClick={props.onEditAvatar}
            ></button>
          </div>
        </div>
        <h1 className="profile__name">{userName}</h1>
        <button
          aria-label="перейти к полям ввода для изменения профиля"
          type="button"
          className="profile__button profile__button_edit"
          onClick={props.onEditProfile}
        ></button>
        <button
          aria-label="добавить новую карточку"
          type="button"
          className="profile__button profile__button_add"
          onClick={props.onAddPlace}
        ></button>
        <p className="profile__job">{userDescription}</p>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map(({ ...props }) => (
            <Card key={props._id} card={props} onCardClick={handleClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
