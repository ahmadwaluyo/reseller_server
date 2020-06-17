const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');
const { decrypt } = require('../helpers/bcrypt');

class ControllerUser {
    static login (req, res, next) {
        const { username, password } = req.body;
        User.findOne({
            where: {
                username
            }
        })
            .then(foundUser => {
                const payload = {
                    id: foundUser.id,
                    username: foundUser.username,
                    phone_number: foundUser.phone_number
                }
                const token = generateToken(payload);
                if (foundUser) {
                    let verify = decrypt(password, foundUser.password);
                    if (verify) {
                        return res.status(200).json(token)
                    } else {
                        return next({
                            name: 'BadRequest',
                            errors: 'Invalid email or password'
                        })
                    }
                } else {
                    return next({
                        name: 'BadRequest',
                        errors: 'Invalid email or password'
                    })
                }
            })
            .catch(err => {
                return next({
                    name: 'NotFound',
                    errors: 'User Not found'
                })
            })
    }

    static register (req, res, next) {
        const { username, password, phone_number } = req.body;
        let created = { username, password, phone_number };
        User.findOne({
            where: {
                username
            }
        })
            .then (foundUser => {
                if (foundUser) {
                    return next({
                        name: 'Forbidden',
                        errors: { message: 'Account already in used'}
                    })
                } else {
                    return User.create(created)
                }
            })
            .then(newUser => {
                let payload = {
                    id: newUser.dataValues.id,
                    username: newUser.dataValues.username,
                    phone_number: newUser.dataValues.phone_number
                }
                return res.status(201).json(payload);
            })
            .catch(err => {
                return next(err)
            })

    }
}

module.exports = ControllerUser;