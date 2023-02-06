import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Game from './components/Game';

function App() {
  const [id, setId] = useState(null);

  const handleClick = async () => {
    await axios.post('http://localhost:5000/api/v1/games');
    const res = await axios.get('http://localhost:5000/api/v1/games');
    const game = res.data;
    setId(game.id);
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/v1/games/${id}`);
    location.reload();
  };

  console.log('Game id', id);
  return (
    <div className='App'>
      <h3>Create New Game</h3>
      {id ? (
        <button onClick={() => handleDelete()}>Delete</button>
      ) : (
        <button onClick={handleClick}>Create</button>
      )}

      {id && <Game id={id} />}
    </div>
  );
}

export default App;
