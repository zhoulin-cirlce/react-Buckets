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
import getRouter from './router/router';
ReactDom.render(
    getRouter(),
    document.getElementById('app')
);
 
