const express = require('express');

const router = express.Router();
const AccountController = require('../controllers/accounts');


router.post('/', AccountController.create);


module.exports = router;
