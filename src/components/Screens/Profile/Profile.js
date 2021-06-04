import React, { useEffect, useState, useContext } from "react";
import {UserContext} from '../../../App'
const Profile = () => {
  const [mypics, setPics] = useState([]);
  const {state, dispatch} = useContext(UserContext)
  useEffect(() => {
    fetch('/mypost', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(result => {
        setPics(result.mypost)
      })
  }, [])
  return (
    <div style={{ maxWidth: "550px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            src="https://images.unsplash.com/photo-1612024638904-bda171b93c66?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            alt=""
          />
        </div>
        <div>
          <h4>{state?state.name:"loading"}</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <div>20 posts</div>
            <div>20 followers</div>
            <div>20 following</div>
          </div>
        </div>
      </div>

      <div className="gallery">
        {
          mypics.map(item => {
            return (
              <img
                className="gallery-items"
                src={item.photo}
                alt={item.title}
                key={item._id}
              />
            )
          })
        }
      </div>
    </div>
  );
};

export default Profile;
