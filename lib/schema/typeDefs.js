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
  name: String!
  brand: String
  content: Int
  unit: String
  price: Float!
  createdAt: String!
  updatedAt: String!
  TypeId: Int!
  type: Type!
}

type Type {
  id: Int!
  name: String!
  createdAt: String!
  updatedAt: String!
}

type PriceLog {
  id: Int!
  price: Float!
  createdAt: String!
  updatedAt: String!
  ProductId: Int!
  product: Product!
}

type Query {
  "Devuelve el usuario actual"
  me: User!

  "Devuelve los usuarios"
  getAllUsers: [User!] !

  "Devuelve todos los productos"
  getAllProducts: [Product!] !

  "Devuelve un producto"
  getProduct(id: Int!): Product!

  "Devuelve todos los tipos de productos"
  getAllTypes: [Type!] !

  "Devuelve un tipo de producto"
  getType(id: Int!): Type!

  "Devuelve todos los historicos de precios de los productos"
  getAllPricesLogs: [PriceLog!] !

  "Devuelve el historico de precios de un producto"
  getProductPricesLogs(ProductId: Int!): [PriceLog!] !
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
    name: String!
    brand: String
    content: Int
    unit: String
    price: Float!
    TypeId: Int!
  ): Product

  "Edita un producto"
  updateProduct(
    id: Int!
    name: String
    brand: String
    content: Int
    unit: String
    photo: String
    TypeId: Int
  ): [Int!] !

  "Edita el precio de un producto"
  updatePriceProduct(
    ProductId: Int!
    price: Float!
  ): PriceLog

  "Elimina un producto"
  deleteProduct(id: Int!): Boolean

  "Agrega un tipo de producto"
  createType(
    name: String!
  ): Type
}
`

module.exports = typeDefs