# react-Buckets
自定义一个React全家桶

## 目录
* [初始文件创建](#1)
* [安装webpack](#2)
* [安装与配置babel](#3)
* [安装与配置react](#4)
* [路由配置react-router](#5)
* [web服务器配置](#6)

<h2 id="1"> 创建一个文件目录并初始化package.json </h2>
```shell
    mkdir react-Buckets 
    npm init  
```
## 填好相关信息如图
<img src="/public/image/package.png"/>

<h2 id="2"> 安装webpack</h2>

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

<h2 id="3"> 安装与配置babel</h2>
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

<h2 id="4"> 安装与配置react </h2>
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

<h2 id="5"> 路由配置react-router </h2>
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

<h2 id="6"> web服务器配置 webpack-dev-server</h2>
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

## 热更新
我们在实际开发时，都有用到热更新，在修改代码后，不用每次都重启服务，而是自动更新。并而不是让浏览器刷新，只是刷新了我们所改代码影响到的模块。
关于热更新的配置，可看介绍[戳这里](https://doc.webpack-china.org/guides/hot-module-replacement/#%E9%80%9A%E8%BF%87-node-js-api)

<img src="/public/image/react8.png" height="600px"/>

因为我们用了webpack-dev-server，我们可以不需要向上图一样配置，只需要修改启动配置以修改默认值,--hot项。
```shell
    "start": "webpack-dev-server --config webpack.dev.config.js --color --progress --hot"
```
然后要做的是当模块更新后，通知入口文件index.js。我们看官网的教程配置
<img src="/public/image/react7.png" height="600px"/>

打开src/index.js，如上图配置
```js
import React from 'react';
import ReactDom from 'react-dom';
import getRouter from './router/router';

if(module.hot){
    module.hot.accept();
}
ReactDom.render(
    getRouter(),
    document.getElementById?('app');
)
```
下面来试试重启后，修改Home或About组件，保存后是不是自动更新啦！
<img src="/public/image/react9.png" height="300px"/>

到这里，你以为结束了吗，NO!NO!NO!在此我们成功为自己挖下了坑（说多了都是泪）。献上一段demo
src/pages/Home/Home.js
```js
import React,{Component} from 'react';
export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            count:0
        }
        
    }
    _test(){
        this.setState({
            count:++this.state.count
        });
    }
    render(){
        return(
            <div>
                <h1>当前共点击次数为：{this.state.count}</h1>
                <button onClick={()=> this._test()}>点击我！</button>
            </div>
        )
    }
}
```
此时，按钮每点击一次，状态会自增，但是如果我们用热更新改一下文件，会发现，状态被清零了！！！显然这不是我们要的效果，那么我们平时在项目里为什么会用到react-hot-loader就明了了，因为可以保存状态。试试：
安装依赖
```shell
npm install react-hot-loader --save-dev
```
按[官网](https://www.npmjs.com/package/react-hot-loader)介绍来配置
* 首先是.babelrc文件
```
{
    "plugins":["react-hot-loader/babel"]
}
```
* 修改 webpack.dev.config.js
```js
    entry:[
        'react-hot-loader/patch',
        path.join(__dirname,'src/index.js')
    ]
```
* 修改src/index.js
```js
import React from 'react';
import ReactDom from 'react-dom';
import getRouter from './router/router';
import {AppContainer} from 'react-hot-loader';

const hotLoader = RootElement => {
    ReactDom.render(
        <AppContainer>
            {RootElement}
        </AppContainer>,
        document.getElementById('app')
    );
}
/*初始化*/
hotLoader(getRouter());

if(module.hot){
    module.hot.accept('./router/router',()=>{
        const getRouter=require('./router/router').default;
        hotLoader(getRouter());
    }); 
}


 
```
哇哦哇哦，成功保存状态啦，666!

## 路径的优化
上面的demo我们已经写过好几个组件了，发现在引用的时候都要用上相对路径，这样非常不方便。我们可以优化一下。    
我们以前做数学题总会寻找一些共同点提出来，这里也一样。我们的公共组件都放在了src/component文件目录下，业务组件都放在src/pages目录下。在webpack中，提供一个别名配置，让我们无论在哪个位置下，都通过别名从对应位置去读取文件。 
修改webpack.dev.config.js
```js
resolve:{
    alias:{
        pages:path.join(__dirname,'src/pages'),
        component:path.join(__dirname,'src/component'),
        router:path.join(__dirname,'src/router')
    }
}
```
然后按下面的形式改掉之前的路径
```js
/*之前*/
import Home from '../pages/Home/Home';
/*之后*/
import Home from 'pages/Home/Home';
```
看下改了路径后，是不是依然可以正常运行呢！

## Redux
如果用react做过项目的，基本对redux就不陌生了吧。此文主讲全家桶的搭建，在此我就不详细解说。简单说下引用，做个小型计数器。
* 安装
```shell
npm install --save redux
```
* 相关目录搭建
```shell
cd src
mkdir redux && cd redux
mkdir actions
mkdir reducers
touch reducer.js
touch store.js
touch actions/counter.js
touch reducers/counter.js
```
* 增加文件的别名
打开webpack.dev.config.js
```js
alias:{
    ...
    actions:path.join(__dirname,'src/redux/actions'),
    reducers:path.join(__dirname,'src/redux/reducers'),
    //redux:path.join(__dirname,'src/redux') 与模块重名
}
```
* 创建action，action是来描述不同的场景，通过触发action进入对应reducer
打开文件src/redux/actions/counter.js
```js
export const INCREMENT = "counter/INCREMENT";
export const DECREMENT = "counter/DECREMENT";
export const RESET = "counter/RESET";

export function increment(){
    return {type:INCREMENT}
}
export function decrement(){
    return {type:DECREMENT}
}
export function reset(){
    return {type:RESET}
}
```
* 接下来写reducers，用来接收action和旧的state,生成新的state
src/redux/reducers/counter.js
```js
import {INCREMENT,DECREMENT,RESET} from '../actions/counter';
const initState = {
    count : 0
};

export default function reducer(state=initState,action){
    switch(action.type){
        case INCREMENT:
            return {
                count:state.count+1
            };
        case DECREMENT:
            return {
                count:state.count-1
            };
        case RESET:
            return {
                count:0
            };
        default:
            return state
    }
}
```
* 将所有的reducers合并到一起
src/redux/reducers.js
```js
import counter from './rdeducers/counter';
export default function combineReducers(state={},action){
    return {
        counter:counter(state.counter,action)
    }
}
```
* 创建store仓库，进行存取与监听state的操作
1. 应用中state的保持
2. getState()获取state
3. dispatch(action)触发reducers,改变state
4. subscribe(listener)注册监听器    
打开src/redux/store.js
```js
import {createStore} from 'redux';
import combineReducers from './reducers.js';
let store = createStore(combineReducers);
export default store;
```
* 测试
```shell
cd src 
cd redux
touch testRedux.js
```
打开src/redux/testRedux.js
```js
import {increment,decrement,reset} from './actions/counter';
import store from './store';
//初始值
console.log(store.getState());
//监听每次更新值
let unsubscribe = store.subscribe(() =>
    console.log(store.getState())
);
//发起action
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(reset());
//停止监听
unsubscribe();
```
在当前目录下运行
```shell
webpack testRedux.js build.js
node build.js
```
我这里报如下错误了
<img src="/public/image/react10.png" height="500px"/>

经排查，发现是node版本的问题，我用[nvm](https://github.com/creationix/nvm)来作node版本管理工具，从原本的4.7切换到9.0的版本，运行正确。
<img src="/public/image/react11.png" height="200px"/>

我们试用了一下redux，对于在项目熟用的童鞋来说，简直是没难度吧。那么回归正题，我们用redux搭配着react一起用。将上述counter改成一个组件。
* 文件初始化搭建
```shell
cd src/pages
mkdir Counter
touch Counter/Counter.js
```
打开文件
```js
import React,{Component} from 'react';
export default class Counter extends Component{
    render(){
        return(
            <div>
                <h2>当前计数为：</h2>
                <button onClick={
                    ()=>{
                        console.log('自增')；
                    }
                }>自增
                </button>
                <button onClick={()=>{
                    console.log('自减');
                }}>自减
                </button>
                <button onClick={()=>{
                    console.log('重置')
                }}>重置
                </button>
            </div>
        )
    }
}
```
* 路由增加
router/router.js
```js
import Home from 'pages/Home/Home';
import About from 'pages/About/About';
import Counter from 'pages/Counter/Counter';

const getRouter=()=>(
    <Router>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="counter">Counter</Link></li>
            </ul>
        
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/counter" component={Counter}/>
            </Switch>
        </div>
    </Router>

);
export default getRouter;
```
我们可以先跑一下，检查路由跳转是否正常。下面将redux应用到Counter组件上。
#### react-redux
* 安装 react-redux
```shell
npm install --save react-redux
```
* 组件的state绑定
因为react-redux提供了connect方法，接收两个参数。
1. mapStateToProps：把redux的state,转为组件的Props;
2. mapDispatchToprops:触发actions的方法转为Props属性函数。
connect()的作用有两个：一是从Redux的state中读取部分的数据，并通过props把这些数据返回渲染到组件中；二是传递dispatch(action)到props。
打开 src/pages/Counter/Counter.js
```js
import React,{Component} from 'react';
import {increment,decrement,reset} from 'actions/counter';
import {connect} from 'react-redux';
class Counter extends Component{
    render(){
        return(
            <div>
                <h2>当前计数为：{this.props.counter.count}</h2>
                <button onClick={()=>{
                    this.props.increment()
                }}>自增</button>
                <button onClick={()=>{
                    this.props.decrement()
                }}>自减</button>
                <button onClick={()=>{
                    this.props.reset()
                }}>重置</button>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        counter:state.counter
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        increment:()=>{
            dispatch(increment())
        },
        decrement:()=>{
            dispatch(decrement())
        },
        reset:()=>{
            dispatch(reset())
        }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Counter);
```
* 调用的用的时候到src/index.js中，我们传入store
注：我们引用react-redux中的Provider模块，它可以让所有的组件能访问到store，不用手动去传，也不用手动去监听。
```js
...
import {Provider} from 'react-redux';
import store from './redux/store';
 
const hotLoader = RootElement => {
    ReactDom.render(
        <AppContainer>
            <Provider store={store}>
                {RootElement}
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    );
}
...
```
然后我们运行下，效果如图
<img src="/public/image/react12.gif" height="600px"/>

#### 异步action
在实际开发中，我们更多的是用异步action,因为要前后端联合起来处理数据。
正常我们去发起一个请求时，给用户呈现的大概步骤如下：
1. 页面加载，请求发起，出现loading效果
2. 请求成功，停止loading效果，data渲染
3. 请求失败，停止loading效果，返回错误提示。

下面我们模拟一个用户信息的get请求接口:  
* 创建文件
```shell
cd dist
mkdir api && cd api
touch userInfo.json
```
* 打开文件模拟数据
```js
{
    "name":"circle",
    "age":24,
    "like":"piano",
    "female":"girl"
}
```
* 创建action
```shell
cd src/redux/actions
touch userInfo.js
```
在action中，我要需要创建三种状态：请求中，请求成功，请求失败。打开redux/actions/userInfo.js
```js
export const GET_USERINFO_REQUEST="userInfo/GET_USERINFO_REQUEST";
export const GET_USERINFO_SUCCESS="userInfo/GET_USERINFO_SUCCESS";
export const GET_USERINFO_FAIL="userInfo/GET_USERINFO_FAIL";

export function getUserInfoRequest(){
    return {
        type:GET_USERINFO_REQUEST
    }
}
export function getUserInfoSuccess(userInfo){
    return{
        type:GET_USERINFO_SUCCESS,
        userInfo:userInfo
    }
}
export function getUserInfoFail(){
    return{
        type:GET_USERINFO_FAIL
    }
}
```
* 创建reducer
```shell
cd src/redux/reducers
touch userInfo.js
```
打开文件
```js
import {GET_USERINFO_REQUEST,GET_USERINFO_SUCCESS,GET_USERINFO_FAIL} from 'actions/userInfo';

const initState = {
    isLoading:false,
    userInfo:{},
    errMsg:''
}

export default function reducer(state=initState,action){
    switch(action.type){
        case GET_USERINFO_REQUEST:
            return{
                ...state,
                isLoading:true,
                userInfo:{},
                errMsg:''
            }
        case GET_USERINFO_SUCCESS:
            return{
                ...state,
                isLoading:false,
                userInfo:action.userInfo,
                errMsg:''
            }
        case GET_USERINFO_FAIL:
            return{
                ...state,
                isLoading:false,
                userInfo:{},
                errMsg:'请求出错'
            }
        default:
            return state;
    }
}
```
以上...state的意思是合并新旧的所有state可枚举项。   
* 与之前做计数器一样，接下来到src/redux/reducers.js中合并。
```js
import counter from 'reducers/counter';
import userInfo from 'reducers/userInfo';

export default function combineReducers(state = {}, action) {
    return {
        counter: counter(state.counter, action),
        userInfo:userInfo(state.userInfo,action)
    }
}
```
redux中提供了一个combineReducers函数来合并reducer,不需要我们自己写合并函数，在此我们对上面的reducers.js作下优化。
```js
import counter from 'reducers/counter';
import userInfo from 'reducers/userInfo';
import {combineReducers} from 'redux';

export default combineReducers({
    counter,
    userInfo
});
```
* 接下来发起请求
打开文件 src/redux/actions/userInfo.js,加入
```js
...
export function getUserInfo(){
    return function(dispatch){
        dispatch(getUserInfoRequest());
        return fetch('http://localhost:8000/api/userInfo.json')
            .then((response=>{
                return response.json()
            }))
            .then((json)=>{
                dispatch(getUserInfoSuccess(json))
                }
            ).catch(()=>{
                dispatch(getUserInfoFail());
                }
            )
    }
}
```
之前我们做计数器时，与之对比现发action都是返回的对象，这里我们返回的是函数。    
为了让action可以返回函数，我们需要装新的依赖redux-tuhnk。它的作用是在action到reducer时作中间拦截，让action从函数的形式转为标准的对象形式，给reducer作正确处理。
```shell
npm install --save redux-thunk
```
* 引入redux-thunk,打开src/redux/store.js
我们可以使用Redux提供的applyMiddleware方法来使用一个或者是多个中间件，将它作为createStore的第二个参数传入即可。
```js
import {createStore,applyMiddleware} from 'redux';
import combineReducers from './reducers.js';
import thunkMiddleware from 'redux-thunk';

let store = createStore(combineReducers,applyMiddleware(thunkMiddleware));

export default store;
```
到这里我们基本的redux就搞定啦，下面写个组件来验证。
```shell
cd src/pages
mkdir UserInfo && cd UserInfo
touch UserInfo.js
```
打开文件
```js
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getUserInfo} from "actions/userInfo";

class UserInfo extends Component{
    render(){
        const{userInfo,isLoading,errMsg} = this.props.userInfo;
        return(
            <div>
                {
                    isLoading ? '请求中...' : 
                    (
                        errMsg ? errMsg :
                            <div>
                                <h2>个人资料</h2>
                                <ul>
                                    <li>姓名：{userInfo.name}</li>
                                    <li>年龄：{userInfo.age}</li>
                                    <li>爱好：{userInfo.like}</li>
                                    <li>性别：{userInfo.female}</li>
                                </ul>
                            </div>
                    )
                }
                <button onClick={
                    ()=> this.props.getUserInfo()
                }>查看个人资料</button>
            </div>
        )
    }
}
export default connect((state)=>({userInfo:state.userInfo}),{getUserInfo})(UserInfo);
```
* 配置路由，src/router/router.js
```js
...
import React from 'react';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import Home from 'pages/Home/Home';
import About from 'pages/About/About';
import Counter from 'pages/Counter/Counter';
import UserInfo from 'pages/UserInfo/UserInfo';

const getRouter=()=>(
    <Router>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="counter">Counter</Link></li>
                <li><Link to="userinfo">UserInfo</Link></li>
            </ul>
        
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/counter" component={Counter}/>
                <Route path="/userinfo" component={UserInfo}/>
            </Switch>
        </div>
    </Router>

);
export default getRouter;

```
* 运行效果如下
<img src="/public/image/react13.gif" hieght="600px"/>

## Source Maps
当javaScript抛出异常时，我们会很想知道它发生在哪个文件的哪一行。但是webpack 总是将文件输出为一个或多个bundle，我们对错误的追踪很不方便。Source maps试图解决这一个问题，我们只需要改变一下配置项即可。
在webpack.dev.config.js中加入：
```js
devtool:"inline-source-map"
```
## css编译
* 这里以less-loader为例，先安装
1. less-loader 是组件中可以引入less后缀的文件
2. css-loader 是使css文件可以用@import和url(...)的方法实现require；
3. style-loader 使计算后的样式加入到页面中。
```shell
npm install --save-dev less-loader less css-loader style-loader
```
* 配置webpack.dev.config.js文件
```js
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
                    'less-loader'
                ]
            }
        ]
    },
```
测试下
```shell
cd src/pages/Home
touch Home.less
```
打开 Home.less
```css
.wrap{
    width:300px;
    height:300px;
    background:red;
    & .content{
        width:200px;
        height:200px;
        margin:auto;
        background:yellow;
    } 
 }
```
在Home.js中引入，并添加class
```js
import './Home.less'
...
  render(){
        return(
            <div>
                <h1>当前共点击次数为：{this.state.count}</h1>
                <button onClick={()=> this._test()}>点击我！</button>
                <div className="wrap">
                    <div className="content"></div>
                </div>
            </div>
        )
    }
```
因为添加了新的依赖，我们重新跑一次npm run start,效果如图
<img src="/public/image/react14.png" hieght="600px"/>

## 图片编译
先进行一个测试,打开src/Pages/UserInfo/UserInfo.js
```js
import imgSrc from '../../../public/image/react15.png'
    ...
    <h2>个人资料</h2>
    <img src={imgSrc}/>
```
运行后，页面报错
<img src="/public/image/react16.png" hieght="600px"/>

出现这个错误是因为打包后的文件找不到我们之前写好的相对路径。对此，我们可以用如下方式解决。
首先我们要安装两个依赖：
* file-loader 当我们写样式比如背景图片，我们的路径是相对于当前文件的，但webpack最终会打包成一个文件。打包后的相对路径会找不到对应文件。这时，file-loader可以帮我们找到正确的文件路径。
* url-loader 如果图片过多，会增加过多的http请求，url-loader提示图片base64编码服务，设定limit参数，小于设置值的图片会被转为一串字符，只需将字符打包到文件中，就能访问图片了。
```shell
npm install --save-dev url-loader file-loader
```
在webpack.dev.config.js增加配置
```js
module:{
        rules:[
            ...
            {
                test:/\.(png|jpg|gif)$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        // 设置为小于8K的大小
                        limit:8192
                    }
                }]
            }
        ]
}
```
配置成功后，我们重新运行npm run start(因为新加了依赖要重新跑一次服务)，看下效果（PS：盗用大幂幂的照片^_^）
<img src="/public/image/react17.png" hieght="600px"/>

## 按需加载
我们打包后，页面统一生成bundle.js，当我们进入Home页面时，因为加载的文件过多会导致页面慢。我们想要达到跳转到对应页面时按需加载文件的效果，就需要用到bundle-loader。
* 安装
```shell
npm install bundle-loader --save
```
* 在router下新建Bundle.js
```shell
cd src/router
touch Bundle.js
```
打开Bundle.js，根据[示例](https://reacttraining.com/react-router/web/guides/code-splitting)
```js
import React,{Component} from 'react'
class Bundle extends Component{
    state={
        mod:null
    };
    componentWillMount(){
        this.load(this.props)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.load !== this.props.load){
            this.load(nextProps)
        }
    }
    load(props){
        this.setState({
            mod:null
        });
        props.load((mod)=>{
            this.setState({
                mod:mod.default ? mod.default : mod
            })
        })
    }
    render(){
        return this.props.children(this.state.mod)
    }
}
export default Bundle;
```
* 路由配置改造，src/router/router.js
```js
import React from 'react';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';

import Home from 'bundle-loader?lazy&name=home!pages/Home/Home';
import About from 'bundle-loader?lazy&name=page1!pages/About/About';
import Counter from 'bundle-loader?lazy&name=counter!pages/Counter/Counter';
import UserInfo from 'bundle-loader?lazy&name=userInfo!pages/UserInfo/UserInfo';
const Loading = function(){
    return <div>Loading...</div>
};
const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Componet) => Component ? <Component {...props} /> : <Loading/>
        }
    </Bundle>
);
const getRouter=()=>(
    <Router>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="counter">Counter</Link></li>
                <li><Link to="userinfo">UserInfo</Link></li>
            </ul>
        
            <Switch>
                <Route exact path="/" component={createComponent(Home)}/>
                <Route path="/about" component={createComponent(About)}/>
                <Route path="/counter" component={createComponent(Counter)}/>
                <Route path="/userinfo" component={createComponent(UserInfo)}/>
            </Switch>
        </div>
    </Router>

);
export default getRouter;
```
* 修改webpack.dev.config.js配置，使打包输出的文件名对应
```js
output:{
    path:path.join(__dirname,'./dist'),
    filename:'bundle.js',
    chunkFilename:'[name].js'
}
```
运行npm run start 效果如图  
<img src="/public/image/react18.gif" hieght="600px"/>

## 缓存
按需加载文件的进阶优化则是文件缓存。缓存我们要解决以下两个问题：
1. 当用户首次访问Home.js时，进行文件的加载，第二次访问时再进行同样文件的加载吗？
2. 当文件做了缓存时，我们如果有改动代码，重新打包，我们要如何更新缓存的文件？
问题1在浏览器中已经对静态资源文件做了缓存，我们主要解决问题二。
日常开发中，我们是通过打包修改文件名（比如加hash），使客户端能识别新的文件，重新加载。
打开webpack.dev.config.js
```js
output:{
    path:path.join(__dirname,'./dist'),
    filename:'[name].[hash].js',
    chunkFilename:'[name].[chunkhash].js'
}
```
我们可以看到编译后的文件名已经变了
<img src="/public/image/react19.png" hieght="300px"/>

由于我们在dist/index.html中引用的还是bundle.js，所以我们要改成每次编译后自动插入到index.html中，可以用到HtmlWebpackPlugin。
* 安装
```shell
npm install html-webpack-plugin --save-dev
```
* 新建入口模板文件index.html
```shell
cd src
touch index.html
```
* 打开index.html
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
</body>
</html>
```
* 修改webpack.dev.config.js配置文件
```js
var HtmlWebpackPlugin=require('html-webpack-plugin');
...
plugins:[new HtmlWebpackPlugin({
    filename:'index.html',
    template:path.join(__dirname,'src/index.html')
})],
```
此时删掉之前的dist/index.html,运行npm run start访问正常。
## 公共代码提取
我们打包生成的文件js文件中，都包含了react,redux,react-router这样的代码。然而这些依赖代码我们在很多文件都引用了，而不需要它自动更新。所以我们可以把这些公共代码提取出来。
我们根据[教程](https://webpack.docschina.org/guides/caching/#%E6%8F%90%E5%8F%96%E6%A8%A1%E6%9D%BF-extracting-boilerplate-)配置。
* 打开webpack.dev.config.js
```js
var webpack=require('webpack');
module.exports={
    entry:{
        app:[
            'react-hot-loader/patch',
            path.join(__dirname,'src/index.js')
        ],
        vendor:['react','react-router-dom','redux','react-dom','react-redux']
    },
    plugins:[
        ...
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor'
        })
    ]
}
```
重新运行，打包文件如下
<img src="/public/image/react20.png" hieght="300px"/>

可以发现app.[hash].js和vendor.[hash].js生成的hash是一样的。也就意味着如果代码有改动app.[hash].js与vendor.[hash].js都会同时改变。然后vendor里的内容我们不希望它更新。根据文档，我要在webpack里还要配置
<img src="/public/image/react21.png" hieght="300px"/>

应用到我们项目应该
```js
output:{
    path:path.join(__dirname,'./dist'),
    filename:'[name].[chunkhash].js',
    chunkFilename:'[name].[chunkhash].js'
}
```
再次运行，发现报错，webpack-dev-server --hot 不兼容chunkhash
<img src="/public/image/react22.png" hieght="300px"/>

解决这个问题，我们要先区分生产环境与开发环境的区别。所以，上面的问题先留一下，我们先来构建生产环境的配置。
## 生产环境构建
生产环境与开发环境的区别往往体现在目标差异大。开发环境我们要配置的东西很多，要求实时加裁，热更新模块等。但生产环境要求较小，更关注小的bundle，更轻量的Source map，更高效的加载时间等。
* 首先创建配置文件
```shell
touch webpack.config.js
```
* 将之前webpack.dev.config.js的内容复制到webpack.config.js中，删除一些和开发环境有关的几点：
1. webpack-dev-server相关内容
2. devtool的值改成 cheap-module-source-map
3. 输出文件名增加字符改为chunkhash,原本的webpack.dev.config.js改回为hash
根据以上几点，webpack.config.js内容如下：
```js
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
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor'
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
```
* 在package.json中增加build打包命令，指定配置文件。
```js
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.config.js",
    "start": "webpack-dev-server --config webpack.dev.config.js --color --progress --hot"
  },
```
运行一次打包命令 npm run build，文件名支持了chunkhash.
<img src="/public/image/react23.png" hieght="300px"/>

虽然文件名不同了，但是改变代码重新打包会发现app.[hash].js和vendor.[chunkhash].js一样都更新了名字，这不就和没拆分是一样的吗？
别着急，看官网介绍
<img src="/public/image/react24.png" hieght="600px"/>

<b>注意mainfest与vendor的顺序不能错哦</b>
打开webpack.config.js
 ```js
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

 ```
当我们构建了基础的生产环境配置后，我们可以增加指定环境配置，根据process.env.NODE_ENV环境变量关联，让[library](http://www.css88.com/doc/webpack/guides/author-libraries/)中应该引用哪些内容。例如，当不处于生产环境中时，library可能会添加额外的日志log和test。当使用 process.env.NODE_ENV === 'production' 时，一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。
*  打开webpack.config.js
```js
module.exports={
    plugins:[
        ...
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV':JSON.stringify('production')
            }
        })
    ]
}
```

## 打包优化
#### 文件压缩
webpack使用UglifyJSPlugin来压缩打包后生成的文件。
* 安装
```shell
npm install uglifyjs-webpack-plugin --save-dev
```
* 打开webpack.config.js进行配置
```js
const UglifyJSPlugin=require('uglifyjs-webpack-plugin')
module.exports={
    plugins:[
        ...
        new UglifyJSPlugin()
    ]
}
```
运行npm run build有没有发现打包的文件小了好多
<img src="/public/image/react25.png" hieght="600px"/>

#### 清理dist文件
每次打包dist都会多好多文件混合在里面，我们应该清掉之前打包的文件，只留下当前打包后的文件。我们用到clean-webpack-plugin
* 安装
```shell
npm install clean-webpack-plugin --save-dev
```
* 打开webpack.config.js来配置
```js
const CleanWebpackPlugin=require('clean-webpack-plugin');
...
plugins:[
    new CleanWebpackPlugin(['dist'])
]
```
现在试试打包一下，每次是不是都是直接覆盖整个文件。虽然api文件也被清掉了，但是没关系，那只是用来测试的。
#### 静态文件的基本路径
当我们打包后，静态文件没办法定位到静态服务器，我们需要在webpack.config.js中配置
```js
output:{
    ...
    publicPath:'/'
}
```
#### css打包分离
如果我要要将打包到js的css内容抽出来单独成css文件，我们可以使用extract-text-webpack-plugin.
* 安装
```shell
npm install extract-text-webpack-plugin --save-dev
```
* 打开webpack.config.js进行配置
```js
const ExtractTextPlugin=require("extract-text-webpack-plugin");
module.exports={
    module:{
        rules:[
            ...
            {
                test:/\.(css|less)$/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:"css-loader"
                })
            }
        ]
    },
    plugins:[
        ...
        new ExtractTextPlugin({
            filename:'[name].[contenthash:5].css',
            allChunks:true
        })
    ]
}
```
我们可以增加一些css文件引用，来测试下。由于我们之前的示例是用less来写的样式，那么我们加上less的[配置](https://github.com/webpack-contrib/extract-text-webpack-plugin)，使之生成独立文件。
修改刚刚的配置项：
```js
module.exports={
    module:{
        rules:[
            ...
            {
                test:/\.(css|less)$/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:["css-loader","less-loader"]
                })
            }
        ]
    },
}
```
重新打包，就能看到被生成的css文件啦
<img src="/public/image/react26.png" hieght="600px"/>

## axios
* 安装axios
```shell
npm install --save axios
```
* 然后简化之前写的userInfo的action,修改redux/actions/userInfo.js
```js
export const GET_USERINFO_REQUEST="userInfo/GET_USERINFO_REQUEST";
export const GET_USERINFO_SUCCESS="userInfo/GET_USERINFO_SUCCESS";
export const GET_USERINFO_FAIL="userInfo/GET_USERINFO_FAIL";

