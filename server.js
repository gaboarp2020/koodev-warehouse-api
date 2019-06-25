'use strict'

// Dependencies
const express = require('express')
const {
  ApolloServer
} = require('apollo-server-express')
const cors = require('cors')
const checkToken = require('./utils/middlewares/checkToken')

// GraphQL Schema
const typeDefs = require('./lib/schema/typeDefs')

// GraphQL Resolvers
const resolvers = require('./lib/schema/resolvers')

// Sequelize-Database Models
const models = require('./models')

require('dotenv').config()

// JWT_SECRET
const secret = process.env.JWT_SECRET

// Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models
  }
})

// Express Execute
const app = express()
const port = process.env.PORT

// Cors Middleware
app.use(cors())

// Check Token Middleware
app.use(checkToken)

// Apollo Middleware
server.applyMiddleware({
  app
})

// Verirfy Database Connection
models.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

models.sequelize.sync().then(() => app.listen(port, () => {
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
}))