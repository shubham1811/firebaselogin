import React, {Component} from 'react';
var firebase = require('firebase');
var config = {
  apiKey: "AIzaSyDurMY4af-GQLNnxspofCpF9S4_nSj71VY",
  authDomain: "login-9f7fa.firebaseapp.com",
  databaseURL: "https://login-9f7fa.firebaseio.com",
  projectId: "login-9f7fa",
  storageBucket: "login-9f7fa.appspot.com",
  messagingSenderId: "832719430194"
};
firebase.initializeApp(config);


class Authen extends Component {
  login(event)
  {
     const email = this.refs.email.value;
     const password = this.refs.password.value;
     console.log(email, password);
     const auth = firebase.auth();
     const promise  = auth.signInWithEmailAndPassword(email,password);
     promise.then(user => {
       var lout = document.getElementById('logout');
       lout.classList.remove('hide')
     });
     promise.catch(e =>{
      var err=e.message;
       console.log(err);
       this.setState({err:err});
     });
  }
  signup(event)
  {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email, password);
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email,password);
    promise
    .then(user => {
      var err ="welcome" + user.email;
      firebase.database().ref('users/'+user.uid).set({
        email:user.email
      });
      console.log(user);
      this.setState({err: err});
    });
    promise
    .catch(e =>{
      var err = e.message;
      console.log(err);
      this.setState({err:err});
    });
  }
  logout()
  {
    firebase.auth().signOut();
    var lout = document.getElementById('logout');
    lout.classList.add('hide');
  }
  google()
  {
      var provider = new firebase.auth.GoogleAuthProvider();
      var promise = firebase.auth().signInWithPopup(provider);
      promise.then( result => {
        var user =result.user;
        console.log(result);
        firebase.database().ref('users/'+user.uid).set({
          email: user.email,
          name:  user.displayName
        });
      });
      promise.catch( e =>{
        var msg = e.message;
        console.log(msg);
      });
  }

  constructor(props){
    super(props);

    this.state = {
      err:''
    };
    this.login=this.login.bind(this);
    this.signup=this.signup.bind(this);
    this.logout=this.logout.bind(this);
    this.google=this.google.bind(this);
  }
  render(){
    return(
      <div>
        <input id="email" ref="email" type="email" placeholder="enter the email"/><br/>
        <input id="pass" ref="password" type="password" placeholder="enter the password"/><br/>
        <p>{this.state.err}</p>
        <button onClick={this.login}>login</button>
        <button onClick={this.signup}>signin</button>
        <button onClick={this.logout} id="logout" className="hide"> logout</button><br/>
        <button onClick={this.google} id="google" className="google"> sign in google</button>
      </div>
    );
  }
}
export default Authen;
