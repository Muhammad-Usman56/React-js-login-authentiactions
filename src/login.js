import React , {Component} from 'react';
import fire from './config/fire';

import firebase from 'firebase';

// import firestore from 'firebase';


class Login extends Component{
state={
        email:'',
        password:'',
        uid:'',
        user:'',
        token:'',
        phone:''

    }

    async datafetch(abc) {
        console.log("datafetch call")
        await fire.database().ref('usernotify/' + abc).set({
         
          email: this.state.email,
          password: this.state.password,
         
    
        })
    
      }
signup = (e) => {
    e.preventDefault();
    if (this.state.email === '' && this.state.password === '') {
    alert('Enter details to signup!')
      } else {
   
    fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
        console.log(u)

        console.log(u.user.uid)
        this.setState({ uid: u.user.uid })
        this.datafetch(u.user.uid)



    }).catch((err)=>{
alert(err);
    })
}
}


login= (e) =>{
    e.preventDefault();
    if (this.state.email === '' && this.state.password === '') {
        alert('Enter details to login!')
      } else {
    
    fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
        console.log(u);

    }).catch((err)=>{
        alert(err);
    })
}}
// handleChange = (e) =>{
//     this.setState({
//        [e.target.name] : e.target.value
//     })
// }
google =(e)=>{
    e.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    fire.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
    //   var token = result.credential.accessToken;
      // The signed-in user info.
      // var email = result.email;
      // this.setState({email : result.email})

      console.log('Google login success');
console.log(result);
console.log(result.additionalUserInfo.profile.name);
      // this.setState({ uid: user.uid })
      //   this.googlefetch(user.uid)
    }).catch(function(error) {
      var errorMessage = error.message;
      alert("Google sign in error: "+ errorMessage);
    });

}

async googlefetch(abc) {
    console.log("googlefetch call")
    await fire.database().ref('usernotify/' + abc).set({
     
      email: this.state.email,
    //   password: this.state.password,
     

    })

  }


facebook = (e) => {
    e.preventDefault();
    var provider = new firebase.auth.FacebookAuthProvider();
    fire.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      //var user = result.user;
      console.log('Facebook login success')
    }).catch(function(error) {
      var errorMessage = error.message;
      alert("Facebook sign in error: "+ errorMessage);
    });
  }

	handleSubmit = (e) => {
	    e.preventDefault();
	    var email = this.state.email.trim();

	    firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Email sent.
        alert("Please check your email "+email+" for instructions ");
      }, function(error) {
        alert("sorry an error has occured, Please try again")
      });
  }

componentDidMount(){
    fire.auth().onAuthStateChanged(function(user){
        if(user){
            console.log("user signed");
        }
        else{
            console.log('Error');
        }
    })
}

    render(){
        return(
            <div>
                <form>
                    <input 
                    type="email"
                    id="email"
                    placeholder='email'
                    onChange={e=> this.setState({email:e.target.value})}
                    // value={this.state.email}
                    />
                    <input 
                    type="password"
                    id="password"
                    placeholder='Password'
                    onChange={e=> this.setState({password:e.target.value})}
                    // value={this.state.password}
                    />
                    <input type="text" className="form-control" value={this.state.email}       onChange={e=> this.setState({email:e.target.value})} placeholder="Enter Email" />
                    <button onClick={this.login}>Login</button>
                <button onClick={this.signup}>Signup</button>
                <button onClick={this.google}>Google Signin</button>
                <button onClick={this.facebook}>Facebook Signin</button>
                <button onClick={this.handleSubmit} >Forget password</button>
                </form>

<form>

<input 
                    type="email"
                    id="email"
                    placeholder='email'
                    onChange={e=> this.setState({email:e.target.value})}
                    // value={this.state.email}
                    />
                    <input 
                    type="password"
                    id="password"
                    placeholder='Password'
                    onChange={e=> this.setState({password:e.target.value})}
                    // value={this.state.password}
                    />
                     <input 
                    type="password"
                    id="password"
                    placeholder='Password'
                    onChange={e=> this.setState({phone:e.target.value})}
                    // value={this.state.password}
                    />
                    
                    <button onClick={this.login}>Login</button>
</form>






            </div>
        );
    }
}
export default Login;