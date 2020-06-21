const router = require('express').Router();
const ControllerProduct = require('../controllers/ControllerProduct');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

console.log('masuk product');
router.get('/', ControllerProduct.findAllProduct);
router.use(authentication);
router.use(authorization);
router.post('/', ControllerProduct.createProduct);
router.patch('/:id', ControllerProduct.editProduct);
router.delete('/:id', ControllerProduct.deleteProduct);

module.exports = router;