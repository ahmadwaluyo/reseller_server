const router = require('express').Router();
const ControllerUser = require('../controllers/ControllerUser');
const handleError = require('../middlewares/handlleError');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.post('/', ControllerUser.login);
router.use(authentication);
router.use(authorization);
router.get('/', ControllerUser.findAllUser);
router.post('/register', ControllerUser.register);
router.patch('/edit/:id', ControllerUser.editUser);
router.delete('/delete/:id', ControllerUser.deleteUser);
router.use(handleError);

module.exports = router;