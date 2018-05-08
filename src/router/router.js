import React from 'react';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
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
