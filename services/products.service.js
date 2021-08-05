const model = require('../models/products.model');
const ApiError = require('../error/ApiError');

exports.findAllSections = () => model.findAllSections();

exports.findAllCategories = () => model.findAllCategories();

exports.findAllProducts = () => model.findAllProducts();

exports.findByIdProduct = (id) => {
	const product = model.findByIdProduct(id);

	if (product.length === 0) throw ApiError.notFound('Такого продукта нет');

	return product;
};
