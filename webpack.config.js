const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const isProduction = process.argv.indexOf('--mode=production') > -1;

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'main.[hash].js',
        path: __dirname + '/dist',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: ['src/assets', 'node_modules'],
        symlinks: false
    },
    module: {
        rules: [
            { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.(png|jpe?g|gif)$/, use: ['url-loader?limit=8192&esModule=false', 'img-loader'] }, // 内联 base64 URLs, 限定 <=8k 的图片, 其他的用 URL
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?esModule=false" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?esModule=false" }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new CopyPlugin([
            { from: 'res', to: 'res' },
        ]),
        new webpack.DefinePlugin({
            DEBUG: JSON.stringify(!isProduction),
        }),
    ],
    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
        historyApiFallback: true
    }
}