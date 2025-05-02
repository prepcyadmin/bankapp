const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/deposit', userController.deposit);
router.post('/withdraw', userController.withdraw);
router.get('/balance/:account_number', userController.getBalance);

module.exports = router;
