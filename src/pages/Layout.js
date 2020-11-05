import {Component} from 'react';
import {NavLink,Switch,Redirect,Route} from 'react-router-dom';
import {SyncOutlined} from '@ant-design/icons';
import Index from './Index'
import Menu from './Menu'
import Search from './Search'
import './../assets/css/layout.css'
export default  class Layout extends Component{
    constructor(){
        super();
        this.state={

        }
    }
    render(){
        return(
            <div className='layout'>
                <header>
                    <div className='header_music'><SyncOutlined spin style={{ fontSize: '1.5rem', color: '#fff' }} /> 网易云音乐</div>
                    <div className='header_app'>下载APP</div>
                </header>
                <nav>
                <NavLink to='/index' activeClassName="nav_active">推荐音乐</NavLink> 
                <NavLink to='/menu' activeClassName="nav_active">热歌榜</NavLink> 
                <NavLink to='/search' activeClassName="nav_active">搜索</NavLink> 
                </nav>
                <main>
                <Switch>
                   <Route path='/index' component={Index}></Route> 
                   <Route path='/menu' component={Menu}></Route> 
                   <Route path='/search' component={Search}></Route>   
                   <Redirect path='*' to='/index'></Redirect> 
                </Switch>     
                </main>

            </div>
        )
    }
}