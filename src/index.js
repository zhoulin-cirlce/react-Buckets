// document.getElementById('app').innerHTML='This is my React!';

// var babeltest=()=>
// document.getElementById('app').innerHTML='This is Babel Test!';
// babeltest();

// import React from 'react';
// import ReactDom from 'react-dom';
// ReactDom.render(
//     <div>First React!</div>,
//     document.getElementById('app')
// )

// import React from 'react';
// import ReactDom from 'react-dom';
// import Hello from './component/Hello/Hello';
// ReactDom.render(
//     <Hello/>,
//     document.getElementById('app')
// )

import React from 'react';
import ReactDom from 'react-dom';
import getRouter from 'router/router';
import {AppContainer} from 'react-hot-loader';
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

hotLoader(getRouter());

if(module.hot){
    module.hot.accept('router/router',()=>{
        const getRouter=require('router/router').default;
        hotLoader(getRouter());
    }); 
}


 
