var path=require('path');
var HtmlWebpackPlugin=require('html-webpack-plugin');
var webpack=require('webpack');
module.exports={
    // 入口文件指向src/index.js
    entry:{
        app:[
            'react-hot-loader/patch',
            path.join(__dirname,'src/index.js')
        ],
        vendor:['react','react-router-dom','redux','react-dom','react-redux']
    },
    //打包后的文件到当前目录下的dist文件夹，名为bundle.js 
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'[name].[chunkhash].js',
        chunkFilename:'[name].[chunkhash].js'
    },
    module:{
        rules:[
            { 
                test:/\.js$/,
                use:['babel-loader?cacheDirectory=true'],
                include:path.join(__dirname,'src')
            },{
                test:/\.less$/,
                use:[
                    'style-loader',
                    {loader:'css-loader',options:{importLoaders:1}},
                    { loader: 'less-loader', options: { strictMath: true, noIeCompat: true } }
                ]
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:8192
                    }
                }]
            }

        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:path.join(__dirname,'src/index.html')
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'mainfest'
        })
        
    ],
    devtool:"cheap-module-source-map",
    resolve:{
        alias:{
            pages:path.join(__dirname,'src/pages'),
            component:path.join(__dirname,'src/component'),
            router:path.join(__dirname,'src/router'),
            actions:path.join(__dirname,'src/redux/actions'),
            reducers:path.join(__dirname,'src/redux/reducers'),
            // redux:path.join(__dirname,'src/redux') 与模块重名
        }
    }
};