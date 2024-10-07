import close from '../images/close.png';
export default function PopUpWithForm(props) {
    return (
        <div className={`popup popup-${props.name} ${props.isOpen ? "popup_open" : ""}`}>
            <div className="popup__overlay"></div>
            <div className="popup__content">
                <form 
                onSubmit={props.onSubmit}
                name={`${props.name}-form`} 
                className="popup__admin" 
                noValidate>
                    <img src={close} alt="Close icon" className={`popup__close-icon popup__close-icon-${props.name}`} onClick={props.onClose}/>
                    <div>
                        <fieldset className="popup__container popup__container-input">
                            <h2 className="popup__heading">{props.title}</h2>
                            {props.children}
                            <button className="popup__button-save popup__button-save-profile" type="submit" value="Crear" >{props.buttonText}</button>

                        </fieldset>
                    </div>
                </form>
            </div>
        </div>




    )
};