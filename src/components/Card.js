export default function Card({name, link, likes, onCardClick, card }) {
    function handleClick() {
        onCardClick(card);
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
                    <button className="cards__footer-fav-button" type="button"></button>
                    <p className="cards__footer-likes-number">{likes.length}</p>
                </div>
            </div>
            <button className="cards__delete" type="button"></button>
        </div>
    )
}