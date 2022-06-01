import React from "react";
import LoginView from "../views/LoginView";
import firebase from 'firebase';





export default function Login(props){

  var provider = new firebase.auth.GoogleAuthProvider();

  function loginLogic(){
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    console.log(result);
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    props.model.setCredential(credential);
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    props.model.setToken(token);
    // The signed-in user info.
    var user = result.user;
    console.log(user);
    props.model.setFullUser(user);
    props.model.setUserID(user.uid);
    props.model.getSavedTrips();
    props.model.setNavBarRender(1);
    window.location.hash = "startsearch"
 

  }).catch((error) => {
    // Handle Errors here.
    //var errorCode = error.code;
    //var errorMessage = error.message;
    // The email of the user's account used.
    //var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    //var credential = error.credential;
    // ...
  });

}
  
  return <LoginView userLogin={loginLogic}
  />;
}