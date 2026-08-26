module.exports = {
	globDirectory: 'dist',
	globPatterns: [
		'**/*.{html,svg,jpg,png,js}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};