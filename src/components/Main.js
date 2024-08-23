import close from '../images/close.png';
import { useState, useEffect } from 'react';
import api from '../utils/Api';
import Card from './Card.js';

export default function Main(props) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);
 

  useEffect(() => {
    async function getValues() {
      const response = await api.getUserInfo();
      console.log(response);
      setUserName(response.name);
      setUserAvatar(response.avatar);
      setUserDescription(response.about);
    }
    getValues();
  }, []);

  useEffect(() => {
    async function getCards() {
      const initialCards = await api.getInitialCards();
      console.log(initialCards);
      setCards(initialCards);
    }
    getCards();
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image" onClick={props.onEditAvatarClick}>
          <img className="profile__avatar"
            alt="foto de perfil"
            name="avatar"
            src={userAvatar}
          />
          <div className="profile__avatar-edit"></div>
        </div>

        <div className="profile__info" onClick={props.onEditProfileClick} >
          <h1 className="profile__info-name">{userName}</h1>
          <p className="profile__info-description">{userDescription}</p>
          <button id="edit-button" className="profile__edit-button" type="button"></button>
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

      <div>
        {cards.map((card) => (
          <Card 
          key={card._id} 
          name={card.name} 
          link={card.link} 
          likes={card.likes} 
          onCardClick={props.onCardClick}
          card={card}
           />
        ))}
      </div>



      {/* <script>
    window.onload = () => {
      const loader = document.querySelector(".loader-container");
      loader.style.visibility = "hidden";
      loader.style.opacity = "0";
    };
  </script> */}
    </main>
  );
}