const service = require('../services/user.service');

exports.signup = async (req, res, next) => {
	try {
		await service.signup(req.body);

		return res.status(200).json({ message: 'Регистрация прошла успешно' });
	} catch (e) {
		return next(e);
	}
};

exports.login = async (req, res, next) => {
	try {
		const result = await service.login(req.body);
		return res
			.status(200)
			.json({ message: 'Вы успешно авторизовались', accessToken: result });
	} catch (e) {
		return next(e);
	}
};

exports.changePassword = async (req, res, next) => {
	try {
		const { userId } = req.user;
		const { password, newPassword } = req.body;
		await service.changePassword(password, newPassword, userId);
		return res.status(200).json({ message: 'Пароль успешно изменен' });
	} catch (e) {
		return next(e);
	}
};

exports.confirmEmail = async (req, res, next) => {
	try {
		const { token } = req.params;

		await service.confirmEmail(token);

		return res.status(200).json({ message: 'Вы успешно подтвердили почту' });
	} catch (e) {
		return next(e);
	}
};
