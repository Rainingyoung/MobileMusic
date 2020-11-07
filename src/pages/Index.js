import {Component} from 'react';
import {Link} from 'react-router-dom';
import './../assets/css/Index.css'
import axios from './../utils/http'
export default  class Index extends Component{
    constructor(){
        super();
        this.state={
            recomlist:[],
            latest:[],
        }
    }
    //生命周期用来请求数据
    componentDidMount(){
       this.getBanner();
       this.getLatest();
    }
    getBanner(){
        axios.get("/proxy/personalized",{limit:6}).then(res=>{ 
            this.setState({
                recomlist:res.result
            })
        })
       }
    getLatest(){
        axios.get("/proxy/personalized/newsong").then(res=>{
            this.setState({
                latest:res.result
            })
        })
       }
    render(){
        return(
            <div className='Index'>
                <h2>推荐歌单</h2>
                <ul>
                    {
                     this.state.recomlist.map(item=>{
                       return(
                            <li key={item.id}>
                                {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
                                <a href="#"><img src={item.picUrl}></img></a>
                                <p>{item.name}</p>
                                <span className='ul_iocn'>{item.playCount>=10000?(item.playCount/10000).toFixed(1)+'万':item.playCount}</span>
                            </li>)})
                    }
                </ul>
                <h2>最新音乐</h2> 
                <div className="Index_mian">
                    {
                    this.state.latest.map(item=>{
                        return(
                          <Link to='/music' key={item.id}> 
                            <span>
                                <span>{item.name}</span>
                        <p><i className='div_icon'></i>{!item.song.artists[1]?item.song.artists[0].name+'-'+item.song.album.name:item.song.artists[0].name+'/'+item.song.artists[1].name+'-'+item.song.album.name}</p>
                            </span>    
                            <div className='div_play'></div>
                   </Link>)
                    })}
                </div>
                <div className="Index_footer">
                    <div className="Index_title"></div>
                    <div className="Index_app">打开APP，发现更多好音乐</div>
                    <p className="Index_text">网易公司版权所有©1997-2020杭州乐读科技有限公司运营</p>
                </div>
            </div>
        )
    }
}