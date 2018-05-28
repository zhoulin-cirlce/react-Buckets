import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getUserInfo} from "actions/userInfo";
import imgSrc from '../../../public/image/react15.png'

class UserInfo extends Component{
    render(){
        const {userInfo,isLoading,errMsg} = this.props.userInfo;
        return(
            <div>
                {
                    isLoading ? '请求中...' : 
                    (
                        errMsg ? errMsg :
                            <div>
                                <h2>个人资料</h2>
                                <img src={imgSrc}/>
                                <ul>
                                    <li>姓名：{userInfo.name}</li>
                                    <li>年龄：{userInfo.age}</li>
                                    <li>爱好：{userInfo.like}</li>
                                    <li>性别：{userInfo.female}</li>
                                </ul>
                            </div>
                    )
                }
                <button onClick={
                    ()=> this.props.getUserInfo()
                }>查看个人资料</button>
            </div>
        )
    }
}
export default connect((state)=>({userInfo:state.userInfo}),{getUserInfo})(UserInfo);