module.exports = {
	sections: [
		{ id: 1, name: 'Еда' },
		{ id: 2, name: 'Одежда' },
		{ id: 3, name: 'Косметика' },
	],
	categories: [{ id: 1, sectionId: 1, name: 'Печенье' }],
	goods: [
		{
			id: 1,
			categoryId: 1,
			name: 'Печенье с изюмом',
			price: 100,
			description: 'Описание',
		},
	],
};
