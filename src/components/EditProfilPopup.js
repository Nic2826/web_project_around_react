import React from 'react';
import PopUpWithForm from './PopUpWithForm';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilPopup({isOpen, onClose, onUpdateUser}) {
    
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const currentUser = useContext(CurrentUserContext);

    function handleChangeName(e) {
      setName(e.target.value);
    }

    useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
        console.log("nombre:",name, "about:",about);
        console.log("currentNombre:",currentUser.name, "currentAbout:",currentUser.about);
      }, [currentUser]);

    function handleChangeAbout(e) {
        setAbout(e.target.value);
      }

      function handleSubmit(e) {
        // Evita que el navegador navegue hacia la dirección del formulario
        e.preventDefault();
      
        // Pasa los valores de los componentes gestionados al controlador externo
        onUpdateUser({
          name,
          about,
        });

        
      }

  return (
    <PopUpWithForm
    isOpen={isOpen}
    onSubmit={handleSubmit}
    onClose={onClose}
    onUpdateUser={onUpdateUser}
    name="profile-form"
    title="Editar Perfil"
    buttonText="Crear" >

    <input 
    id="text-input-name" 
    className="popup__input popup__input-name" 
    type="text" 
    placeholder="Nombre"
    required minLength="2" 
    maxLength="40" 
    name="name" 
    onChange={handleChangeName}
    value={name}/>

    <div className="popup__line"></div>
    <span className="popup__input-error text-input-name-error"></span>

    <input 
    id="text-input-about" 
    className="popup__input popup__input-about" 
    type="text" 
    placeholder="Acerca de mí"
    required minLength="2" 
    maxLength="200" 
    name="about" 
    onChange={handleChangeAbout}
    value={about}/>

    <div className="popup__line"></div>
    <span className="popup__input-error text-input-about-error"></span>

  </PopUpWithForm>
  )
}
