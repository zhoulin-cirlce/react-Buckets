import React from 'react';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import Home from 'pages/Home/Home';
import About from 'pages/About/About';

const getRouter=()=>(
    <Router>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
            </Switch>
        </div>
    </Router>

);
export default getRouter;
