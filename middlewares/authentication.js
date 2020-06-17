const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

module.exports = (req, res, next) => {
    try {
        if(req.headers.token) {
            req.decoded = verifyToken(req.headers.token);
            User.findOne({
                where: {
                    username: req.decoded.username
                }
            })
                .then(result => {
                    if(result) {
                        return next()
                    } else {
                        return next({
                            name: 'Unauthorized',
                            errors : 'User not authenticated'
                        })
                    }
                })
                .catch(err => {
                    return next(err)
                })
        }
    }
    catch(err) {
        return next(err);
    }
}