var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

function server(dir) {
    return resolve(path.join('server', dir))
}

module.exports = {
    entry: {
        index: server('app.prod.js')
    },
    mode: 'production',
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    output: {
        path: resolve('dist/server'),
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                MOCK: !!process.env.MOCK,
                RUN_ENV: JSON.stringify(process.env.RUN_ENV),
                CODE_ENV: JSON.stringify(process.env.CODE_ENV)
            }
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    drop_console: false
                }
            }
        })
    ],
    resolve: {
        extensions: ['*', '.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    "babelrc": false,
                    "presets": [[
                        "env", {
                            "targets": {
                                "node": "current"
                            },
                            "useBuiltIns": true,
                            "debug": false
                        }
                    ], "stage-0"],
                    "plugins": ["transform-runtime"]
                }
            },
            {
                test: /\.(less|css)$/,
                loader: 'ignore-loader'
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: '/static/images/[name].[hash:8].[ext]'
                }
            }
        ]
    },
    externals: [nodeExternals()]
};
