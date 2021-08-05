const yup = require('yup');

exports.signup = {
	schema: {
		body: {
			yupSchema: yup.object().shape({
				name: yup.string().required('Вы не указали имя'),
				surname: yup.string().required('Вы не указали фамилию'),
				email: yup
					.string()
					.email('Email некорректен')
					.required('Вы не указали email'),
				password: yup
					.string()
					.min(6, 'Пароль должен содержать более 5 символов')
					.max(20, 'Пароль не должен содержать более 20 смиволов')
					.matches(
						/^[A-Z]+[a-z]+[0-9]+$/,
						'Пароль должен содержать заглавную, маленькую латинскую букву и любую цифру'
					)
					.required('Вы не указали пароль'),
			}),
		},
	},
};

exports.login = {
	schema: {
		body: {
			yupSchema: yup.object().shape({
				email: yup
					.string()
					.email('Email некорректен')
					.required('Вы не указали email'),
				password: yup
					.string()
					.min(6, 'Пароль должен содержать более 5 символов')
					.max(20, 'Пароль не должен содержать более 20 смиволов')
					.required('Вы не указали пароль'),
			}),
		},
	},
};

exports.changePassword = {
	schema: {
		body: {
			yupSchema: yup.object().shape({
				password: yup.string().required('Вы не указали текущий пароль'),
				newPassword: yup
					.string()
					.min(6, 'Пароль должен содержать более 5 символов')
					.max(20, 'Пароль не должен содержать более 20 смиволов')
					.matches(
						/^[A-Z]+[a-z]+[0-9]+$/,
						'Пароль должен содержать заглавную, маленькую латинскую букву и любую цифру'
					)
					.required('Вы не указали новый пароль'),
			}),
		},
	},
};

exports.referalSchema = yup.object().shape({
	referal: yup
		.string()
		.min(7)
		.max(7)
		.matches(/[a-z0-9]+/),
});

exports.tokenEmailSchema = {
	schema: {
		params: {
			yupSchema: yup.object().shape({
				token: yup
					.string()
					.min(16, 'Некорректный токен')
					.max(16, 'Некорректный токен')
					.matches(/^[A-Za-z0-9]+$/, 'Некорректный токен')
					.required('Токен не передан'),
			}),
		},
	},
};
