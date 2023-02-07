import { Request, Response, NextFunction } from 'express'
import { BadRequestError } from './helpers/apiError'
import pool from './server'

const getAllGames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await pool.query('SELECT * FROM games')
    res.status(200).json(result.rows[0])
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const createNewGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await pool.query('INSERT INTO games (status) VALUES ($1)', [
      'Running',
    ])
    res.status(201).json(result)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const getSingleGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  try {
    const result = await pool.query('SELECT * FROM games WHERE id = $1', [id])
    res.status(200).json(result.rows[0])
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const setMove = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { board } = req.body
  try {
    await pool.query('UPDATE games SET board = $1 WHERE id = $2', [board, id])

    const checkForWinner = (squares: any): any => {
      let result = 'Draw'
      const combos: any = {
        across: [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
        ],
        down: [
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
        ],
        diagnol: [
          [0, 4, 8],
          [2, 4, 6],
        ],
      }

      //	compare patern to check for winner
      for (const combo in combos) {
        combos[combo].forEach((pattern: any) => {
          if (
            //	check if each char in each arr in combos is empty, if yes
            squares[pattern[0]] === '' ||
            squares[pattern[1]] === '' ||
            squares[pattern[2]] === ''
          ) {
            // do nothing
          } else if (
            //	check if all char in each arr in combos has the same user ('x' or 'o')
            squares[pattern[0]] === squares[pattern[1]] &&
            squares[pattern[1]] === squares[pattern[2]]
          ) {
            result = squares[pattern[0]]
          }
        })
      }

      if (result === 'o' || result === 'x') {
        pool.query('UPDATE games SET result = $1, status = $2 WHERE id = $3', [
          result,
          `${result} won`,
          id,
        ])
      }
    }

    checkForWinner(board)

    res.status(200).json({ message: 'Game updated' })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const deleteGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await pool.query('DELETE FROM games')
    res.status(200).json({ message: 'All game deleted' })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export { getAllGames, createNewGame, getSingleGame, setMove, deleteGame }
