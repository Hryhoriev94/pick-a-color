const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDevMode = process.env.NODE_ENV === 'development';
const isProdMode = !isDevMode;

const filename = extension => isDevMode ? `[name].${extension}` : `[name].[hash].${extension}`;
const plugins = () => {
    const base = [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProdMode
            }
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ]

    return base
}


const styleLoader = extension => {
    const styleLoaders = ['style-loader', 'css-loader',]
    if(extension) styleLoaders.push(extension)
    return styleLoaders
}

const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: ['./index.ts'],
    },
    devServer: {
        port: 4200,
        hot: isDevMode
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-typescript')
                }
            },
            {
                test: /\.css$/,
                use: styleLoader(),
            },
            {
                test: /\.s[ac]ss$/,
                use: styleLoader('sass-loader', 'sass')
            },
        ]
    }
}