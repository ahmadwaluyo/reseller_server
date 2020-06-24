const { Product } = require('../models');
const rupiasMaker = require('../helpers/rupiasMaker');

class ControllerProduct {
    static findAllProduct(req, res, next) {
        Product.findAll()
            .then(data => {
                if (data.length > 0) {
                    data.map(el => {
                        el.price = rupiasMaker(el.price);
                    })
                }
                return res.status(200).json(data)
            })
            .catch(err => {
                return next(err)
            })
    }

    static createProduct(req, res, next) {
        const { brand, product_name, images, stock, price, descriptions } = req.body;
        const created = { brand, product_name, images, stock, price, descriptions };
        Product.create(created)
            .then(data => {
                return res.status(201).json({
                    message: 'Product successfully created'
                })
            })  
            .catch(err => {
                return next(err);
            })
    }

    static editProduct(req, res, next) {
        const { brand, product_name, images, stock, price, descriptions } = req.body;
        const updated = { brand, product_name, images, stock, price, descriptions };
        const { id } = req.params;
        Product.update(updated, {
            where: {
                id
            },
            returning: true
        })
            .then(data => {
                return res.status(200).json(data[1][0]);
            })
            .catch(err => {
                return next(err);
            })
    }

    static deleteProduct(req, res, next) {
        const { id } = req.params;
        Product.findByPk(id)
            .then(data => {
                if (data) {
                    return Product.destroy({
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
            .then(data => {
                return res.status(200).json({
                    message: 'Product successfully deleted'
                })
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = ControllerProduct;