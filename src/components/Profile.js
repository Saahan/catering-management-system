import React, { useState } from "react";
import "../styles/views.css";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";

export default function Profile(props) {
  const storage = getStorage();
  const storageRef = ref(storage, `/profile-pics/${props.userData.uid}`);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    let profilePic = e.target[0].files[0];
    //console.log(e.target[0].files[0]);
    if (profilePic && profilePic.size < 1024000) {
      uploadBytes(storageRef, profilePic).then((snapshot) => {
        console.log("Uploaded a blob or file!");
        navigate(0);
      });
    } else if (profilePic === undefined) {
      setMessage("No file selected");
    } else {
      setMessage("Please keep file size under 1MB");
    }
  }

  return (
    <div className="container">
      <h1>Profile</h1> <hr />
      <h5>Personal Details:</h5>
      <div className="profile-div">
        <p>Name: {props.userData.fname + " " + props.userData.lname}</p>
        <p>Email: {props.userData.email}</p>
        <p>Phone Number: {props.userData.phoneNumber}</p>
        <p>Account Type: {props.userData.accountType}</p>
        <hr />
        <form onSubmit={handleSubmit}>
          <label htmlFor="profile-pic" style={{ marginBottom: "10px" }}>
            Upload/Change Profile Picture:
          </label>
          <input type="file" id="profile-pic" accept="image/png, image/jpeg" />
          <Button variant="primary" className="btn-upload" type="submit">
            Save
          </Button>
        </form>
        <hr />
        {message !== "" && <p style={{ color: "red" }}>{message}</p>}
      </div>
    </div>
  );
}
