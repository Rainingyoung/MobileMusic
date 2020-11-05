import {Component} from 'react';
// import {Route,Switch} from 'react-router-dom';
// import Hotsong from './Hotsong';
import './../assets/css/Index.css'
import axios from './../utils/http'
export default  class Index extends Component{
    constructor(){
        super();
        this.state={

        }
    }
    //生命周期用来请求数据
    componentDidMount(){
       this.getBanner();
    }
    getBanner(){
        axios.get("/proxy/related/playlist").then(res=>{
            console.log(res);
        })
       }
    render(){
        return(
            <div className='Index'>
                <h2>推荐歌单</h2>
                <ul>
                  <li>
                        <a href="./wjdkjd//"></a>
                        <p>wwhqs复古阿萨德和我爱看电话</p>
                        <span>128129819</span>
                  </li>
                </ul>
            </div>
        )
    }
}