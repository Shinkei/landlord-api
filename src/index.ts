import express, { Application, Request, Response, NextFunction } from 'express'
import * as bodyParser from 'body-parser'
import routes from './routes'
import mongoose from 'mongoose'

const app: Application = express()

mongoose.connect('mongodb://localhost:27017/landlord', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
mongoose.Promise = global.Promise
mongoose.connection.on('error', (err) => {
  console.error(`💽 😖 Error connecting to DB → ${err.message}`)
})

app.use(bodyParser.json())

app.use('/', routes)
app.use((req: Request, res: Response, next: NextFunction) => {
  const err: Error = new Error('Not Found')
  res.sendStatus(404)
  next(err)
})

app.listen(8080, () => {
  console.log('server started 🚀 at port 8080')
})
