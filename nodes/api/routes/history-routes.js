const express = require('express');
const router = express.Router();
//const login = require('../middleware/auth');

const historyController = require('../controllers/history-controller');

router.get('/history/:nome', historyController.getHistories);
//router.post('/', auth.required, CategoriesController.postCategory);

module.exports = router;