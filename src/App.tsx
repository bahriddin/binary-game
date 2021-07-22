import React from "react";
import "./App.css";
import { useState } from "react";

function App({ num }: { num: number }) {
  const [isOver, setIsOver] = useState(false);
  const [bits, setBits] = useState(Array(10).fill(0));

  const handleClick = (position: number) => {
    const newBits = bits.slice();
    newBits[position] = newBits[position] === 1 ? 0 : 1;
    setBits(newBits);

    console.log(binaryToDecimal(newBits.join("")));

    if (binaryToDecimal(newBits.join("")) === num) {
      setIsOver(true);
    }
  };

  if (!isOver) {
    return (
      <div className="app">
        <DecimalInteger value={num} />
        <Row bits={bits} handleClick={handleClick} />
      </div>
    );
  } else {
    return <GameOver />;
  }
}

// binary string to decimal integer
function binaryToDecimal(binary: string): number {
  const decimal = binary.split("").reduce((acc, bit) => {
    return acc * 2 + parseInt(bit, 2);
  }, 0);
  return decimal;
}

function DecimalInteger(props: { value: number }): React.ReactElement<{}> {
  return <div className="decimal-integer">{props.value}</div>;
}

// Row's cell where we show the button to change the value
// and position value in the bottom of the button
function BinaryCell(props: {
  position: number;
  bit: number;
  onClick: () => void;
  key: number;
}): React.ReactElement<{}> {
  return (
    <div className="cell" key={props.position}>
      <button className="cell-button" onClick={props.onClick}>
        {props.bit}
      </button>
      <div className="cell-position">{2 ** props.position}</div>
    </div>
  );
}

// show 10 BinaryCell in a row
function Row(props: {
  bits: number[];
  handleClick: (position: number) => void;
}) {
  return (
    <div className="row">
      {props.bits.map((bit, index) => (
        <BinaryCell
          bit={bit}
          position={9 - index}
          key={index}
          onClick={() => props.handleClick(index)}
        />
      ))}
    </div>
  );
}

function GameOver() {
  return <div className="game-over">YOU WON!</div>;
}

export default App;
