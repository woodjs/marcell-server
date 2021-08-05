const express = require('express');

const router = express.Router();

router.use(require('./products.route'));
router.use(require('./user.route'));

module.exports = router;
