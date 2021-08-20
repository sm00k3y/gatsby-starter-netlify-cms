import * as React from "react";
import firebase from "../firebase";
// import TestComponent from "./logins/test";
import {
  GoogleSignInButton,
  FacebookSignInButton,
} from "./Authentication/AuthComponents";
import { SingleComment, CommentInput } from "./Comments/CommentComponents";

export const CommentRoll = ({ id }) => {
  const [name, setName] = React.useState("");
  const [allComments, setAllComments] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userImgUrl, setUserImgUrl] = React.useState("");

  const addComment = (comment, commentDate) => {
    console.log("I'm here!");
    if (name === "" || comment === "") {
      alert("Nie można dodać pustego komentarza. :)");
    } else {
      firebase
        .database()
        .ref("comments/" + id)
        .push(
          {
            name: name,
            comment: comment,
            date: commentDate,
            photoUrl: userImgUrl,
          },
          (error) => {
            if (error) {
              console.log(error.message);
            } else {
              console.log("No error adding comment to DB!");
            }
          }
        );
    }
    getComments();
  };

  const getComments = () => {
    setAllComments([]);
    const ref = firebase.database().ref("comments/" + id);
    ref.on(
      "value",
      (snaphot) => {
        const coms = snaphot.val();
        if (coms !== null) {
          console.log(Object.entries(coms));
          Object.entries(coms).forEach((elem) => {
            console.log(elem[1]);
            setAllComments((allComments) => [...allComments, elem[1]]);
          });
        } else {
          console.log("No comments in DB");
        }
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

  const sortComments = (com1, com2) => {
    if (com1.date > com2.date) {
      return 1;
    } else if (com1.date < com2.date) {
      return -1;
    } else {
      return 0;
    }
  };

  return (
    <div>
      {loggedIn ? (
        <CommentInput
          userName={name}
          userImage={userImgUrl}
          addComment={addComment}
        />
      ) : (
        <div>
          <h1>In order to add comment you need to sign in!</h1>
          <GoogleSignInButton onLogin={onLogin} />
          <FacebookSignInButton onLogin={onLogin} />
        </div>
      )}
      <button onClick={() => getComments()}>Click me</button>
      {/* All comments */}
      <div className="comments">
        {allComments.length > 0 ? (
          allComments
            .sort(sortComments)
            .reverse()
            .map((comment) => {
              return <SingleComment comment={comment} />;
            })
        ) : (
          <h1>Bądź pierwszą osobą, która doda komentarz...</h1>
        )}
      </div>
    </div>
  );
};
