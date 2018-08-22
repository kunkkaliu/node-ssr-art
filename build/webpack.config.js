/**
 * Created by liudonghui on 2018/3/6.
 */
var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

function src(dir) {
    return resolve(path.join('src', dir))
}

function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;
    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(pathDir, '') : pathname;
        entries[basename] = entry;
    }
    return entries;
}
//我们的key不是简单用的上一个代码的index,login而是用的index/index,login/login因为考虑在login目录下面还有register
//文件路径的\\和/跟操作系统也有关系，需要注意
var htmls = getEntry('./src/pages/*/*.html', 'src/pages/');
var entries = {};
var HtmlPlugin = [];
for (var key in htmls) {
    var ekey = key.split('.')[0];
    entries[key] = './src/pages/' + ekey + '/' + ekey + '.js';
    HtmlPlugin.push(new HtmlWebpackPlugin({
        filename: 'views/' + key + path.extname(htmls[key]),
        template: htmls[key],
        inject: true,
        favicon: src('favicon.ico'),
        chunks: ['manifest', 'vendor', key],
        minify: {
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeComments: true
        }
    }))
}

module.exports = {
    entry: entries,
    target: 'web',
    output: {
        path: resolve('/dist/client'),
        filename: 'static/js/[name].js',
        chunkFilename: 'static/js/[name].js',
        publicPath: '/'
    },
    plugins: [
        new webpack.ProvidePlugin({
            Zepto: "zepto",
            "window.Zepto": "zepto",
            "window.$": "zepto",
            $: "zepto"
        })
    ].concat(HtmlPlugin),
    resolve: {
        extensions: ['*', '.js'],
        alias: {
            'common': src('common'),
            'components': src('components'),
            'utils': src('utils'),
            'pages': src('pages'),
            'zepto': resolve('node_modules/webpack-zepto/index.js')
        }
    },
    module: {
        rules: [
            {
                test: /\.art$/,
                loader: 'art-template-loader',
                exclude: /node_modules/,
                include: resolve('')
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                exclude: /node_modules/,
                include: resolve('')
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: resolve('')
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: 'static/images/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: 'static/fonts/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.css?$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                }, 'postcss-loader']
            },
            {
                test: /\.less?$/,
                exclude: /node_modules/,
                use: ['style-loader', MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        modules: false,
                        localIdentName: '[local]___[hash:base64:5]'
                    }
                }, 'postcss-loader', 'less-loader']
            },
            {
                test: /\.less?$/,
                exclude: /src/,
                use: ['style-loader', MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                    }
                }, 'postcss-loader', 'less-loader']
            }
        ]
    }
};
