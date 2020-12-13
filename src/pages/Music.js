import {Component} from 'react';
import "../assets/css/music.css"
export default  class Music extends Component{
    constructor(){
        super();
        this.state={

        }
    }
    render(){
        return(
            <div className='Music'>
                <p>网易云音乐</p>
                <div className="Music_paly">
                   <div className="Music_son"></div>
                  
                </div>
                <h3>心情的累</h3>
                <span>刘德华</span>
                <p></p>
            </div>
        )
    }
}