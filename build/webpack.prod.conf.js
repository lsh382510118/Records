const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConf = require('./webpack.base.conf');
const scriptLoader = () => {
	if (process.env.USE_BABEL === 'true') {
		console.log(`USE_BABEL: `, process.env.USE_BABEL);
		return {
			test: /\.[jt]sx?$/,
			exclude: /node_modules/,
			use: [
				//   {
				//     loader: 'babel-loader',
				//     options: {
				//       presets: [
				//         [
				//           '@babel/preset-env',
				//           {
				//             targets: {
				//               android: '5.0',
				//               ios: '9.0',
				//             },
				//           },
				//         ],
				//         '@babel/preset-react',
				//       ],
				//     },
				//   },
				'ts-loader',
			],
		};
	}
	return {
		test: /\.[jt]sx?$/,
		exclude: /node_modules/,
		loader: 'esbuild-loader',
		options: {
			loader: 'tsx',
		},
	};
};
module.exports = merge(baseConf, {
	mode: 'production',
	entry: {
		app: ['babel-polyfill', './client/main.js'],
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'js/[name].[chunkhash:8].js',
		publicPath: './',
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '-',
			name: true,
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					priority: -10,
					chunks: 'all',
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
			},
		},
	},

	module: {
		rules: [
			scriptLoader(),
			{
				test: /\.less/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader', 'less-loader'],
					fallback: 'style-loader',
				}),
			},
			{
				test: /\.css/,
				use: ExtractTextPlugin.extract({
					use: 'css-loader',
					fallback: 'style-loader',
				}),
			},
		],
	},
	plugins: [
		// 单独打包css
		new ExtractTextPlugin({
			filename: '[name].[hash].css',
			allChunks: true,
		}),

		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
				API_ENV: JSON.stringify('production'),
			},
		}),

		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, '../index.html'),
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
			},
		}),

		new HtmlWebpackPlugin({
			template:
				'!!ejs-compiled-loader!' +
				path.join(__dirname, '../server.template.ejs'),
			filename: 'server.ejs',
			inject: true,
		}),
	],
});
