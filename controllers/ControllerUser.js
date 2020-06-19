const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');
const { decrypt } = require('../helpers/bcrypt');

class ControllerUser {
    static login (req, res, next) {
        console.log('masuk controller login');
        const { email, username, password } = req.body;
        User.findOne({
            where: {
                email : email
            }
        })
            .then(foundUser => {
                console.log('harusnya sukses');
                const payload = {
                    id: foundUser.id,
                    email: foundUser.email,
                    username: foundUser.username,
                    phone_number: foundUser.phone_number,
                    address: foundUser.address,
                    roles: foundUser.roles,
                    business: foundUser.business
                }
                const token = generateToken(payload);
                if (foundUser) {
                    let verify = decrypt(password, foundUser.password);
                    if (verify) {
                        return res.status(200).json({
                            token,
                            data: payload
                        })
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
        const { email, username, password, phone_number, address } = req.body;
        let created = { email, username, password, phone_number, address };
        User.findOne({
            where: {
                email,
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
                    email: newUser.dataValues.email,
                    username: newUser.dataValues.username,
                    phone_number: newUser.dataValues.phone_number,
                    address: newUser.dataValues.address,
                }
                return res.status(201).json(payload);
            })
            .catch(err => {
                return next(err)
            })

    }
}

module.exports = ControllerUser;