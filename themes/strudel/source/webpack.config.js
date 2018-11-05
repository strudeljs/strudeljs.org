const webpack = require('webpack');

module.exports = {
	entry: [
		'themes/strudel/source/js/example.js'
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader'
				}]
			}
		]
	}
}
