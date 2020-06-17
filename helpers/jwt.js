const jwt = require('jsonwebtoken');


function generateToken (token) {
    return jwt.sign(token, 'secret')
}

function verifyToken (payload) {
    return jwt.verify(payload, 'secret')
}

module.exports = {
    generateToken,
    verifyToken
}