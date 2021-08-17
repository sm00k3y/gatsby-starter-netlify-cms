import * as React from "react";
import firebase from "firebase";
import gLogo from "../../img/g_logo.svg";

export const GoogleSignInButton = ({ onLogin }) => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().useDeviceLanguage();

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log(user);
        onLogin(user.displayName, user.photoURL);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  return (
    <div>
      <button className="google-button" onClick={() => handleSignIn()}>
        <img src={gLogo} alt="Google Icon" style={{ paddingRight: 18 }} />
        <incline class="g-button-text">Sign in with Google</incline>
      </button>
    </div>
  );
};
