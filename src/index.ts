import express, { Application, Request, Response } from 'express'
import * as bodyParser from 'body-parser'
import routes from './routes'

const app: Application = express()

app.use(bodyParser.json())

app.use('/', routes)

app.listen(8080, () => {
  console.log('server started 🚀')
})
