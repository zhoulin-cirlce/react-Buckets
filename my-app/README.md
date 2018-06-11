# 对于create-react-app生成的脚手架，所有的配置用react-scripts包封装了起来。如果我们想要修改里面的配置，我们可以用以下几种方法：
## eject
在此之前，我们用create-react-app(CRA)命令生成的文件目录如下图
<img src="./public/images/1.png" height="400px"/>

并没有独立的config文件，package.json的命令配置有一条eject命令
```js
"eject": "react-scripts eject"
```
此命令是把react-scripts中的配置反编译出来。把config配置文件暴露出来，任意修改。
* 执行命令
```shell
npm run eject
```
## 替换react-scripts
## 使用react-app-rewired
## scripts包+override组合