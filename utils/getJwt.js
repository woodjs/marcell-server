require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateAccessToken = (data) =>
	jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });

module.exports = generateAccessToken;
