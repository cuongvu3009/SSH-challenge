import errorhandler from 'errorhandler'
import { Pool } from 'pg'

import app from './app'

const pool = new Pool({
  user: process.env['PGUSER'],
  host: process.env['PGHOST'],
  database: process.env['PGDATABASE'],
  password: process.env['PGPASSWORD'],
  port: 5432,
})

pool
  .connect()
  .then(async () => {
    app.listen(app.get('port'), () => {
      console.log(
        '  App is running at http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
      )
      console.log('  Press CTRL-C to stop\n')
    })
  })
  .catch((error) => {
    console.log(
      'Postgresql connection error. Please make sure Postgresql is running. ' +
        error
    )
    process.exit(1)
  })

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorhandler())

export default pool
