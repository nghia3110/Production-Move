const express = require('express');

const router = express.Router();
const UserController = require('../controllers/User.Controller');
const verifyToken = require('../middleware/AuthMiddleware');
const verifyAdmin = require('../middleware/AuthMiddleware');

router.get('/', UserController.getAllUser);
router.get('/profile', verifyToken , UserController.getUserProfile);
router.put('/:id', verifyToken ,UserController.updateUser);
router.delete('/:id', verifyAdmin , UserController.deleteUser);
router.post('/create', UserController.create);
router.post('/login', UserController.login);

module.exports = router;