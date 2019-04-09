const express = require('express');

const router = express.Router();
const AccountController = require('../controllers/accounts');


router.post('/', AccountController.create);

router.patch('/:accountNumber', AccountController.activate);


module.exports = router;
