import close from '../images/close.png';
import { useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image" onClick={props.onEditAvatarClick}>
          <img className="profile__avatar"
            alt="foto de perfil"
            name="avatar"
            src={currentUser.avatar}
          />
          <div className="profile__avatar-edit"></div>
        </div>

        <div className="profile__info">
          <h1 className="profile__info-name">{currentUser.name}</h1>
          <p className="profile__info-description">{currentUser.about}</p>
          <button id="edit-button" className="profile__edit-button" type="button" onClick={props.onEditProfileClick}></button>
        </div>

        <button onClick={props.onAddPlaceClick} id="add-button" className="profile__add-button" type="button"></button>
      </section>

      <section id="cards-section" className="cards"></section>

      {/* <!-- ------------------------CONFIRMACIÓN---------------------- --> */}
      <div className="popup popup-confirm">
        <div className="popup__overlay"></div>
        <div className="popup__content popup__content-confirm">
          <form name="confirm-form" className="popup__admin" noValidate>
            <img src={close} alt="Close icon" className="popup__close-icon popup__close-icon-place" />
            <h2 className="popup__heading">¿Estás seguro/a?</h2>
            <button className="popup__button-save popup__button-save-confirm" type="button" value="Crear" id="saveButton"
            >Sí</button>
          </form>
        </div>
      </div>
      {/* <!-- ------------------------CONTENEDOR LOADER---------------------- --> */}
      <div className="loader-container">
        <div
          className="loader">
        </div>
      </div>

      <div className="cards">
          {props.cards.map((card) => (
            <Card 
              key={card._id} 
              name={card.name} 
              link={card.link} 
              likes={card.likes} 
              onCardClick={props.onCardClick}
              card={card}
              onCardLike = {props.onCardLike}
              onCardDelete = {props.onCardDelete}
            />
          ))}
      </div>

    </main>
  );
}