import * as React from "react";
import firebase from "../../firebase";
import gLogo from "../../img/g_logo.svg";
import fbLogo from "../../img/facebook-round-color.svg";
import githubLogo from "../../img/github-logo.svg";

export const GoogleSignInButton = ({ onLogin }) => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().useDeviceLanguage();

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        // var credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        onLogin(user.displayName, user.photoURL);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorMessage = error.message;
        console.log("Error message: " + errorMessage);
      });
  };

  return (
    <div>
      <button className="g-button" onClick={() => handleSignIn()}>
        <img src={gLogo} alt="Google Icon" />
        {/* <div className="g-button-text">Sign in with Google</div> */}
      </button>
    </div>
  );
};

export const FacebookSignInButton = ({ onLogin }) => {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().useDeviceLanguage();

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        // var credential = result.credential;
        // The signed-in user info.
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // var accessToken = credential.accessToken;
        var user = result.user;
        onLogin(user.displayName, user.photoURL);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorMessage = error.message;
        console.log("Error message: " + errorMessage);
      });
  };

  return (
    <div>
      <button className="f-button" onClick={handleSignIn}>
        <img src={fbLogo} alt="Facebook Icon" />
      </button>
    </div>
  );
};

export const GithubSignInButton = ({ onLogin }) => {
  return (
    <div>
      <button
        className="f-button"
        onClick={() => console.log("Not implemented yet...")}
      >
        <img src={githubLogo} alt="Github Icon" />
      </button>
    </div>
  );
};
