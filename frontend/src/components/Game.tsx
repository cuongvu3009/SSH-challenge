import { useState } from 'react';
import './game.css';

const Game = () => {
  const Cell = () => {
    return <td></td>;
  };

  return (
    <div className='container'>
      <table>
        Turn: x
        <tbody>
          <tr>
            <Cell />
            <Cell />
            <Cell />
          </tr>
          <tr>
            <Cell />
            <Cell />
            <Cell />
          </tr>
          <tr>
            <Cell />
            <Cell />
            <Cell />
          </tr>
        </tbody>
      </table>
      <>
        <p>x is the winner!</p>
        <button>Play Again</button>
      </>
    </div>
  );
};

export default Game;
