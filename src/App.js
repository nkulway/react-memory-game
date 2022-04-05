import { useState } from 'react';
import './App.css';
import MemoryCard from './components/MemoryCard';

function generateDeck() {
  const newDeck = [];
  const symbols = ['∆', 'ß', '£', '§', '•', '$', '+', 'ø'];
    for (let i = 0; i < symbols.length * 2; i++) {
      newDeck.push({
        isFlipped: false,
        symbol: symbols[i % symbols.length],
      });
  }
  return shuffle(newDeck);
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function App() {
  const [pickedCards, setPickedCards] = useState([]);
  const [deck, setDeck] = useState(generateDeck());


  const pickCard = (cardIndex) => {
    let newDeck = [...deck]
    let card = newDeck[cardIndex]
    if (card.isFlipped){
      return
    }
    card.isFlipped = true
    let newPickedCards = [...pickedCards, cardIndex]
    if (newPickedCards.length >= 2){
      const card1Index = newPickedCards[0]
      const card2Index = newPickedCards[1]
      const firstCard = newDeck[card1Index]
      const secondCard = newDeck[card2Index]
      newPickedCards = []
      if (firstCard.symbol !== secondCard.symbol){
        unflipCards(card1Index, card2Index)
      }
    }
    setPickedCards(newPickedCards)
    setDeck(newDeck)
    checkWin()
  }

  let unflipCards = (card1Index, card2Index) => {
    setTimeout(() => {let newDeck = [...deck]
      newDeck[card1Index].isFlipped = false
      newDeck[card2Index].isFlipped = false
      setDeck(newDeck)}, 1000)
  }

  const checkWin = () => {
    // map over cards check ifFlipped is true
    // then do...
    // .every returns a boolean always, takes a function
    const allFlipped = deck.every((card) => card.isFlipped)
    console.log(allFlipped)
  }

  // const resetGame = () => {
  //   setDeck(generateDeck())
  //   setGameOver (false)
  // }

  const cardsJSX = deck.map((card, index) => {
    return (
      <MemoryCard
        clickHandler={() => pickCard(index)}
        key={index}
        symbol={card.symbol}
        isFlipped={card.isFlipped}
      />
    );
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Memory Game</h1>
        {/* {gameOver? (
          <button></button>
        )} */}
        <h2 className='App-subtitle'>Match cards to win!</h2>
      </header>
      <div className="row">
        {cardsJSX.slice(0, 4)}
      </div>
      <div className="row">
        {cardsJSX.slice(4, 8)}
      </div>
      <div className="row">
        {cardsJSX.slice(8, 12)}
      </div>
      <div className="row">
        {cardsJSX.slice(12, 16)}
      </div>
    </div>
  );
}

export default App;