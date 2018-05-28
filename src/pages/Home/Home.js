import React,{Component} from 'react';
import './Home.less';
export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            count:0
        }
    }
    _test(){
        this.setState({
            count:++this.state.count
        })
    }
    render(){
        return(
            <div>
                <h1>当前共点击次数为：{this.state.count}</h1>
                <button onClick={()=> this._test()}>点击我！</button>
                <div className="wrap">
                    <div className="content"></div>
                </div>
            </div>
        )
    }
}