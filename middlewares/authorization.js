const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt');

 function authorization(req, res, next) {
    req.decoded = verifyToken(req.headers.token);
    User.findOne({
        where: {
            id: req.decoded.id
        }
    })
        .then(result => {
            if(result) {
                if(result.roles == 'admin') {
                    return next()
                } else {
                    return next({
                        name: 'Unauthorized',
                        errors: { message: 'User not authorized'}
                    })
                }
            } else {
                return next({
                    name: 'NotFound',
                    errors: { message: 'User Not Found'}
                })
            }
        })
        .catch(err => {
            return next(err)
        })
}


module.exports = authorization;