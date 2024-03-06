import React from "react";

const GameOver = (props) => {
  return (
    <div>
      {props.show ? (
        <div className="mg-gameOver">
          <div>Parabéns, você completou o jogo!</div>
          <button className="mg-restart" onClick={props.handleRestart}>
            Jogue novamente
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default GameOver;
