import BlankImage from "./img/blank_card.png";

const Card = ({ card }) => {
  let myCard; 
  if (card) {
    myCard = (
      <picture className="card">
        <img src={card.image} alt={`${card.value} of ${card.suit}`}></img>
      </picture>
    );
  } else {
    // if object is empty
    myCard = (
      <picture className="card empty">
        <img src={BlankImage} alt="Blank"></img>
      </picture>
    ); 
  }
  return myCard;
  
  // return (
  //   <div>
  //     <h2>card</h2>
  //     <picture className="card">
  //       <img src={card.image} alt={`${card.value} of ${card.suit}`}></img>
  //       <p>card</p>
  //     </picture>
  //   </div>
  // );
};

export default Card;
