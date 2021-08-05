const ApiError = require('../error/ApiError');
const { referalSchema } = require('../dtos/user.schema');
const getJwt = require('../utils/getJwt');
const model = require('../models/user.model');

const { User } = model;

exports.signup = async (data) => {
	const { name, surname, email, password, referal } = data;
	const refLink = referal || 'purenet';
	const statusRefLink = await referalSchema
		.isValid({ referal: refLink.toLowerCase() })
		.then((valid) => valid);

	const sendData = {
		first_name: name,
		last_name: surname,
		email,
		password,
		partner_link: statusRefLink ? refLink : 'purenet',
		from_purchase: false,
	};

	const userData = await model.signup(sendData);
	const { exists: existEmail, success, valid, pn_id: userId } = userData;

	if (existEmail)
		throw ApiError.forbiden('Пользователь с таким Email уже зарегистрирован');

	if (!success) throw ApiError.internal('Не удалось зарегистрироваться');

	if (!valid) throw ApiError.forbiden('Данные не прошли валидацию');

	await User.create({ userId });

	return userId;
};

exports.login = async (data) => {
	const { email, password } = data;
	const sentData = {
		email,
		pass: password,
	};
	const result = await model.login(sentData);
	const { success, pn_id: userId } = result;

	if (!success) throw ApiError.forbiden('Неверный email или пароль');

	const user = await User.findOne({
		where: {
			userId,
		},
	});

	if (!user) throw ApiError.forbiden('Вы не зарегистрированы');
	const token = await getJwt({ id: user.id, userId: user.userId });
	return token;
};

exports.changePassword = async (password, newPassword, userId) => {
	const sendData = {
		old_password: password,
		new_password: newPassword,
	};

	const result = await model.changePassword(sendData, userId);

	const { success, code } = result;
	if (!success) {
		switch (code) {
			case 1:
				throw ApiError.internal('Ошибка авторизаций');
			case 2:
				throw ApiError.forbiden('Вы не зарегистрированы');
			case 3:
				throw ApiError.forbiden('Старый пароль неверный');
			default:
				throw ApiError.internal('Неизвестная ошибка сервера');
		}
	}

	return true;
};

exports.confirmEmail = async (token) => {
	const data = await model.confirmEmail(token);
	const { success } = data;

	if (!success) throw ApiError.forbiden('Почта не подтверждена');

	return true;
};
