import {Component} from 'react';
import {Route,Switch} from 'react-router-dom'
export default  class Menu extends Component{
    constructor(){
        super();
        this.state={

        }
    }
    render(){
        return(
            <div className='Menu'>
               <div></div>
               <Switch>
               <Route>1.会不会 </Route>
               <Route>2.经济舱 </Route>
               </Switch>
            </div>
        )
    }
}