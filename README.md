# react-Buckets
自定义一个React全家桶

## 创建一个文件目录并初始化package.json
```shell
    mkdir react-Buckets 
    npm init  
```
## 填好相关信息如图
<img src="/public/image/package.png" width="550" height="550"/>
## 安装webpack
* 需要有全局安装哦，不然一会用webpack编译时会报错的
* 关于装依赖加入package.json时，加 --save-dev表示开发环境要用的依赖，如果加 -save表示生产环境依然要用的依赖。
```shell
    npm install --save-dev webpack
```
* 手动添加webpack配置文件
```shell
    touch webpack.dev.config.js
```
* 配置文件
```js
    var path=require('path');
    module.exports={
        // 入口文件指向src/index.js
        entry:path.join(__dirname,'src/index.js'),
        //打包后的文件到当前目录下的dist文件夹，名为bundle.js
        output:{
            path:path.join(__dirname,'./dist'),
            filename:'bundle.js'
        }
    };
```
* 生成主要文件目录
```shell
    mkdir src && cd src
    touch index.js
```
* 入口文件写点内容
```js
    document.getElementById('app').innerHTML='This is my React!';
```
* 进行一个小测试
```shell
    webpack --config webpack.dev.config.js
```
## 效果如图
<img src="/public/image/webpack.png" />
* 此时发现目录下生成了 dist/bundle.js
* 我们在根目录下新建 index.html
```shell
    touch index.html
```
* 编辑index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
    <script type="text/javascript" src="./dist/bundle.js"></script>
</body>
</html>
```
* 在浏览器打开index.html
<img src="/public/image/react1.png" />


