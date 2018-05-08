import counter from 'reducers/counter';
import userInfo from 'reducers/userInfo';
import {combineReducers} from 'redux';

export default combineReducers({
    counter,
    userInfo
});