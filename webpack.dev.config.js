var path=require('path');
module.exports={
    // 入口文件指向src/index.js
    entry:path.join(__dirname,'src/index.js'),
    //打包后的文件到当前目录下的dist文件夹，名为bundle.js
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js'
    },
    module:{
        rules:[{
            test:/\.js$/,
            use:['babel-loader?cacheDirectory=true'],
            include:path.join(__dirname,'src')
        }]
    }
};