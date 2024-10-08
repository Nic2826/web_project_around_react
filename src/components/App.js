
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { useState, useEffect } from 'react';
import EditProfilPopup from './EditProfilPopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmDeletePopup from './ConfirmDeletePopup.js';

function App() {
  const [cards, setCards] = useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null); 
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: ''
  });
  

  useEffect(() => {
    async function getCards() {
      const initialCards = await api.getInitialCards();
      setCards(initialCards);
    }
    getCards();
  }, []);

  // Abrir el popup de confirmación para eliminar
  function handleDeleteClick(card) {
    setCardToDelete(card); // Guardamos la tarjeta que se quiere eliminar
    setIsDeleteCardPopupOpen(true); // Abrimos el popup de confirmación
  }

  // Confirmar eliminación
  function handleConfirmDelete() {
    api.deleteCard(cardToDelete._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
        setIsDeleteCardPopupOpen(false); // Cerramos el popup después de eliminar
        setCardToDelete(null); // Limpiamos la tarjeta a eliminar
      })
      .catch((err) => {
        console.error('Error al eliminar la tarjeta:', err);
      });
  }



  function handleCardLike(card) {
    // Verifica una vez más si a esta tarjeta ya le han dado like
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Envía una petición a la API y obtén los datos actualizados de la tarjeta
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
}

  useEffect(() => {
    async function getValues() {
      const response = await api.getUserInfo();
      setCurrentUser(response)
    }
    getValues();
  }, []);

 

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
    setIsDeleteCardPopupOpen(false);
  }

  //NOT SURE-------------------------------------------------------------------
  function handleUpdateUser(userData) {
    api.updateUserInfo(userData).then((newUser) => {
      console.log('Usuario actualizado:', newUser); // Verificar la respuesta
      setCurrentUser(newUser);
    })
  }

  function handleUpdateAvatar(avatar) {
    api.updateAvatar(avatar).then((newAvatar) => {
      console.log('Avatar actualizado:', newAvatar); 
      setCurrentUser(newAvatar);
    })
  }

  function handleAddPlace(data){
    api.postCards(data).then((card) => {
      setCards([card, ...cards]);
      closeAllPopups();
    })
  }

  return (
    <div className="body">
      <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditAvatarClick={handleEditAvatarClick}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteClick}
        />
        <Footer />

        {/* ---------------------AVATAR--------------------- */}
        <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups} 
        onUpdateAvatar={handleUpdateAvatar}
        />

        {/* ---------------------PROFILE--------------------- */}
        <EditProfilPopup
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        />

        {/* ---------------------PLACE--------------------- */}
       <AddPlacePopup 
       isOpen={isAddPlacePopupOpen} 
       onClose={closeAllPopups}
       onAddPlace={handleAddPlace}
       />

        <ImagePopup
         link={selectedCard.link}
         title={selectedCard.name}
         isOpen={isImagePopupOpen}
         onClose={closeAllPopups}
        />

        {/* Popup de confirmación de eliminación */}
        <ConfirmDeletePopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onConfirm={handleConfirmDelete} // Confirmar eliminación al hacer clic en el botón "Eliminar"
          />

  

        </CurrentUserContext.Provider>
       
      </div>
    </div>
  );
}

export default App;
