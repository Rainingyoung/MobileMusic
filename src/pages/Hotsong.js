import {Component} from 'react';
import {Route,Switch} from 'react-router-dom';
import Music from './Music'
export default  class Hotsong extends Component{
    constructor(){
        super();
        this.state={

        }
    }
    render(){
        return(
            <div className='Hotsong'>
                <div> TO5 2020最新热歌 </div>
                <h3>基础列表</h3>
                <Switch>
                   <Route path='/music' component={Music}> 彩劵  </Route>
                </Switch>
            </div>
        )
    }
}