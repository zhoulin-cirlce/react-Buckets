var path=require('path');
module.exports={
    // 入口文件指向src/index.js
    entry:[
        'react-hot-loader/patch',
        path.join(__dirname,'src/index.js')
    ],
    //打包后的文件到当前目录下的dist文件夹，名为bundle.js
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js'
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
            }
        ]
    },
    devServer: {
        port: 8000,
        contentBase: path.join(__dirname, './dist'),
        // historyApiFallback: true
        
    },
    devtool:"inline-source-map",
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