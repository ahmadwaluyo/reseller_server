const router = require('express').Router();
const ControllerUser = require('../controllers/ControllerUser');
const handleError = require('../middlewares/handlleError');
const authentication = require('../middlewares/authentication');

router.use(handleError);
router.post('/', ControllerUser.login);
router.use(authentication);
router.post('/register', ControllerUser.register);

module.exports = router;