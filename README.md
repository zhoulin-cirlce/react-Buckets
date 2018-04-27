# react-Buckets
自定义一个React全家桶

## 创建一个文件目录并初始化package.json
```shell
    mkdir react-Buckets 
    npm init  
```
## 填好相关信息如图
<img src="/public/image/package.png"/>

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
效果如图
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
<img src="/public/image/react1.png" height="600px"/>
* 编译优化：我们每次编译都要输那么长串的命令太难记，我们在package.json中设置命令，简化它：
```shell
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build":"webpack --config webpack.dev.config.js"
    },
```
* 运行的时候使用,此处要注意下webpack的版本，如果是4.0则会提示装webpack-cli模块
```shell
    npm run build
```

## 安装与配置babel
平时大家在项目中不管用的vue还是react,应该大多都开始用ES6或ES7的语法了吧。想必都了解如果想让浏览器可以直接识别，基本都会选用babel插件进行编译转换。下面为大家一一介绍：
* babel-core 调用Babel的API进行转码使用
* babel-loader 允许使用babel和webpack将文件转化成JavaScript
* babel-preset-es2015 将ES6解析成ES5
* babel-preset-react 解析JSX语法
* babel-preset-stage-0 解析ES7提案
那么先统一安装下
```shell
    npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0
```
安装好后，添加配置文件
```shell
    touch .babelrc
```
打开文件，对babel进行配置,注：此处stage-0是包含stage-1,stage-2,stage-3
```js
    {
        "presets":[
            "es2015",
            "react",
            "stage-0"
        ],
        "plugins":[]
    }
```
* 在webpack配置中加入babel,修改webpack.dev.config.js
在配置babel-loader模块时，将cacheDirectory=true是为了缓存编译结果，优化下次编译的。
```js
    modle:{
        rules:[{
            test:/\.js$/,
            use:['babel-loader?cacheDirectory=true'],
            include:path.join(__dirname,'src')
        }]
    }

```
* 配置好了后，对babel进行测试，修改src/index.js
```js
//使用ES6的箭头函数
var babeltest=()=>
    console.log('This is Babel Test!');
babeltest();
```
<img src="/public/image/react2.png" height="600px"/>

## 安装与配置react
* 安装
```shell
    npm install --save react react-dom
```
* 页面中引入src/index.js
```js
    import React from 'react';
    import ReactDom from 'react-dom';
    ReactDom.reader(
        <div>First React!</div>,
        document.getElementById('app')
    )
```
<img src="/public/image/react4.png" height="600px"/>
* 自定义一个组件,建好目录，我们把组件放入src/component中
```shell
    cd src
    mkdir component && cd component
    mkdir Hello && cd Hello
    touch Hello.js
```
* 进入Hello.js
```js
import React, {Component} from 'react';
export default class Hello extends Component{
    reder(){
        return(
            <div>Hello React!</div>
        )
    }
}
```
* 引用Hello.js,进入src/index.js
```js
    import React from 'react';
    import ReactDom from 'react-dom';
    import Hello from './component/Hello/Hello';
    ReactDom.reader(
        <Hello/>,
        document.getElementById('app');
    )
```
<img src="/public/image/react3.png" height="600px"/>



