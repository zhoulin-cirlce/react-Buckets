import React from 'react';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import Home from 'bundle-loader?lazy&name=home!pages/Home/Home';
import About from 'bundle-loader?lazy&name=page1!pages/About/About';
import Counter from 'bundle-loader?lazy&name=counter!pages/Counter/Counter';
import UserInfo from 'bundle-loader?lazy&name=userInfo!pages/UserInfo/UserInfo';
import Bundle from './Bundle';

const Loading = function(){
    return <div>Loading...</div>
};
const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props} /> : <Loading/>
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
