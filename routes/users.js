const router = require('express').Router();
const ControllerUser = require('../controllers/ControllerUser');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.use(authentication);
router.use(authorization);
router.get('/', ControllerUser.findAllUser);
router.get('/:id', ControllerUser.getUserById);
router.post('/register', ControllerUser.register);
router.patch('/edit/:id', ControllerUser.editUser);
router.delete('/delete/:id', ControllerUser.deleteUser);

module.exports = router;