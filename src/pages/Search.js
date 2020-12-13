import {Component} from 'react';
import {Link} from 'react-router-dom'
import './../assets/css/search.css'
export default  class Search extends Component{
    constructor(){
        super();
        this.state={
            keyword:"",
            Searchlist:[],//热门搜索推荐
            Search:[],//搜索预选
            history:[],//历史记录
            results:[]//搜索结果列表
        }
        this.close = this.close.bind(this);
    }
    //清空搜索框内容
    close(){
        this.setState({
            keyword:"",
            results:[]
        })
    }
    //输入框里回车直接搜索
    Enter = (e)=>{
        if(e.keyCode === 13){
      this.getResult(e.target.value)     
        }          
    }
    //删除一项历史记录
    del(index){
    let His = [...this.state.history];
    His.splice(index,1);
       this.setState({
            history:His
       })
    }
    //输入框触发的事件
    appear(e){
        if(e.target.value){
            this.getSearchkey(e.target.value);
        }else{
            return;
        }
        this.setState({
            keyword:e.target.value,
        })
    }
    //点击热门搜索列表实现显示搜索
    seek(index){
        let List = [...this.state.Searchlist]
      this.getResult(List[index].first)
    }
    //历史记录点击开始搜索功能
    Seach(index){
        let LIST = [...this.state.history]
        this.getResult(LIST[index].key)
    }
    //选中预选框里的值替换掉本来的
    repl(index){
        let Sea = [...this.state.Search];
        this.setState({
            keyword:Sea[index].keyword,
        },()=>{
            this.getResult(Sea[index].keyword)
        })
    }
    //挂在完成触发的生命周期
    componentDidMount(){
        this.getSearch();
    }
    //搜索列表渲染
    getSearch(){
        this.$http.get('proxy/search/hot').then(res=>{
            if(res.code === 200){
                this.setState({
                    Searchlist:res.result.hots,
                })
            }else{
                console.log('请求失败');
                
            }
        })
    }
    //搜索内容渲染
    getSearchkey(sear){
        this.$http.get('proxy/search/suggest',{keywords:sear,type:'mobile'}).then(res=>{
            if(res.code === 200){
                this.setState({
                    Search:res.result.allMatch,
                })
            }else{
                console.log('请求失败');
            }
        })
    }
    getResult(Nm){
    let L = this.state.history.find(item=>item.key === Nm)
    if(L === undefined){
        this.state.history.unshift({key:Nm});  
    } 
        let Arr = this.state.history; 
        this.$http.get('proxy/search',{keywords:Nm}).then(res=>{     
            if(res.code === 200){
                this.setState({
                    results:res.result.songs,
                    keyword:Nm,
                    history:Arr,
                })
            }else{
                console.log('请求失败');
            }
        })
    }
    render(){
        return(
            <div className='Search'>
                <div>
                    <div className="search_icon"></div>
                    <input className="search_inp" type="text" onChange={this.appear.bind(this)} onKeyDown={(e)=>this.Enter(e)} value={this.state.keyword} placeholder="搜索歌手、歌曲、专辑"></input>
                    <span className='search_pan'><i className='search_svg' onClick={this.close}></i></span>
                </div>
               <h3 className="search_tit">热门搜索</h3>
               <div className='search_main'>
                   {
                       this.state.Searchlist.map((item,index)=>{
                           return(
                           <span key={index} onClick={this.seek.bind(this,index)}>{item.first}</span>  
                           )
                       },this)
                   } 
               </div>
                <footer className={this.state.history.length===0?"search_foo":"search_ter"}>
                    {
                        this.state.history.map((item,index)=>{
                            return(
                    <div className="search_fix" key={index}>
                        <i className="search_Icon"></i>
                        <p className='search_tet'  onClick={this.Seach.bind(this,index)}>{item.key}</p>
                        <i className="search_close" onClick={this.del.bind(this,index)}></i>
                    </div>    
                            )
                        },this)
                    } 
                </footer>
                <article className={!this.state.keyword?'Search_art':'Search_artil'}>
                    <div className='Primary'>
                        <h4>搜索"{this.state.keyword}"</h4>
                        {  
                           this.state.Search.map((item,index)=>{
                               return(
                        <div className='search_list' key={index} > 
                            <i className="search_fdj"></i>
                            <p onClick={this.repl.bind(this,index)}>{item.keyword}</p>
                        </div>    
                                )
                           },this)  
                        }
                    </div>
                </article>
                <section className={this.state.results.length===0?'Search_content':'Search_cont'}>
                    <div className="sear_mian">
                        <h4>最佳匹配</h4>
                    { 
                    this.state.results.map(item=>{
                        return(
                          <Link to='/music' key={item.id}> 
                            <span>
                            <span>{item.name}</span>
                        <p><i className='div_icon'></i>{item.artists.length===1?item.artists[0].name+'-'+item.album.name:item.artists[0].name+'/'+item.artists[1].name+'-'+item.album.name}</p>
                            </span>    
                            <div className='div_play'></div>
                        </Link>)
                    })
                    }
                   </div>
                </section>
            </div>
        )
    }
}