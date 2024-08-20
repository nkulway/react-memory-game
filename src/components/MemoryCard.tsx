import React, { FC } from 'react'
import './MemoryCard.css'

interface MemoryCardProps {
  clickHandler: () => void
  isFlipped: boolean
  symbol: string
}

const MemoryCard: FC<MemoryCardProps> = ({
  clickHandler,
  isFlipped,
  symbol,
}) => {
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
