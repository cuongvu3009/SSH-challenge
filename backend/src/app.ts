import express from 'express'
import lusca from 'lusca'
import dotenv from 'dotenv'
import morgan from 'morgan'
import apiErrorHandler from './middlewares/apiErrorHandler'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import routers from './routes'

const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

dotenv.config({ path: '.env' })
const app = express()

app.use(cors(corsOptions))

// Express configuration
app.set('port', process.env.PORT || 1234)

// Use common 3rd-party middlewares
// app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
// Security (helmet recommended in express docs)
if (process.env.NODE_ENV === 'production') {
  app.use(helmet())
}

// Use general router

app.use('/api/v1', routers)

// Custom API error handler
app.use(apiErrorHandler)

export default app
