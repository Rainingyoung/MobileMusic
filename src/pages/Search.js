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
        }
        this.close = this.close.bind(this);
    }
    //清空搜索框内容
    close(){
        this.setState({
            keyword:""
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
            keyword:e.target.value
        })
    }
    //选中预选框里的值替换掉本来的
    repl(index){
        let Sea = [...this.state.Search];
        this.setState({
            keyword:Sea[index].name,
            history:Sea[index].name  
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
        this.$http.get('proxy/search',{keywords:sear,limit:8}).then(res=>{
            if(res.code === 200){
                this.setState({
                    Search:res.result.songs,
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
                    <input className="search_inp" type="text" onChange={this.appear.bind(this)} value={this.state.keyword} placeholder="搜索歌手、歌曲、专辑"></input>
                    <span className='search_pan'><i className='search_svg' onClick={this.close}></i></span>
                </div>
               <h3 className="search_tit">热门搜索</h3>
               <div className='search_main'>
                   {
                       this.state.Searchlist.map((item,index)=>{
                           return(
                           <span key={index}>{item.first}</span>  
                           )
                       })
                   } 
               </div>
                <footer>
                    {
                        this.state.history.map(item=>{
                            return(
                               <div className="search_flex">
                                    <i className="search_Icon"></i>
                                    <p className='search_tet'></p>
                                    <i className="search_close"></i>
                               </div> 
                            )
                        })                 
                    }
                </footer>
                <article className={this.state.Search.length===0?'Search_art':'Search_artil'}>
                    <div className='Primary'>
                        <h4>搜索"{this.state.keyword}"</h4>
                        {  
                        console.log(this.state.Search),
                           this.state.Search.map((item,index)=>{
                               return(
                        <div className='search_list' key={index} > 
                            <i className="search_fdj"></i>
                            <p onClick={this.repl.bind(this,index)}>{item.name}</p>
                        </div>    
                                )
                           },this)  
                        }
                    </div>
                </article>
                <section className='Search_content'>
                    <div className="sear_mian">
                        <h4>最佳匹配</h4>
                    {/* {
                    this.state.latest.map(item=>{
                        return( */}
                          <Link to='/music' > 
                            <span>
                            <span>圣诞节的还是觉得还是</span>
                            <p><i className='div_icon'></i></p>
                            </span>    
                            <div className='div_play'></div>
                   </Link>
                    
                   </div>
                </section>
            </div>
        )
    }
}