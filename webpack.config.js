var path=require('path');
const merge=require('webpack-merge');
var webpack=require('webpack');
const UglifyJSPlugin=require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin=require('clean-webpack-plugin');
const ExtractTextPlugin=require("extract-text-webpack-plugin");
const commonConfig=require('./webpack.common.config.js');
const proConfig={
    module:{
        rules:[
            {
                test:/\.(less|css)$/,
                use:[
                    'style-loader',
                    {loader:'css-loader',options:{importLoaders:1}},
                    { loader: 'less-loader', options: { strictMath: true, noIeCompat: true } }
                ]
            },
            {
                test:/\.(css|less)$/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:["css-loader","less-loader"]
                })
            }

        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV':JSON.stringify('production')
            }
        }),
        new UglifyJSPlugin(),
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin({
            filename:'[name].[contenthash:5].css',
            allChunks:true
        })
        
    ],
    devtool:"cheap-module-source-map",
};
module.exports=merge(commonConfig,proConfig);