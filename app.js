require('dotenv').config();
global.Promise = require('bluebird');

const express = require('express');
const compression = require('compression');

const db = require('./config/db');
const errorHandler = require('./middleware/ErrorMiddleware');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(compression());
app.use(express.json());
app.use('/api', require('./routes'));
// Middleware
app.use(errorHandler);

const server = async () => {
	try {
		app.listen(PORT, console.log(`Сервер запущен на порте ${PORT}`));
		await db.sequelize
			.sync()
			.then(() => console.log('Соединение с бд установлено'))
			.catch((err) =>
				console.log(`Не удается соединиться с бд. Ошибка: ${err.message}`)
			);
	} catch (err) {
		console.log(err.message);
	}
};

server();
