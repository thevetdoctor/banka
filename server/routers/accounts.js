const express = require('express');

const router = express.Router();
const { AccountController } = require('../controllers/accounts');


router.post('/', AccountController.create);

router.patch('/:accountNumber', AccountController.activate);

router.delete('/:accountNumber', AccountController.delete);

router.get('/', AccountController.list);

router.get('/:accountNumber', AccountController.listOne);


module.exports = router;
