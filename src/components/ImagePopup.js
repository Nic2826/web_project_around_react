import close from '../images/close.png';
export default function ImagePopup({link, title, onClose, isOpen}) {
  return (
    // <div className={`popup popup-card ${isOpen ? "popup_open" : ""}`} id="image-popup">
      <div className={`popup popup-card ${isOpen ? "popup_open" : ""}`} id="image-popup">
      <div className="popup__overlay"></div>
      <div className="popup__content-image">
        <img 
        alt="Close icon" 
        className="popup__close-icon popup__close-icon-image"
        src={close}
        onClick={onClose}
        />
        <img className="popup__image" src={link} alt=" " />
        <p className="popup__title">{title}</p>
      </div>
    </div>
    
  )
};