import {Component} from 'react';
import {Link} from 'react-router-dom';
import './../assets/css/hot.css'
export default  class Hotsong extends Component{
    constructor(){
        super();
        this.state={
          Hotlist:[],
          Hotsong:[]
        }
    }
    componentDidMount(){
       this.getList();
    }
    getList(){
        let id = this.props.location.search.split("=")[1]
         this.$http.get("/proxy/playlist/detail",{id}).then(res=>{
             if(res.code === 200){
                this.setState({
                    Hotlist:[res.playlist], 
                    Hotsong:res.playlist.tracks
                })
            } 
               })
    }
    render(){
        return(
            <div className='Hotsong'>
                {    this.state.Hotlist.map(item=>{
                       return(
                        console.log(item),
                    <div className="Hot_header" key={item.id}>
                    <div className="Hot_img">
                        <img src={item.coverImgUrl} alt="图片开小差了"></img>
                        <i className="Hot_txt">歌单</i>
                        <span className='Hot_ion'>{item.playCount>=10000?(item.playCount/10000).toFixed(1)+'万':item.playCount}</span>
                    </div>
                    <div className="Hot_tt">
                        <h4>{item.name}</h4>
                        <div className="Hot_port"><img src={item.creator.avatarUrl} alt="图片开小差了"></img>{item.creator.nickname}
                        <i className="Hot_con"></i>
                        </div>
                    </div>                    
                </div>)         
                })}
                <h3 className="Hot_tit">歌曲列表</h3>
                <div className="Hot_mian">
                    { 
                     this.state.Hotsong.map(item=>{
                         return(
                           <Link to='/music' key={item.id}>
                             <div>
                                <span className="Hot_text"> {this.state.Hotsong.indexOf(item)+1}</span>
                                <span className="Hot_box">
                                    <em>{item.name}</em>
                                    <p><i className='Hot_icon'></i>{!item.ar[1]?item.ar[0].name+'-'+item.al.name:item.ar[0].name+'/'+item.ar[1].name+'-'+item.al.name}</p>
                                </span> 
                            </div>    
                            <div className='Hot_play'></div>
                  </Link>)
                    })
            }
                </div>
            </div>
        )
    }
}