export function getUserInfo(){
    return{
        types:[GET_USERINFO_REQUEST,GET_USERINFO_SUCCESS,GET_USERINFO_FAIL],
        promise:client => client.get('/api/userInfo.json')     
    }
}
```
其中dispath(getUserInfo())后，是通过redux的中间件来处理的。为了弄清楚，我们自己来写一个。
#### 自定义Middleware
* 清理逻辑
1. 发起请求前 dispatch REQUEST;
2. 请求成功后 dispatch SUCESS,再执行callback;
3. 请求失败后 dispatch FAIL。
* 创建基本文件
```shell
cd src/redux
mkdir middleware && cd middleware
touch promiseMiddleware.js
```
* 定义promiseMiddleware.js的内容
```js
import axios from 'axios';
export default store => next =>action =>{
    const {dispatch,getState}=store;
    // 如果dispatch传来的是一个function,则跳过
    if(typeof action === 'function'){
        action(dispatch,getState);
        return ;
    }
    // 解析action
    const {
        promise,
        types,
        afterSuccess,
        ...rest
    }=action;
    // 如果不是异步请求则直接跳转下一步
    if(!action.promise){
        return next(action);
    }
    // 解析types
    const [REQUEST,SUCCESS,FAILURE]=types;
    // 发送action
    next({
        ...rest,
        type:REQUEST
    });
    // 成功
    const onFulfilled = result=>{
        next({
            ...rest,
            result,
            type:SUCCESS
        });
        if(afterSuccess){
            afterSuccess(dispatch,getState,result);
        }
    };
    // 失败
    const onRejected=error=>{
        next({
            ...rest,
            error,
            type:FAILURE
        });
    };
    return promise(axios).then(onFulfilled,onRejected).catch(error=>{
        console.error('MIDDLEWARE ERROR:',error);
        onRejected(error)
    })
}
```

* 在src/redux/store.js中应用中间件

```js
import {createStore,applyMiddleware} from 'redux';
import combineReducers from './reducers.js';
// import thunkMiddleware from 'redux-thunk';
// let store = createStore(combineReducers,applyMiddleware(thunkMiddleware));

