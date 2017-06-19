const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';
const LOCALHOST = 'localhost';

const cssFileName = 'style';
const jsFileName = 'bundle';

const plugins = PRODUCTION
    ? 	[
            new webpack.optimize.UglifyJsPlugin(),
            new ExtractTextPlugin(cssFileName + '.css'),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                filename: 'vendor.js',
                minChunks: function(module, count) {
                    var context = module.context;
                    return context && context.indexOf('node_modules') >= 0 || context && context.indexOf('vendor') >= 0;
                },
            }),
        ]
    : 	[
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new BundleAnalyzerPlugin(),
        ];
plugins.push(
    new webpack.DefinePlugin({
        DEVELOPMENT: JSON.stringify(DEVELOPMENT),
        PRODUCTION: JSON.stringify(PRODUCTION)
    })
);

const cssLoader = PRODUCTION
    ?	ExtractTextPlugin.extract({
            fallback: 'style-loader',
            // use: ['css-loader?minimize&url', 'sass-loader'],
            use: [
                {loader: 'css-loader', options: {minimize: true, url: true, sourceMap: false}},
                {loader: 'resolve-url-loader'},
                {loader: 'sass-loader',  options: {sourceMap: true}}
            ],
            publicPath: '/themes/custom/amcfront/'
        })
    :   [
            {loader: 'style-loader'},
            {loader: 'css-loader', options: {sourceMap: false, url: true}},
            {loader: 'resolve-url-loader'},
            {loader: 'sass-loader',  options: {sourceMap: false}}
        ];

module.exports = {
    devtool: 'cheap-module-source-map',
    externals: {
        // external library that available globally via script tag or Drupal core
        jQuery: 'jQuery',
        $: 'jQuery',
        jquery: 'jQuery'
    },
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: PRODUCTION ? jsFileName+ '.min.js' : jsFileName + '.js',
        publicPath: PRODUCTION ? '/' : 'http://' + LOCALHOST + ':9000/dist/'
    },
    module: {
        rules: [
            {
                test:   /\.scss$/,
                use: cssLoader
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        limit: 1,
                        name: '[path][name].[ext]?[hash:5]',
                    }
                }
            },
            // { babel-loader breaks hot reload
            //     test: /\.js$/,
            //     exclude: /(node_modules)/,
            //     loader: 'babel-loader',
            //     query: {
            //         presets: ['es2015']
            //     }
            // }
        ],
        noParse: /src\/js\/vendor/,
    },
    plugins: plugins,
    devServer: {
        // host: LOCALHOST,
        contentBase: 'dist',
        inline: true,
        stats: 'errors-only',
        hot: true,
        port: 9000,
        headers: { 'Access-Control-Allow-Origin': '*' },
    }
}