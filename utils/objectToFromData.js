module.exports = (object) =>
	Object.entries(object)
		.map((x) => `${x[0]}=${encodeURIComponent(x[1])}`)
		.join('&');
