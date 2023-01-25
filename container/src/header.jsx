import React from "react";
import axios from "axios";
import "./App.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export function Header() {
  useEffect(() => {
    if (localStorage.getItem("user")) {
      axios({
        url: "http://localhost:3333/user/",
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          console.log(response);
          response?.data?.forEach((el) => {
            if (localStorage.getItem("user") === el._id) {
              const emname = el.email;
              const signin = document.getElementById("nevtreh");
              const username = document.getElementById("user");
              document.getElementById("user").innerHTML = emname;
              signin.style.display = "none";
              username.style.display = "block";
            }
          });
        })
        .catch((err) => {
          console.log(err.message);
          localStorage.clear();
        });
    }
  });

  const expander = () => {
    document.getElementById("users").style.display = "block";
    document.getElementById("logout").style.display = "block";
  };

  const Logoutt = () => {
    localStorage.clear();
    window.location.href = "/login";
    document.getElementById("nevtreh").style.display = "block";
    document.getElementById("buhbtn").style.display = "none";
  };

  const history = () => {
    window.location.href = "/history";
  };

  return (
    <div className="btndad">
      <p style={{ textDecoration: "none", paddingRight: "40px" }}>
        <p className="btn1">ХЭРХЭН АЖИЛЛАДАГ ВЭ?</p>
      </p>
      <div style={{ paddingTop: "20px", paddingRight: "20px" }}>
        <Link to="/login">
          <button id="nevtreh" className="grnbtn">
            Нэвтрэх
          </button>
        </Link>
      </div>
      <div className="buttons" id="buhbtn">
        <button
          id="user"
          className="whitebtn"
          style={{
            width: "auto",
            marginTop: "20px",
            display: "none",
            marginRight: "30px",
          }}
          onClick={expander}
        ></button>
        <button
          id="users"
          className="grnbtn"
          style={{ marginTop: "7px", display: "none" }}
          onClick={history}
        >
          History
        </button>
        <button
          id="logout"
          className="grnbtn"
          style={{ marginTop: "7px", display: "none" }}
          onClick={Logoutt}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
