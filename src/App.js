import React , {Component} from 'react';

import fire from './config/fire'

import Login from './login';
import Home from './Home';
class App extends Component{
  constructor(props)
  {
    super(props);
    this.state={
      user : {}
    }
  }
  componentDidMount(){
    this.authListner();
  }
  authListner(){
    fire.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({user})
      }
      else{
        this.setState({user:null})
      }
    })
  }
  render(){
    return (
<div>
        {this.state.user ? (<Home/>) : (<Login/>) }
  </div>
    );
  } 
}
 


export default App;
