const router = require('express').Router();
const ControllerUser = require('../controllers/ControllerUser');
const handleError = require('../middlewares/handlleError');
const authentication = require('../middlewares/authentication');

console.log('masuk route');
router.post('/', ControllerUser.login);
router.use(authentication);
router.post('/register', ControllerUser.register);
router.use(handleError);

module.exports = router;