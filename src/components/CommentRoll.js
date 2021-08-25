import * as React from "react";
import firebase from "../firebase";
// import TestComponent from "./logins/test";
import {
  GoogleSignInButton,
  FacebookSignInButton,
  GithubSignInButton,
} from "./Authentication/AuthComponents";
import { SingleComment, CommentInput } from "./Comments/CommentComponents";

const DEFAULT_NUM_OF_COMMENTS = 3;
const DEFAULT_COMMENT_TIMEOUT = 30_000; //30 seconds

export const CommentRoll = ({ id }) => {
  const [name, setName] = React.useState("");
  const [allComments, setAllComments] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userImgUrl, setUserImgUrl] = React.useState("");
  const [numOfComments, setNumOfComments] = React.useState(
    DEFAULT_NUM_OF_COMMENTS
  );
  const [canWriteAnotherComment, setCanWriteAnotherComment] =
    React.useState(true);

  React.useEffect(() => {
    console.log("Setting up firebase listener");
    const ref = firebase.database().ref("comments/" + id);
    ref.on(
      "value",
      (snaphot) => {
        setAllComments([]);
        const coms = snaphot.val();
        if (coms !== null) {
          // console.log(Object.entries(coms));
          Object.entries(coms).forEach((elem) => {
            elem[1].id = elem[0];
            // console.log(elem[1]);
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
    return () => {
      ref.off("value"); //Cancelling listener to firebase
    };
  }, [id]);

  const addComment = (comment, commentDate) => {
    if (!canWriteAnotherComment) {
      alert(
        "Przed dodaniem kolejnego komentarza należy odczekać " +
          DEFAULT_COMMENT_TIMEOUT / 1000 +
          " sekund :)"
      );
      return;
    }
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
              console.log("No error adding comment to DB! :)");
            }
          }
        );
      setCanWriteAnotherComment(false);
      startCommentTimeout();
    }
  };

  const startCommentTimeout = () => {
    console.log("Setting timeout");
    setTimeout(() => {
      setCanWriteAnotherComment(true);
    }, DEFAULT_COMMENT_TIMEOUT);
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

  const handleMoreComments = () => {
    if (allComments.length > numOfComments) {
      setNumOfComments(numOfComments + 10);
    }
    console.log(numOfComments);
    setTimeout(() => {
      console.log("Czekasz 3 sekundy");
    }, 3000);
  };

  const handleHideComments = () => {
    setNumOfComments(DEFAULT_NUM_OF_COMMENTS);
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
        <div className="login-container">
          <div className="before-login-info">
            In order to add comment you need to sign in!
          </div>
          <div className="sign-in-buttons">
            <GoogleSignInButton onLogin={onLogin} />
            <FacebookSignInButton onLogin={onLogin} />
            <GithubSignInButton onLogin={onLogin} />
          </div>
        </div>
      )}
      {/* All comments */}
      <div>
        {allComments.length > 0 ? (
          <div className="comments">
            {allComments
              .sort(sortComments)
              .reverse()
              .slice(0, numOfComments)
              .map((comment) => {
                return <SingleComment comment={comment} key={comment.id} />;
              })}
            <div className="more-comments-container">
              <button
                className="more-comments-btn"
                onClick={handleMoreComments}
              >
                More comments
              </button>
              {numOfComments > DEFAULT_NUM_OF_COMMENTS && (
                <button
                  className="more-comments-btn"
                  onClick={handleHideComments}
                >
                  Hide comments
                </button>
              )}
            </div>
          </div>
        ) : (
          <h1>Bądź pierwszą osobą, która doda komentarz...</h1>
        )}
      </div>
    </div>
  );
};
