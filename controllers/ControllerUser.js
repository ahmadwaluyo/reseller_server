const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');
const { decrypt } = require('../helpers/bcrypt');
const kickbox = require('kickbox').client(process.env.ID_KICKBOX).kickbox();

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
                    console.log(password);
                    console.log(foundUser.password);
                    console.log(verify);
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
        const { email, username, password, phone_number, address, business } = req.body;
        let created = { email, username, password, phone_number, address, business };
        User.findOne({
            where: {
                email,
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
                // kickbox.verify(newUser.email, function (err, response) {
                //     console.log('ini kickbox');
                //     console.log(response.body);
                // });
                return res.status(201).json({
                    message: 'Successfully create mitra'
                });
            })
            .catch(err => {
                return next(err)
            })

    }

    static findAllUser (req, res, next) {
        User.findAll()
            .then(foundUser => {
                return res.status(200).json(foundUser);
            })
            .catch(err => {
                return next(err);
            })
    }

    static editUser (req, res, next) {
        const { id } = req.params;
        const { email, username, phone_number, address, business } = req.body;
        const updated = { email, username, phone_number, address, business };
        User.update(updated, {
            where: {
                id
            },
            returning: true
        })
            .then(updatedUser => {
                return res.status(200).json(updatedUser[1][0])
            })
            .catch(err => {
                return next(err)
            })
    }

    static deleteUser (req, res, next) {
        const { id } = req.params;
        User.findByPk(id)
            .then(foundUser => {
                if (foundUser) {
                    return User.destroy({
                        where: {
                            id
                        }
                    })
                } else {
                    return next({
                        name: 'NotFound',
                        errors: 'User Not found'
                    })
                }
            })
            .then(deleted => {
                return res.status(200).json({
                    message: 'Success delete user'
                })
            })
            .catch(err => {
                return next(err)
            })
    }

    static getUserById(req, res, next) {
        const { id } = req.params;
        User.findByPk(id)
            .then(foundUser => {
                res.status(200).json(foundUser)
            })
            .catch(err => {
                return next(err)
            })
    }
}


module.exports = ControllerUser;