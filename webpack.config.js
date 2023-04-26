const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
// const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, options) => {
	const isProduction = options.mode === 'production'

	let config = {
		entry: ['./src/index.js', './src/sass/main.scss'],
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'index.js',
			clean: {
				keep(asset) {
					return asset.includes('static');
				},
			},
		},
		module: {
			rules: [
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								['@babel/preset-env']
							]
						}
					}
				},
				{
					test: /\.(svg|png|jpg|gif)$/,
					type: 'asset/resource',
					generator: {
					filename: 'static/[hash][ext][query]'
					}
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						// Creates `style` nodes from JS strings
						"style-loader",
						// Translates CSS into CommonJS
						"css-loader",
						// Compiles Sass to CSS
						"sass-loader",
					],
				},
				{
					test: /\.html$/i,
					loader: "html-loader",
				},
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: 'src/index.html'
			}),
            // new CopyPlugin({
				// patterns: [
					// { 
						// from: "src/js/layout.json",
						// to: "static", 
					// },
				// ],
			// }),
		],
	}

	if (!isProduction) {
		config.devtool = 'source-map'
	}
	return config
}