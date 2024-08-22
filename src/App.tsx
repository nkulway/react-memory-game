import React, { useState, useEffect, useCallback } from 'react'
import './App.css'
import MemoryCard from './components/MemoryCard'

const generateDeck = () => {
  const symbols = ['∆', 'ß', '£', '§', '•', '$', '+', 'ø']
  const newDeck = symbols.flatMap((symbol) => [
    { isFlipped: false, symbol },
    { isFlipped: false, symbol },
  ])
  return shuffle(newDeck)
}

const shuffle = (deck: { isFlipped: boolean; symbol: string }[]) =>
  deck.sort(() => Math.random() - 0.5)

function App() {
  const [pickedCards, setPickedCards] = useState<number[]>([])
  const [deck, setDeck] = useState(generateDeck())
  const [gameOver, setGameOver] = useState(false)
  const [winMessage, setWinMessage] = useState<string | null>(null)

  const unflipCards = useCallback((firstIndex: number, secondIndex: number) => {
    setDeck((prevDeck) =>
      prevDeck.map((card, index) =>
        index === firstIndex || index === secondIndex
          ? { ...card, isFlipped: false }
          : card
      )
    )
  }, [])

  const checkWin = useCallback(
    (currentDeck: { isFlipped: boolean; symbol: string }[]) => {
      if (currentDeck.every((card) => card.isFlipped)) {
        setGameOver(true)
        setWinMessage('Congratulations! You won!')
      }
    },
    []
  )

  const pickCard = useCallback(
    (cardIndex: number) => {
      if (deck[cardIndex].isFlipped || pickedCards.length >= 2) return

      const newDeck = deck.map((card, index) =>
        index === cardIndex ? { ...card, isFlipped: true } : card
      )

      const newPickedCards = [...pickedCards, cardIndex]

      if (newPickedCards.length === 2) {
        const [firstIndex, secondIndex] = newPickedCards
        const isMatch =
          newDeck[firstIndex].symbol === newDeck[secondIndex].symbol

        if (!isMatch) {
          setTimeout(() => unflipCards(firstIndex, secondIndex), 1000)
        }
        setPickedCards([])
      } else {
        setPickedCards(newPickedCards)
      }

      setDeck(newDeck)
      checkWin(newDeck)
    },
    [deck, pickedCards, unflipCards, checkWin]
  )

  const resetGame = useCallback(() => {
    setDeck(generateDeck())
    setGameOver(false)
    setPickedCards([])
    setWinMessage(null)
  }, [])

  useEffect(() => {
    if (gameOver) {
      console.log('You won!')
    }
  }, [gameOver])

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Memory Game</h1>
        <button
          className={`play-again ${gameOver ? 'visible' : 'invisible'}`}
          onClick={resetGame}
        >
          Play Again
        </button>
        <div className={`win-message ${winMessage ? 'visible' : 'invisible'}`}>
          {winMessage}
        </div>
        <h2 className="App-subtitle">Match cards to win!</h2>
      </header>
      <div className="game-board">
        {Array.from({ length: 4 }).map((_, rowIndex) => (
          <div className="row" key={rowIndex}>
            {deck.slice(rowIndex * 4, rowIndex * 4 + 4).map((card, index) => (
              <MemoryCard
                clickHandler={() => pickCard(rowIndex * 4 + index)}
                key={rowIndex * 4 + index}
                symbol={card.symbol}
                isFlipped={card.isFlipped}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
