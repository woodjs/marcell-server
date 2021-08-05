require('dotenv').config();
const axios = require('axios');
const { sequelize, Sequelize } = require('../config/db');
const getFormData = require('../utils/objectToFromData');

exports.User = sequelize.define(
	'user',
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		userId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			unique: true,
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

exports.signup = (data) =>
	axios
		.post('https://purenet.pro/marellapi/sign_up', getFormData(data))
		.then((res) => res.data);

exports.login = (data) => {
	console.log(getFormData(data));
	return axios
		.post(
			`https://purenet.pro/marellapi/sign_in?key=${process.env.API_SECRET_KEY}`,
			getFormData(data)
		)
		.then((res) => res.data);
};

exports.changePassword = (data, userId) =>
	axios
		.post(
			`https://purenet.pro/marellapi/change_password/${userId}?key=${process.env.API_SECRET_KEY}`,
			getFormData(data)
		)
		.then((res) => res.data);

exports.confirmEmail = (token) =>
	axios
		.get(`https://purenet.pro/marellapi/verify_email/${token}`)
		.then((res) => res.data);
