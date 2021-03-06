import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import M from "materialize-css";

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "travel-diaries");
    data.append("cloud_name", "dx73");

    fetch("https://api.cloudinary.com/v1_1/dx73/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch("https://vast-river-59602.herokuapp.com/createpost", {
      method: "post",
      headers: { "Content-Type": "application/json",
      "Authorization":"Bearer "+localStorage.getItem("jwt") },
      body: JSON.stringify({
        title,
        body,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-3" });
        } else {
          M.toast({
            html: "Created Post Successfully",
            classes: "#43a047 green darken-1",
          });
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className="card input-field"
      style={{
        margin: "30px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="Caption"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        type="text"
        placeholder="Body"
        onChange={(e) => setBody(e.target.value)}
        value={body}
      />
      <div className="file-field input-field">
        <div className="create_btn">
        <i class="small material-icons">
add_photo_alternate</i>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        onClick={() => postDetails()}
        className="create_btn waves-effect waves-light"
      >
        <i class="small material-icons">
send</i>

      </button>
    </div>
  );
};

export default CreatePost;
