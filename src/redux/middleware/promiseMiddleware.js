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