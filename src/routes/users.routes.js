const router = require('express').Router();
const {getUserInfo, getAllUser, register} = require('../controllers/users.controller')

router.get('/', (getAllUser));
router.get('/:username', (getUserInfo));
router.post('/', (register));

module.exports = router;