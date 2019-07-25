const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const errorHandler = require('../errorHandler')

require('dotenv').config()

const resolvers = {
    Query: {
        async me(parent, args, {
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
        async getAdmin(parent, args, {
            models
        }) {
            const user = await models.User.findOne({
                where: {
                    username: args.username,
                }
            }) 
            
            if (!user) {
                throw new Error('Usuario incorrecto')
            }

            const validPassword = await bcrypt.compare(args.password, user.password)

            if (!validPassword) {
                throw new Error('Contraseña incorrecta')
            }

            return user

        },
        async getAllUsers(parent, args, {
            models
        }) {
            try {
                return await models.User.findAll()
            } catch (error) {
                errorHandler(error)
            }
        },
        async getAllProducts(parent, args, {
            models
        }) {
            try {
                return await models.Product.findAll()
            } catch (error) {
                errorHandler(error)
            }
        },
        async getProduct(parent, {
            id
        }, {
            models
        }) {
            try {
                return await models.Product.findOne({
                    where: {
                        id
                    }
                })
            } catch (error) {
                errorHandler(error)
            }
        },
        async getAllTypes(parent, args, {
            models
        }) {
            try {
                return await models.Type.findAll()
            } catch (error) {
                errorHandler(error)
            }
        },
        async getType(parent, TypeId, {
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
        async getAllPricesLogs(parent, args, {
            models
        }) {
            try {
                return await models.PriceLog.findAll()
            } catch (error) {
                errorHandler(error)
            }
        },
        async getProductPricesLogs(parent, {
            ProductId
        }, {
            models
        }) {
            try {
                return await models.PriceLog.findAll({
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
        async createUser(parent, {
            firstName,
            lastName,
            username,
            password,
            email,
            isAdmin,
        }, {
            models
        }) {
            // try {
                const userExists = await models.User.findOne({
                    where: {
                        username
                    }
                })

                if (userExists) {
                    throw new Error('El usuario ya existe')
                }

                const emailExists = await models.User.findOne({
                    where: {
                        email
                    }
                })

                if (emailExists) {
                    throw new Error('El email ya esta en uso')
                }

                return models.User.create({
                    firstName,
                    lastName,
                    username,
                    password: await bcrypt.hash(password, 10),
                    email,
                    isAdmin,
                })
            // } catch (error) {
            //     errorHandler(error)
            // }
        },
        async validateUser(parent, {
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
                    user: _.pick(user, ['id', 'username', 'isAdmin'])
                },
                process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRATION
                }
            )

            return jwtToken
        },
        async createProduct(parent, args, {
            models
        }) {
            try {
                return await models.Product.create(args)
            } catch (error) {
                errorHandler(error)
            }
        },
        async updatePriceProduct(parent, args, {
            models
        }) {
            try {
                return await models.PriceLog.create(args)
            } catch (error) {
                errorHandler(error)
            }
        },
        async updateUser(parent, args, {
            models
        }) {
            try {
                return await models.User.update(args, {
                    where: {
                        id: args.id
                    }
                })
            } catch (error) {
                errorHandler(error)
            }
        },
        async updateProduct(parent, args, {
            models
        }) {
            try {
                return await models.Product.update(args, {
                    where: {
                        id: args.id
                    }
                })
            } catch (error) {
                errorHandler(error)
            }
        },
        async deleteProduct(parent, {
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
        async createType(parent, {
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
        type: (
            parent,
            args,
            context,
            info
        ) => parent.getType()

    },
    PriceLog: {
        product: (
            parent,
            args,
            context,
            info
        ) => parent.getProduct()
    }

}

module.exports = resolvers