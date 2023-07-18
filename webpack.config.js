const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");


const isDevMode = process.env.NODE_ENV === 'development';
const isProdMode = !isDevMode;
const plugins = () => {
    const base = [new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),]

    return base
}
const filename = extension => isDevMode ? `[name].${extension}` : `[name].[hash].${extension}`;


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
        hot: isDev
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
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
        ]
    }
}