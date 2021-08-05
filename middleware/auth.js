require('dotenv').config();
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

const verifyToken = (req, res, next) => {
	const token = req.body.token || req.query.token || req.headers.authorization;

	if (!token) throw ApiError.notAuthorization('Вы не авторизованы');
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.user = decoded;
	} catch (err) {
		throw ApiError.notAuthorization('Вы не авторизованы');
	}
	return next();
};
module.exports = verifyToken;
