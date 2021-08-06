import * as React from "react";
import firebase from "../firebase";

export const CommentRoll = ({ id }) => {
  const [name, setName] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [allComments, setAllComments] = React.useState([]);

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
          },
          (error) => {
            if (error) {
              console.log(error.message);
            } else {
              console.log("No error!");
            }
          }
        );
      setName("");
      setComment("");
    }
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

  return (
    <div>
      <form onSubmit={addComment}>
        <input
          type="text"
          onChange={handleName}
          placeholder="Name"
          value={name}
        />
        <br />
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
      <button onClick={() => getComments()}>Click me</button>
      <div>
        {allComments.map((comment) => {
          return (
            <p>
              {comment.name} - {comment.comment}
            </p>
          );
        })}
      </div>
    </div>
  );
};
