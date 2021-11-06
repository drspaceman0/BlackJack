import React from "react";
import Card from "./Card";

const API_URL_DRAW_DECK = "https://deckofcardsapi.com/api/deck/new/shuffle/";

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      fullDeck : [],
      playerHand : [],
      playerScore : 0,
      dealerHand : [],
      dealerScore : 0,
      winner : "",
    };
  }
 
  componentDidMount() {
    this.initGame();
  }
 
    
  async initGame() {
    console.log("initGame()");
    await this.fetchNewDeck();
    this.dealCards();
  }

  async fetchNewDeck() {
    console.log("fetchNewDeck()");

    const myDeckID = await fetch(API_URL_DRAW_DECK).then((response) => response.json()).then((data) => data.deck_id);
    const myDeck = await fetch(
      `https://deckofcardsapi.com/api/deck/${myDeckID}/draw/?count=52`
    )
      .then((data) => data.json())
      .then((data) => data.cards);
      
      this.setState({fullDeck : myDeck}); 
  } 

  dealCards() {
    console.log("dealing cards");
    this.drawCard(false); // draw card for dealer
    this.drawCard(false); // draw card for dealer
    this.drawCard(); // draw card for player
    this.drawCard(); // draw card for player
    console.log("done dealing cards"); 
  }

  getScore(hand) {
    let score = 0;
    let numAces = 0;
    for(const card of hand) {
      switch (card.value) {
        case "KING":
        case "QUEEN":
        case "JACK":
          score += 10;
          break;
        case "ACE":
          numAces += 1;
          break; 
        default:
          score += Number(card.value); 
          break;
      } 
    }
    if(numAces > 1) {
      score += numAces;
    } else if(numAces == 1) {
      if(score + 11 > 21) {
        score += 1;
      } else {
        score += 11;
      }
    }
    return score;
  }

  drawCard(isPlayer=true) {
    console.log("drawCardForPlayer()");
    const hand =  (isPlayer ? this.state.playerHand : this.state.dealerHand).slice();
    if (this.state.fullDeck) {
      const card = this.state.fullDeck.pop();
      hand.push(card); 
      const score = this.getScore(hand);
      if (isPlayer) {
        this.setState({playerHand: hand, playerScore : score}); 
      } else {
        this.setState({dealerHand: hand, dealerScore : score}); 
      }  


    } else {
      console.log("EMPTY DECK!!!!");
    } 
  }
 
  render (){
    return(
    <div className="table">
      <div className="dealer">
        <h2>Dealer&apos;s Hand ({this.state.dealerScore})</h2>
        <div className="cards">
        {this.state.dealerHand.map((card, index) => (
          <Card card={card} key={index} />
        ))} 
        </div> 
      </div>
      <div className="player">
        <h2>Player&apos;s Hand ({this.state.playerScore})</h2>
        <div className="cards">  
          {this.state.playerHand.map((card, index) => (
            <Card card={card} key={index} />
          ))}
        </div>
        <div className="action-buttons">
          <button
            className="action-button button-hit"
            id="hit"
            onClick={() => this.drawCard()}
          >
            Hit
          </button>
          <button className="action-button button-stay" id="stay">
            Stay
          </button>
        </div>
      </div>
    </div>
    );
  } 
};

export default Game;
