const merge=require('webpack-merge');
const path=require('path');
const commonConfig=require('./webpack.common.config.js');
const devConfig={
   output:{
        //react-hot-loader不兼容，故改回[hash]
        filename:'[name].[hash].js',
   },
    module:{
        rules:[
            {
                test:/\.(less|css)$/,
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
};
module.exports=merge({
    customizeArray(a,b,key){
        if(key==='extensions'){
            return _.uniq(a,b);
        }
        return undefined;
    }
})(commonConfig,devConfig);