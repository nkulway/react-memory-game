import React from 'react'
import './MemoryCard.css'

function MemoryCard({ clickHandler, isFlipped, symbol }) {
  const innerClass = isFlipped
    ? 'MemoryCard__inner flipped'
    : 'MemoryCard__inner'

  return (
    <div className="MemoryCard" onClick={clickHandler}>
      <div className={innerClass}>
        <div className="MemoryCard__back">
          <img src="question-mark.svg" alt="question mark" />
        </div>
        <div className="MemoryCard__front">{symbol}</div>
      </div>
    </div>
  )
}

export default React.memo(MemoryCard)
