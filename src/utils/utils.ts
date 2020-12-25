function buildMongoURI() {
  let mongoURI: string = 'mongodb://'
  if (process.env.MONGO_USER) {
    mongoURI += process.env.MONGO_USER
    if (process.env.MONGO_PASS) {
      mongoURI += `:${process.env.MONGO_PASS}`
    }
    mongoURI += '@'
  }

  mongoURI += process.env.MONGO_SERVER

  if (process.env.MONGO_PORT) {
    mongoURI += `:${process.env.MONGO_PORT}`
  }

  mongoURI += `/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`

  return mongoURI
}

export { buildMongoURI }
