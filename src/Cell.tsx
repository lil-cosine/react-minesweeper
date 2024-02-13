import React from 'react';

function Cell({ x, y, val, isMine, handleClick, isRevealed, updateRevealed, floodReveal, isGameOver, setIsGameOver }: CellProps) {

  const handleButtonClick = () => {
    if (isRevealed || isGameOver) return;
    console.log(val);
    if(val === ""){
      floodReveal(x, y);
    }
    else if (isMine) {
      updateRevealed(x,y);
      setIsGameOver(true);
    }
    else{
      handleClick(x, y);
    }
  }

  const buttonStyle = {
    border: "1px solid black",
    height: "50px",
    width: "50px",
  };

  const notMineStyle = {
    border: "1px solid green",
    background: "green",
    color: "black",
    height: "50px",
    width: "50px",
  }

  const mineStyle = {
    border: "1px solid red",
    background: "red",
    color: "black",
    height: "50px",
    width: "50px",
  }

  const curStyle = isRevealed ? (isMine ? mineStyle : notMineStyle) : buttonStyle;

  return (
    <button style={curStyle} onClick={handleButtonClick}>
      {(isRevealed || isGameOver) ? val : ""}
    </button>
  );
}

export default Cell;
