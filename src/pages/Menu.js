import {Component} from 'react';
import {Link} from 'react-router-dom'
import './../assets/css/menu.css'

export default  class Menu extends Component{
    constructor(){
        super();
        this.state={
        menulist:[],
        }
    }
    componentDidMount(){
        this.getmenu();
    }
    getmenu(){
        console.log(this.$http);
        this.$http.get("/proxy/top/list",{idx:1}).then(res=>{
            console.log(res);
            if(res.code === 200){
               this.setState({
            menulist:res.playlist.tracks,
            })  
            }else{
            console("出现未知的错误")
            }})
    }
    render(){
        return(
            <div className='Menu'>
               <div className="menu_photo">
                   <div className="menu_bj"></div>
                   <p>更新日期：11月5日 </p>
               </div>
               <div className="menu_mian">
                    {
                     this.state.menulist.map(item=>{
                         return(
                           <Link to='/music' key={item.id}>
                             <div>
                                <span className="menu_text"> {this.state.menulist.indexOf(item)+1>10?this.state.menulist.indexOf(item)+1:'0'+(this.state.menulist.indexOf(item)+1)}</span>
                                <span className="Menu_box">
                                    <em>{item.name}</em>
                                    <p><i className='menu_icon'></i>{!item.ar[1]?item.ar[0].name+'-'+item.al.name:item.ar[0].name+'/'+item.ar[1].name+'-'+item.al.name}</p>
                                </span> 
                            </div>    
                             <div className='menu_play'></div>
                  </Link>)
                    })}
                </div>
                <footer>
                      查看完整榜单{'>'}  
                </footer>
            </div>
        )
    }
}