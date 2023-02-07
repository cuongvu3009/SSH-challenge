import axios from 'axios';
import { useState } from 'react';
import { createGame, deleteGame, getGames } from './api/games';
import './App.css';
import Game from './components/Game';

function App() {
  const [id, setId] = useState<number | null>(null);

  const handleClick = async () => {
    createGame();
    const game = await getGames();
    setId(game.id);
  };

  const handleDelete = () => {
    deleteGame();
    location.reload();
  };

  return (
    <div className='App'>
      <h3>Create New Game</h3>
      {id ? (
        <button onClick={handleDelete}>Play again</button>
      ) : (
        <button onClick={handleClick}>Create</button>
      )}

      {id && <Game id={id} />}
    </div>
  );
}

export default App;
