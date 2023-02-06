import { Request, Response, NextFunction } from 'express'
import { BadRequestError } from './helpers/apiError'

const getAllGames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send('get all games')
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
    return res.send('get new game')
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
  try {
    return res.send('get single game')
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

const setMove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.send('set move')
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
    return res.send('delete single game')
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export { getAllGames, createNewGame, getSingleGame, setMove, deleteGame }
