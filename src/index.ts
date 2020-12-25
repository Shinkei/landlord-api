import express, { Application, Request, Response, NextFunction } from 'express'
import * as bodyParser from 'body-parser'
import routes from './routes'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { buildMongoURI } from './utils/utils'

// add the envitoment variables
dotenv.config()
const app: Application = express()

// connect to the mongoDB
mongoose.connect(buildMongoURI(), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
mongoose.Promise = global.Promise
mongoose.connection.on('error', (err) => {
  console.error(`💽 😖 Error connecting to DB → ${err.message}`)
})

// handle json responses
app.use(bodyParser.json())

// add the routes middleware and 404 handler
app.use('/', routes)
app.use((req: Request, res: Response, next: NextFunction) => {
  const err: Error = new Error('Not Found')
  res.sendStatus(404)
  next(err)
})

//start the server
app.listen(process.env.PORT || 8080, () => {
  console.log(`server started 🚀 at port ${process.env.PORT || 8080}`)
})
