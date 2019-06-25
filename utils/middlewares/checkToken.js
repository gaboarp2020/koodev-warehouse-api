// Check Token Middleware
const jwt = require('jsonwebtoken')
require('dotenv').config()

// JWT_SECRET
const secret = process.env.JWT_SECRET

const checkToken = async req => {
    const token = req.headers.authorization;
    try {
        const {
            user
        } = await jwt.verify(token, secret);
        req.user = user;
    } catch (err) {
        console.log(err);
    }
    req.next();
};

module.exports = checkToken