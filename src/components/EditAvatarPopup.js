import React, {createRef} from 'react'
import PopUpWithForm from './PopUpWithForm';

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

const inputRef = createRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(inputRef.current.value);
      }

  return (
    <PopUpWithForm
          isOpen={isOpen}
          onClose={onClose}
          onsubmit={handleSubmit}
          onUpdateAvatar={onUpdateAvatar}
          name="avatar-form"
          title="Cambiar Foto de Perfil"
          buttonText="Guardar" >

          <input 
          id="url-avatar-input" 
          className="popup__input popup__input-avatar" 
          type="url"
          placeholder="Enlace a la imagen de perfil" 
          ref={inputRef} 
          required 
          name="avatarLink" />

          <div className="popup__line"></div>
          <span className="popup__input-error url-input-error url-avatar-input-error
            "></span>
        </PopUpWithForm>
  )
}
