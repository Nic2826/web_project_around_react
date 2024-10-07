import React from 'react';
import PopUpWithForm from './PopUpWithForm';
import { createRef } from 'react';

export default function AddPlacePop({isOpen, onClose, onAddPlace}) {
    const titleRef = createRef();
    const linkRef = createRef();

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: titleRef.current.value,
            link: linkRef.current.value
        })
    }

  return (
    <PopUpWithForm
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    name="place-form"
    title="Nuevo Lugar"
    buttonText="Crear">

    <input 
    id="text-input-place" 
    className="popup__input popup__input-place" 
    type="text" placeholder="Título"
    required minLength="2" 
    maxLength="30"
    ref = {titleRef} 
    name="name" />

    <div className="popup__line"></div>
    <span className="popup__input-error text-input-place-error"></span>

    <input id="url-input" className="popup__input popup__input-link popup__input-place" type="url"
      placeholder="Enlace a la imagen" required name="link" ref={linkRef}/>

    <div className="popup__line"></div>
    <span className="popup__input-error url-input-error"></span>
  </PopUpWithForm>
  )
}
