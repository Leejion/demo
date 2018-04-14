const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const port = 3000;
const host = 'localhost';

module.exports = {
	/**
	 * mode 
	 * 
	 * production 生产模式
	 * development 开发模式
	 */
	mode: 'development',
	// context: path.resolve(__dirname, ''),
	entry: './demo/index.js',
	output: {
		path: path.join(__dirname, 'dist'),
		// filename: '[name].[chunkhash:8].js', // 生产环境可以使用
		filename: '[name].[hash:8].js'
		// libraryTarget: 'umd'
	},
	devServer: {
		// contentBase: path.join(__dirname, 'dist'),
		inline: true,
		hot: true,
		open: false,
		host,
		port,
		lazy: false,
		// historyApiFallback: {
		// 	rewrites: { from: /./, to: '/404.html' },
		// 	disableDotRule: true
		// },
		overlay: {
			warnings: true,
			errors: true
		},
		clientLogLevel: 'error',
		// 开启报错提示
		stats: 'errors-only',
		proxy: {
			'/': {
				// 代理地址
				// target: 'http://10.6.245.52:6500/',
				target: 'http://10.11.115.63:6500/'
				// bypass: function(req, res, proxyOptions) {
				// 	if (req.headers.accept.indexOf('html') !== -1) {
				// 		// console.log('Skipping proxy for browser request.');
				// 		return '/index.html';
				// 	}
				// }
			}
		}
	},
	// 包(bundle)应该运行的环境
	target: 'web',
	module: {
		rules: [
			{
				test: /\.js[x]?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.css?$/,
				use: [ 'style-loader', 'css-loader', 'postcss-loader' ]
			},
			{
				test: /\.less?$/,
				use: [ 'style-loader', 'css-loader', 'postcss-loader', 'less-loader' ]
			},
			{
				test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
				exclude: /favicon\.png$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1,
							name: 'assets/images/[name].[hash:8].[ext]'
						}
					}
				]
			},
			{
				test: /\.(eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[hash:8].[ext]'
						}
					}
				]
			}
		]
	},
	/**
     * devtool 选项
     * source-map 开发模式
     * eval 生产模式
     */
	devtool: 'cheap-module-eval-source-map',
	// devtool: 'eval',
	// 不要遵循/打包这些模块，而是在运行时从环境中请求他们
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
		axios: 'axios',
		'nc-lightapp-front': 'nc-lightapp-front'
	},
	resolve: {
		extensions: [ '.jsx', '.js' ],
		alias: {
			// components: path.resolve(__dirname, 'src/components/'),
			// assets: path.resolve(__dirname, 'src/assets/'),
			// containers: path.resolve(__dirname, 'src/containers/'),
			// build: path.resolve(__dirname, 'build/'),
			// src: path.resolve(__dirname, 'src/'),
			// public: path.resolve(__dirname, 'src/public/')
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './demo/index.html',
			inject: 'body',
			favicon: './demo/assets/images/favicon.png'
			// cache: true,
			// showErrors: true
		}),
		new ExtractTextPlugin({
			filename: '[name].css',
			allChunks: true
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new OpenBrowserPlugin({ url: `http://${host}:${port}` }) // 构建完成打开浏览器插件
	],
	optimization: {
		splitChunks: {
			name: 'vendor',
			chunks: 'all'
			// minChunks: chunks.length
		}
		// minimize: true
	}
};
