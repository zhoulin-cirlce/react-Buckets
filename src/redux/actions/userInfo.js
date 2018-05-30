export const GET_USERINFO_REQUEST="userInfo/GET_USERINFO_REQUEST";
export const GET_USERINFO_SUCCESS="userInfo/GET_USERINFO_SUCCESS";
export const GET_USERINFO_FAIL="userInfo/GET_USERINFO_FAIL";

export function getUserInfo(){
    return{
        types:[GET_USERINFO_REQUEST,GET_USERINFO_SUCCESS,GET_USERINFO_FAIL],
        promise:client => client.get('/api/userInfo.json')     
    }
} 