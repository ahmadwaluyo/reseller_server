const router = require('express').Router();
const user = require('./users');
const product = require('./products');
const handleError = require('../middlewares/handlleError');
const ControllerUser = require('../controllers/ControllerUser');

router.post('/', ControllerUser.login);
router.use('/users', user);
router.use('/products', product);
router.use(handleError);

module.exports = router;