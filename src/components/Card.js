import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

export default function Card({name, link, likes, onCardClick, card, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        ` ${isOwn ? 'cards__delete' : 'cards__delete_hidden'}`
      );

      const isLiked = card.likes.some((i) => i._id === currentUser._id);

      const cardLikeButtonClassName = (`cards__footer-fav-button ${isLiked && 'cards__footer-fav-button_active'}`);

      function handleLike() {
        onCardLike(card)
      }

    function handleClick() {
        onCardClick(card);
      } 

      function handleDelete() {
        onCardDelete(card);
      }

    return (
        <div className="cards__item" >
            <img className="cards__item-image"
                src={link}
                alt={`foto de ${name}`}
                onClick={handleClick}
            />
            <div className="cards__footer">
                <p className="cards__footer-name">{name}</p>
                <div className="cards__footer-fav-container">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLike}></button>
                    <p className="cards__footer-likes-number">{likes.length}</p>
                </div>
            </div>
            <button className={cardDeleteButtonClassName} type="button" onClick={handleDelete}></button>
        </div>
    )
}