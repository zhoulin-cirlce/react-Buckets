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