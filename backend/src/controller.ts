import { Request, Response, NextFunction } from 'express'
import { BadRequestError } from './helpers/apiError'
import pool from './server'

const getAllGames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await pool.query('SELECT * FROM games')
    res.status(200).json(result.rows)
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
    const result = await pool.query(
      'INSERT INTO games (board, status) VALUES ($1, $2)',
      ['---------', 'Running']
    )
    res.status(201).json(result.rows[0])
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
  const { id } = req.params
  try {
    await pool.query('DELETE FROM games WHERE id = $1', [id])
    res.status(200).json({ message: 'Game deleted' })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export { getAllGames, createNewGame, getSingleGame, setMove, deleteGame }
