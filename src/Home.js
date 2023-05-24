import React, { useContext, useState, useEffect } from "react";
import { store } from "./App";

import axios from "axios";

const Home = () => {
  const [token, setToken] = useContext(store);
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:5000/myprofile", {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  if (!token) {
    return (
      data && (
        <center>
          {" "}
          <h2 class="card-title" style={{ color: "navy" }}>
            Welcome Guest!
          </h2>
        </center>
      )
    );
  }

  return (
    <div>
      {data && (
        <center>
          <br />
          <div class="card" style={{ width: "18rem" }}>
            <div class="card-body">
              <h2 class="card-title" style={{ color: "green" }}>
                Welcome {data.firstName}!
              </h2>
            </div>
          </div>
        </center>
      )}
    </div>
  );
};

export default Home;
