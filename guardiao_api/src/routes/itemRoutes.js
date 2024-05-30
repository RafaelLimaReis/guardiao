const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const upload = require('../config/multer');
const authMiddleware = require('../controllers/authController');

router.post('/cadastro', authMiddleware.auth, upload.single('image'), itemController.createItem);
router.put('/cadastro', authMiddleware.auth, itemController.updateItem);
router.get('/', itemController.getItems);

module.exports = router;