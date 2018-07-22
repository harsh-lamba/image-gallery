const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebPackPlugin = require('html-webpack-plugin');
const cleanWebPackPlugin = require('clean-webpack-plugin');

module.exports = (env, options) => {
    const devMode = options.mode !== 'production';
    return {
        entry: {
            main: './src/index.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: devMode?'app.js':'app.min.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: [
                        devMode? 'style-loader' : miniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ]
        },
        plugins: [
            new cleanWebPackPlugin('dist', {}),
            new miniCssExtractPlugin({filename: 'app.css'}),
            new htmlWebPackPlugin({
                inject: true,
                hash: true,
                template: './src/index.html',
                filename: 'index.html'
            })
        ]
    }
}