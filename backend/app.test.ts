import { Pool } from 'pg'

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sshTest',
  password: '123456',
  port: 5432,
})

describe('Games routes test', () => {
  describe('GET /games', () => {
    it('should return a game', async () => {
      const response = await pool.query('SELECT * FROM games;')
      expect(response.command).toBe('SELECT')
      expect(response.rows).toBeTruthy()
    })
  })
  describe('CREATE /games', () => {
    it('should return a game', async () => {
      const response = await pool.query(
        'INSERT INTO games (status) VALUES ($1)',
        ['Running']
      )
      expect(response.command).toBe('INSERT')
      expect(response.rowCount).toBe(1)
    })
  })
  describe('DELETE /games', () => {
    it('should return NO game', async () => {
      const response = await pool.query('DELETE FROM games;')
      expect(response.command).toBe('DELETE')
    })
  })
  describe('UPDATE /games/:ID ', () => {
    it('should return should update board, result, status', async () => {
      const id = 999999
      const board = ['', '', '', '', '', '', '', '', '']
      const response = await pool.query(
        'UPDATE games SET board = $1 WHERE id = $2',
        [board, id]
      )
      expect(response.command).toBe('UPDATE')
    })
  })
})
