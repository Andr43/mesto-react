function Card(props) {
  function handleCardClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="card__element">
      <img
        src={props.card.link}
        onClick={handleCardClick}
        alt={props.card.name}
        className="card__image"
      />
      <div className="card__flex">
        <h3 className="card__heading">{props.card.name}</h3>
        <div className="card__flex_like">
          <button
            aria-label="добавить в избранное"
            type="button"
            className="card__button card__button_like"
          ></button>
          <p className="card__likes">{props.card.likes.length}</p>
        </div>
      </div>
      <button
        aria-label="удалить карточку"
        type="button"
        className="card__button card__button_delete"
      ></button>
    </li>
  );
}

export default Card;
