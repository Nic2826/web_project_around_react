
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopUpWithForm from './PopUpWithForm.js';
import ImagePopup from './ImagePopup.js';
import { useState } from 'react';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }


  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  return (
    <div className="body">
      <div className="page__container">
        <Header />
        <Main
          onEditAvatarClick={handleEditAvatarClick}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        {/* ---------------------AVATAR--------------------- */}
        <PopUpWithForm
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          name="avatar-form"
          title="Cambiar Foto de Perfil"
          buttonText="Guardar" >

          <input id="url-avatar-input" className="popup__input popup__input-avatar" type="url"
            placeholder="Enlace a la imagen de perfil" required name="avatarLink" />

          <div className="popup__line"></div>
          <span className="popup__input-error url-input-error url-avatar-input-error
            "></span>
        </PopUpWithForm>

        {/* ---------------------PROFILE--------------------- */}
        <PopUpWithForm
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          name="profile-form"
          title="Editar Perfil"
          buttonText="Crear" >
          <input id="text-input-name" className="popup__input popup__input-name" type="text" placeholder="Nombre"
            required minLength="2" maxLength="40" name="name" />

          <div className="popup__line"></div>
          <span className="popup__input-error text-input-name-error"></span>

          <input id="text-input-about" className="popup__input popup__input-about" type="text" placeholder="Acerca de mí"
            required minLength="2" maxLength="200" name="about" />

          <div className="popup__line"></div>
          <span className="popup__input-error text-input-about-error"></span>

        </PopUpWithForm>

        {/* ---------------------PLACE--------------------- */}
        <PopUpWithForm
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          name="place-form"
          title="Nuevo Lugar"
          buttonText="Crear">

          <input id="text-input-place" className="popup__input popup__input-place" type="text" placeholder="Título"
            required minLength="2" maxLength="30" name="name" />

          <div className="popup__line"></div>
          <span className="popup__input-error text-input-place-error"></span>

          <input id="url-input" className="popup__input popup__input-link popup__input-place" type="url"
            placeholder="Enlace a la imagen" required name="link" />

          <div className="popup__line"></div>
          <span className="popup__input-error url-input-error"></span>
        </PopUpWithForm>

        <ImagePopup
         link={selectedCard.link}
         title={selectedCard.name}
         isOpen={isImagePopupOpen}
         onClose={closeAllPopups}>
        </ImagePopup>
       
      </div>
    </div>
  );
}

export default App;
