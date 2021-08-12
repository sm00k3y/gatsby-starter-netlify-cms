import * as React from "react";
import firebase from "../firebase";
// import TestComponent from "./logins/test";
import { GoogleSignInButton } from "./logins/google";

export const CommentRoll = ({ id }) => {
  const [name, setName] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [allComments, setAllComments] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userImgUrl, setUserImgUrl] = React.useState("");

  const addComment = (event) => {
    console.log("I'm here!");
    if (name === "" || comment === "") {
      alert("Nazwa użytkownika lub komentarz jest pusty! Wprowadź dane.");
    } else {
      firebase
        .database()
        .ref("comments/" + id)
        .push(
          {
            name: name,
            comment: comment,
            photoUrl: userImgUrl,
          },
          (error) => {
            if (error) {
              console.log(error.message);
            } else {
              console.log("No error!");
            }
          }
        );
      setComment("");
    }
    getComments();
    event.preventDefault();
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleComment = (event) => {
    console.log(allComments);
    setComment(event.target.value);
  };

  const getComments = () => {
    setAllComments([]);
    const ref = firebase.database().ref("comments/" + id);
    ref.on(
      "value",
      (snaphot) => {
        const coms = snaphot.val();
        console.log(Object.entries(coms));
        Object.entries(coms).forEach((elem) => {
          console.log(elem[1]);
          setAllComments((allComments) => [...allComments, elem[1]]);
        });
      },
      (errorObj) => {
        console.log("The read failed: " + errorObj.name);
      }
    );
  };

  const onLogin = (loginName, imageUrl) => {
    console.log("Hello " + loginName);
    setName(loginName);
    setUserImgUrl(imageUrl);
    setLoggedIn(true);
  };

  return (
    <div>
      {loggedIn ? (
        <form onSubmit={addComment}>
          <img src={userImgUrl} />
          <label>{name}</label>
          {/* <input
            type="text"
            onChange={handleName}
            placeholder="Name"
            value={name}
          /> */}
          <br />
          <textarea
            value={comment}
            onChange={handleComment}
            rows={5}
            cols={75}
            placeholder="Enter new comment"
          />
          <br />
          <input type="submit" value="Sumbit" />
        </form>
      ) : (
        <div>
          <h1>In order to add comment you need to sign in!</h1>
          <GoogleSignInButton onLogin={onLogin} />
        </div>
      )}
      <button onClick={() => getComments()}>Click me</button>
      <div>
        {allComments.map((comment) => {
          return (
            <p>
              <img src={comment.photoUrl} />
              {comment.name} - {comment.comment}
            </p>
          );
        })}
      </div>
    </div>
  );
};