import promiseMiddleware from './middleware/promiseMiddleware';
let store = createStore(combineReducers,applyMiddleware(promiseMiddleware));

export default store;
```

* 最后修改src/redux/reducers/userInfo.js
因为是当action请求成功，我们在中间件会自动加上一个result字段来存结果。

```js
export default function reducer(state=initState,action){
    switch(action.type){
        ...
        case GET_USERINFO_SUCCESS: 
            return{
                ...state,
                isLoading:false,
                userInfo:action.result.data,
                errMsg:''
            }
    }
}
```
我们重启npm run start ,访问userInfo接口是不是成功啦！

## webpack配置合并
我们现在针对于不同的环境，创建了webpack.dev.config.js和webpack.config.js两个配置文件。不难发现，两个配置文件有很多一样的配置，而当之后我们需要改某个公共配置时，需要两个文件同时改。这必然会有些麻烦。所以我们可以用webpack-merge来合并公共的配置项。
* 安装
```shell
npm install webpack-merge --save-dev
touch webpack.common.config.js
```
* 打开webpack.common.config.js,提取公共配置,参考[官网](https://www.npmjs.com/package/webpack-merge)
```js
const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const webpack=require('webpack');
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
        chunkFilename:'[name].[chunkhash].js',
        publicPath:'/'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:['babel-loader?cacheDirectory=true'],
                include:path.join(__dirname,'src')
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
        }),
    ],
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
}
```
* webpack.dev.config.js
```js
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
```
* webpack.config.js
```js
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
```
## 404页面增加
## babel-plugin-transform-runtime和babel-polyfill
## PostCss














