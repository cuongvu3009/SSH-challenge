import express from 'express'
const router = express.Router()

import {
  getAllGames,
  createNewGame,
  getSingleGame,
  setMove,
  deleteGame,
} from './controller'

router.get('/games', getAllGames)
router.post('/games', createNewGame)
router.get('/games/:id', getSingleGame)
router.put('/games/:id', setMove)
router.delete('/games/:id', deleteGame)

export default router
