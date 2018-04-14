const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
	/**
	 * mode 
	 * 
	 * production 生产模式
	 * development 开发模式
	 */
	mode: 'production',
	// context: path.resolve(__dirname, ''),
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, 'build'),
		// filename: '[name].[chunkhash:8].js', // 生产环境可以使用
		filename: 'index.js',
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				test: /\.js[x]?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.css?$/,
				use: ExtractTextPlugin.extract({
					use: [ 'css-loader', 'postcss-loader' ],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.less?$/,
				use: ExtractTextPlugin.extract({
					use: [ 'css-loader', 'postcss-loader', 'less-loader' ],
					fallback: 'style-loader'
				})
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
	// devtool: 'cheap-module-source-map',
	// devtool: 'source-map',
	// devtool: false,
	// 不要遵循/打包这些模块，而是在运行时从环境中请求他们
	externals: {
		react: {
			root: 'React',
			var: 'React',
			commonjs: 'react',
			commonjs2: 'react',
			amd: 'react'
		},
		'react-dom': {
			root: 'ReactDOM',
			var: 'ReactDOM',
			commonjs: 'react-dom',
			commonjs2: 'react-dom',
			amd: 'react-dom'
		}
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'index.css'
		}),
		new CleanWebpackPlugin([ 'build' ])
		// new webpack.optimize.ModuleConcatenationPlugin()
	]
	// optimization: {
	// 	minimize: true
	// }
};
