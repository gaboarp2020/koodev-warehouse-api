'use strict'

// Dependencies
const express = require('express')
const {
  ApolloServer
} = require('apollo-server-express')
const jwt = require('jsonwebtoken')
const cors = require('cors')

// GraphQL Schema
const typeDefs = require('./lib/schema/typeDefs')

// GraphQL Resolvers
const resolvers = require('./lib/schema/resolvers')

// Sequelize-Database Models
const models = require('./models')

require('dotenv').config()

// JWT
const SECRET = process.env.JWT_SECRET

// Apollo Server Instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({
    req
  }) => {
    const tokenWithBearer = req.headers.authorization || ''
    const token = tokenWithBearer.split(' ')[1]
    const user = jwt.verify(token, SECRET, function (err, decoded) {
      return decoded ? decoded.user : null
    });
    console.log('User: ' + JSON.stringify(user), 'Token: ' + token)
    return {
      models,
      user
    }
  },
})

// Express Execute
const app = express()
const port = process.env.PORT

// Cors Middleware
app.use(cors('*'))

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

models.sequelize.sync({
  force: false
}).then(() => app.listen(port, () => {
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
}))