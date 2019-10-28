let path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'jsx'),
    entry: {
        timer: './TimerPage.js',
        calculator: './CalculatorPage.js',
        login: './LoginPage.js',
    },
    devtool: 'sourcemaps',
    cache: true,
    output: {
        path: path.resolve(__dirname, '../src/main/resources/static/js/dist'),
        filename: '[name].bundle.js'
    },
    mode: process.env.NODE_ENV,
    module: {
        rules:
            [
                {
                    test: /\.js?$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    }
};