const data = require('../data/products');

exports.findAllSections = () => data.sections;

exports.findAllCategories = () => data.categories;

exports.findAllProducts = () => data.goods;

exports.findByIdProduct = (id) =>
	data.goods.filter((product) => product.id === +id);
