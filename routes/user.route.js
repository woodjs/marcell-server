const express = require('express');
const { expressYupMiddleware } = require('express-yup-middleware');

const authMiddleware = require('../middleware/auth');
const schema = require('../dtos/user.schema');
const controller = require('../controllers/user.controller');

const router = express.Router();

router.post(
	'/signup',
	expressYupMiddleware({ schemaValidator: schema.signup }),
	controller.signup
);

router.post(
	'/login',
	expressYupMiddleware({ schemaValidator: schema.login }),
	controller.login
);

router.put(
	'/confirm/email/:token',
	expressYupMiddleware({ schemaValidator: schema.tokenEmailSchema }),
	controller.confirmEmail
);

router.post(
	'/password/change',
	expressYupMiddleware({ schemaValidator: schema.changePassword }),
	authMiddleware,
	controller.changePassword
);
module.exports = router;
