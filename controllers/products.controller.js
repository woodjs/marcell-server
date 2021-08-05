const service = require('../services/products.service');

exports.findAllSections = (req, res, next) => {
	try {
		const sections = service.findAllSections();

		return res.status(200).json(sections);
	} catch (e) {
		return next(e);
	}
};

exports.findAllCategories = (req, res, next) => {
	try {
		const categories = service.findAllCategories();

		return res.status(200).json(categories);
	} catch (e) {
		return next(e);
	}
};

exports.findAllProducts = (req, res, next) => {
	try {
		const products = service.findAllProducts();

		return res.status(200).json(products);
	} catch (e) {
		return next(e);
	}
};

exports.findByIdProduct = (req, res, next) => {
	try {
		const { id } = req.params;
		const product = service.findByIdProduct(id);

		return res.status(200).json(product[0]);
	} catch (e) {
		return next(e);
	}
};
