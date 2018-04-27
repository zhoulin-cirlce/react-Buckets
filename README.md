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
* 我们在dist目录下新建 index.html
```shell
    touch ./dist/index.html
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
    <script type="text/javascript" src="./bundle.js"></script>
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

## 路由配置react-router
* 安装与目录新建
```shell
    npm install --save react-router-dom
    cd src
    mkdir router && touch router/router.js
```
* 打开router.js,配置home和about页面
```js
    import React from 'react';
    import {BrowserRoter as Router,Route,Swith,Link} from 'react-router-dom';
    import Home from '../pages/Home/Home';
    import Page1 from '../pages/About/About';

    const getRouter=()=>(
        <Router>
            <div>
                <ul>
                    <li><Link to="/">首页</Link></li> 
                    <li><Link to="/about">About</Link></li> 
                </ul>
                <Switch>
                    <Route exact path="/" componen={Home} />
                    <Route path="/about" component={About}/>
                </Switch>
            </div>
        </Router>
    );
    export default getRouter;
```
* 新建好组件文件目录
```shell
cd src
mkdir pages && cd pages
mkdir Home && touch Home/Home.js
mkdet About && touch About/About.js
```
* 打开Home.js,定义内容
```js
    import React,{Component} from 'react';
    export default class Home extends Component{
        render(){
            return(
                <div>
                    <h1>欢迎来到我的网站</h1>
                    <p>这是一个首页</p>
                </div>
            )
        }
}

```
* 打开About.js,定义内容
```js
    import React,{Component} from 'react';
    export default class About extends Component{
        render(){
            return(
                <div>
                    <h2>关于我们</h2>
                    <p>自定义react全家桶</p>
                </div>
            )
        }
    }
```
* 在入口文件src/index.js，引入Router
```js
    import React from 'react';
    import ReactDom from 'react-dom';
    import getRouter from './router/router';
    ReactDom.render(
        getRouter(),
        document.getElementById('app')
    )
```
* 编译下，效果如图
```shell
    npm run build
```
<img src="/public/image/react5.png" height="600px"/>

我们发现页面是出来了，但是点击切换不了路由，原因是因为我们需要配置一个web服务器来指向index.html，在这里我们来配置一个webpack-dev-server。

## web服务器配置 webpack-dev-server
webpack-dev-server是我们做前后端分离时，常会用到的依赖，它是一个小型的静态文件服务器，可以为webpack打包后生成的文件提供web服务器功能。
* 安装,这个和webpack一样，要有全局安装才行。
```shell
    npm install webpack-dev-server@2 --save-dev
```
* 修改配置文件webpack.dev.config.js
```js
    devServer:{
        //将服务器根目录指向打包后的dist文件，默认是指向项目的根目录
        contentBase:path.join(__dirname,'./dist');
    }
```
* 测试
```shell
    webpack-dev-server --config webpack.dev.config.js
```
打开http://localhost:8080
<img src="/public/image/react6.gif" height="600px"/>

8080是默认端口，可更改配置。同样，我们把编译命令优化下：
```js
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "webpack --config webpack.dev.config.js",
        "start": "webpack-dev-server --config webpack.dev.config.js --color --progress"
    },
```
* 小贴示：可以试试打开浏览器后，去删除dist/bundle.js哦，是不是页面依然可以打开呢，因为webpack-dev-server编译后会缓存在内存中！

#####  附webpack-dev-server 基本配置
1.  color : 打印日志为彩色
2.  progress : 日志显示进度
3.  historyApiFallback : 值为Boolean，设为true时，作意404的请求路径，会指向index.html
4.  host : 默认为loaclhost，可以设为IP地址，局域网内用其它设备IP访问
5.  port : 端口号，默认为8080
6.  proxy : 代理，比如后端交互的服务器地址为localhost:9000,设置如下
```js
    proxy:{
        "/api":"htpp://localhost:9000"
    }
```




