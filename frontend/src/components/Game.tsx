import { useEffect, useState } from 'react';
import axios from 'axios';
import './game.css';

const Game = ({ id }: any) => {
  const [turn, setTurn] = useState('x');
  const [cells, setCells] = useState(Array(9).fill(''));
  const [winner, setWinner] = useState();

  useEffect(() => {
    const fetchGame = async () => {
      const res = await axios.get(`http://localhost:5000/api/v1/games/${id}`);
      const game = res.data;
      const winner = game.result;
      if (winner) {
        alert(`${winner} won`);
        setWinner(winner);
        return;
      }
    };
    fetchGame();
  }, [winner, cells]);

  const handleClick = async (num: number) => {
    if (cells[num] !== '') {
      alert('already clicked');
      return;
    }

    let squares: any = [...cells];

    if (turn === 'x') {
      squares[num] = 'x';
      setTurn('o');
    } else {
      squares[num] = 'o';
      setTurn('x');
    }

    setCells(squares);
    await axios.put(`http://localhost:5000/api/v1/games/${id}`, {
      board: squares,
    });
  };

  const Cell = ({ num }: { num: number }) => {
    return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
  };

  return (
    <div className='container'>
      <table>
        Turn: x
        <tbody>
          <tr>
            <Cell num={0} />
            <Cell num={1} />
            <Cell num={2} />
          </tr>
          <tr>
            <Cell num={3} />
            <Cell num={4} />
            <Cell num={5} />
          </tr>
          <tr>
            <Cell num={6} />
            <Cell num={7} />
            <Cell num={8} />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Game;
