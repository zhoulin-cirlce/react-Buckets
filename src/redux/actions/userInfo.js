export const GET_USERINFO_REQUEST="userInfo/GET_USERINFO_REQUEST";
export const GET_USERINFO_SUCCESS="userInfo/GET_USERINFO_SUCCESS";
export const GET_USERINFO_FAIL="userInfo/GET_USERINFO_FAIL";

export function getUserInfoRequest(){
    return {
        type:GET_USERINFO_REQUEST
    }
}
export function getUserInfoSuccess(userInfo){
    return{
        type:GET_USERINFO_SUCCESS,
        userInfo:userInfo
    }
}
export function getUserInfoFail(){
    return{
        type:GET_USERINFO_FAIL
    }
}
export function getUserInfo(){
    return function(dispatch){
        dispatch(getUserInfoRequest());
        return fetch('http://localhost:8000/api/userInfo.json')
            .then((response=>{
                return response.json()
            }))
            .then((json)=>{
               return dispatch(getUserInfoSuccess(json))
                }
            ).catch(()=>{
                dispatch(getUserInfoFail());
                }
            )
    }
}