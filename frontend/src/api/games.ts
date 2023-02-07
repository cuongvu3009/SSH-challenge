import axios from 'axios';
import GameProps from '../types/gameType';

export async function getGames(): Promise<GameProps> {
  return axios
    .get(`http://localhost:5000/api/v1/games`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export async function createGame() {
  return axios
    .post(`http://localhost:5000/api/v1/games`)
    .catch((err) => console.log(err));
}

export async function deleteGame() {
  return axios
    .delete(`http://localhost:5000/api/v1/games/`)
    .catch((err) => console.log(err));
}
