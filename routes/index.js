const router = require('express').Router();
const ControllerUser = require('../controllers/ControllerUser');

router.post('/', ControllerUser.login);

module.exports = router;