import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Hotsong from './pages/Hotsong'
import './App.css';
import './assets/css/reset.css';
import Layout from './pages/Layout' 
import Music from './pages/Music' 
class App extends React.Component{
  render(){
    return(
       <div className='App'>
         <Switch>
          <Route path='/hotsong' component={Hotsong}></Route>
          <Route path='/music' component={Music}></Route>
          <Route path='/' component={Layout}></Route>
         </Switch>
       </div>
    )
  }
}

export default App;
