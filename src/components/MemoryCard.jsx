import React from "react";
import './MemoryCard.css';

function MemoryCard(props) {
  let innerClass = 'MemoryCard__inner'

  // let onClick = {props.clickHandler}

  if (props.isFlipped === true) {
    innerClass = 'MemoryCard__inner flipped'
  }
  return (
    
      <div className="MemoryCard" onClick={props.clickHandler}>
        <div className={innerClass}>
          <div className="MemoryCard__back">
            <img src="question-mark.svg" alt="wrench" />
          </div>
          <div className="MemoryCard__front">
            {props.symbol}
          </div>
        </div>
    </div>

  );
}

export default MemoryCard;