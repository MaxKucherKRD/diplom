
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: { 
          main: './src/js/index.js' , 
          about : './src/js/about.js',
          analist :'./src/js/analist.js' 
          },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
	    {
        test: /\.css$/,
        use: [
          (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
          'css-loader', 
          'postcss-loader'
  ]
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
                'file-loader?name=./images/[name].[ext]', // указали папку, куда складывать изображения
                {
                        loader: 'image-webpack-loader',
                        options: {}
                },
              ]
       },
       {
          test: /\.(eot|ttf|woff|woff2)$/,
          loader: 'file-loader?name=./vendor/[name].[ext]'
       }
    ]
  },
  plugins: [ 
    new MiniCssExtractPlugin({filename: './styles/index.[contenthash].css'}),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
              preset: ['default'],
      },
      canPrint: true
}),
    new HtmlWebpackPlugin({ // 
        inject: false,        
        template: './src/index.html',
        filename: 'index.html'
      }),
      new HtmlWebpackPlugin({ // 
        inject: false,        
        template: './src/about.html',
        filename: 'about.html'
      }),
      new HtmlWebpackPlugin({ // 
        inject: false,        
        template: './src/analist.html',
        filename: 'analist.html'
      }),
    new WebpackMd5Hash(),
    new Webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })     
  ]
};