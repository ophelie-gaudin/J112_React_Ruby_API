import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPostAsync } from "./postSlice";

function PostForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const submitHandler = (e: any) => {
    e.prevent.Default();
    const formData = {
      post: {
        title: title,
        body: body,
      },
    };
    dispatch(createPostAsync(formData));
    resetState();
  };

  const resetState = () => {
    setTitle("");
    setBody("");
  };

  return (
    <div>
      <h1>PostForm</h1>

      <form method="post">
        <input
          type="text"
          className="form-control text-start"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control text-start"
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <button type="submit" onClick={(e) => submitHandler(e)}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default PostForm;
