// Check Token Middleware
const jwt = require('jsonwebtoken')
require('dotenv').config()

// JWT_SECRET
const SECRET = process.env.JWT_SECRET

const checkToken = async req => {
    const token = req.headers.authorization || ''
    try {
        const {
            user
        } = await jwt.verify(token, SECRET)
        req.user = user
    } catch (err) {
        console.log(err)
        console.log(req.headers.authorization)
    }
    req.next()
}

module.exports = checkToken