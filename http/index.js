const axios = require('axios');
const ApiError = require('../error/ApiError');

exports.$purenet = axios.create({
	baseURL: '',
});

exports.checkError = (err) => {
	console.log(err.response);
	if (err.response) throw ApiError.internal(err.response.data.message);
	if (err.request) throw ApiError.internal('Неудается получить ответ с модуля');

	throw ApiError.internal('Timeout');
};
