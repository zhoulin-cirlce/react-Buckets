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

