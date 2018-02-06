var webpack = require('webpack');
// var CommonsChunk = new webpack.optimize.CommonsChunkPlugin('common.js');

//avoid react warning
var productionEnv = new webpack.DefinePlugin({
    "process.env": {
        // NODE_ENV: JSON.stringify("production")
        NODE_ENV: JSON.stringify("development")
    }
});
var path = require('path');

module.exports = {
    entry: {
        app: ['./public/src/js/router.js'],
    },
    output: {
        path: path.join(__dirname, 'public/dist/js/'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                },
                exclude: /node_modules/
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8192&name=[path][name].[ext]'
            }
        ]
    },
    plugins: [productionEnv]
};