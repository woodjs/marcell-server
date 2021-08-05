const express = require('express');
const controller = require('../controllers/products.controller');

const router = express.Router();

router.get('/sections', controller.findAllSections);
router.get('/categories', controller.findAllCategories);
router.get('/products', controller.findAllProducts);
router.get('/product/:id', controller.findByIdProduct);

module.exports = router;
