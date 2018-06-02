const webpack = require('webpack');

module.exports = {
	entry: [
		'themes/strudel/source/js/examples.js'
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader'
				}],
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
	]
}