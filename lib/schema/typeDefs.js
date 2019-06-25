const {
  gql
} = require('apollo-server-express')

const typeDefs = gql `

type User {
  id: Int!
  firstName: String!
  lastName: String!
  username: String!
  password: String!
  email: String!
  isAdmin: Boolean!
  createdAt: String!
  updatedAt: String!
}

type Product {
  id: Int!
  type: String!
  name: String!
  brand: String
  quantity: Int!
  price: Float!
  photo: String
  createdAt: String!
  updatedAt: String!
}

type Query {
  "Devuelve un usuario"
  me: User

  "Devuelve los usuarios"
  getAllUsers: [User!] !

  "Devuelve todos los productos"
  getAllProducts: [Product!] !
}

input ProductInput {
  type: String!
  name: String!
  brand: String
  quantity: Int!
  price: Float!
  photo: String
}

input UpdateProductInput {
  type: String
  name: String
  brand: String
  quantity: Int
  price: Float
  photo: String
}

type Mutation {
  "Crea un usuario"
  createUser(
    firstName: String!
    lastName: String!
    username: String!
    password: String!
    email: String!
    isAdmin: Boolean!
  ): User

  "Valida el acceso de un usuario"
  validateUser(
    username: String!
    password: String!
  ): String

  "Crea un producto"
  createProduct(
    type: String!
    name: String!
    brand: String
    quantity: Int!
    price: Float!
    photo: String
  ): Product

  "Edita un producto"
  updateProduct(
    type: String
    name: String
    brand: String
    quantity: Int
    price: Float
    photo: String
  ): Product

  "Elimina un producto"
  deleteProduct(id: ID!): Boolean
}
`

module.exports = typeDefs