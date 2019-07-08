const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const errorHandler = require('../errorHandler')

require('dotenv').config()

const resolvers = {
    Query: {
        async me(root, args, {
            models,
            user
        }) {
            if (user) {
                // Sesión iniciada
                return await models.User.findOne({
                    where: {
                        id: user.id
                    }
                })
            }

            // Sesión no iniciada
            return null
        },
        async getAllUsers(root, args, {
            models
        }) {
            try {
                return await models.User.findAll()
            } catch (error) {
                errorHandler(error)
            }
        },
        async getAllProducts(root, args, {
            models
        }) {
            try {
                return await models.Product.findAll()
            } catch (error) {
                errorHandler(error)
            }
        },
        async getProduct(root, id, {
            models
        }) {
            try {
                return await models.PriceLog.findOne({
                    where: {
                        id
                    }
                })
            } catch (error) {
                errorHandler(error)
            }
        },
        async getAllTypes(root, args, {
            models
        }) {
            try {
                return await models.Type.findAll()
            } catch (error) {
                errorHandler(error)
            }
        },
        async getType(root, TypeId, {
            models
        }) {
            try {
                return await models.Type.findOne({
                    where: {
                        TypeId
                    }
                })
            } catch (error) {
                errorHandler(error)
            }
        },
        async getAllPricesLogs(root, args, {
            models
        }) {
            try {
                return await models.PriceLog.findAll()
            } catch (error) {
                errorHandler(error)
            }
        },
        async getProductPricesLogs(root, ProductId, {
            models
        }) {
            try {
                return await models.PriceLog.findOne({
                    where: {
                        ProductId
                    }
                })
            } catch (error) {
                errorHandler(error)
            }
        },
    },
    Mutation: {
        async createUser(root, {
            firstName,
            lastName,
            username,
            password,
            email,
            isAdmin,
        }, {
            models
        }) {
            try {
                return models.User.create({
                    firstName,
                    lastName,
                    username,
                    password: await bcrypt.hash(password, 10),
                    email,
                    isAdmin,
                })
            } catch (error) {
                errorHandler(error)
            }
        },
        async validateUser(root, {
            username,
            password
        }, {
            models
        }) {
            const user = await models.User.findOne({
                where: {
                    username
                }
            })

            if (!user) {
                throw new Error('Usuario incorrecto')
            }

            const validPassword = await bcrypt.compare(password, user.password)

            if (!validPassword) {
                throw new Error('Contraseña incorrecta')
            }

            const jwtToken = jwt.sign({
                    user: _.pick(user, ['id', 'username'])
                },
                process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRATION
                }
            )

            return jwtToken
        },
        async createProduct(root, {
            name,
            brand,
            content,
            unity,
            price,
            quantity,
            photo,
            TypeId
        }, {
            models
        }) {
            try {
                return await models.Product.create({
                    name,
                    brand,
                    content,
                    unity,
                    price,
                    quantity,
                    photo,
                    TypeId
                })
            } catch (error) {
                errorHandler(error)
            }
        },
        async updateProduct(root, {
            id,
            name,
            brand,
            content,
            unity,
            price,
            quantity,
            photo,
            TypeId
        }, {
            models
        }) {
            try {
                return await models.Product.update({
                    name,
                    brand,
                    content,
                    unity,
                    price,
                    quantity,
                    photo,
                    TypeId
                }, {
                    where: {
                        id
                    }
                })
            } catch (error) {
                errorHandler(error)
            }
        },
        async deleteProduct(root, {
            id
        }, {
            models
        }) {
            try {
                return await models.Product.destroy({
                    where: {
                        id
                    }
                })
            } catch (error) {
                errorHandler(error)
            }
        },
        async createType(root, {
            name
        }, {
            models
        }) {
            try {
                return await models.Type.create({
                    name
                })
            } catch (error) {
                errorHandler(error)
            }
        }
    },
    Product: {
        type: async ({
            product
        }) => {
            try {
                return await models.Type.findOne({
                    where: {
                        id: product.id
                    }
                })
            } catch (error) {

            }
        }
    },

}

module.exports = resolvers