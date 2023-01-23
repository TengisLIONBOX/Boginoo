import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "../App.css";
import { Logo } from "../logo";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  const checkUser = () => {
    const user = localStorage.getItem("user");
    if (user) navigate("/");
  };

  useEffect(() => {
    checkUser();
  }, []);
  const [tokenn, setTokenn] = useState("");
  const [token, setToken] = useState();
  const [emailValue, setEmail] = useState("");
  const [passValue, setPassvalue] = useState("");
  const dataRetriever = async () => {
    const inputid = document.getElementById("emailid");
    const passid = document.getElementById("passid");
    await axios
      .post("http://localhost:3333/login/", {
        email: emailValue,
        password: passValue,
      })
      .then((response) => {
        console.log("ehhehe");
        console.log(response?.data);
        if (
          response?.data === "Invalid password or email" ||
          response?.data === " You don't have any user account, please sign up "
        ) {
          inputid.style.boxShadow = "rgba(255, 0, 0, 0.658) 0px 3px 8px";
          passid.style.boxShadow = "rgba(255, 0, 0, 0.658) 0px 3px 8px";
        } else {
          localStorage.setItem("token", response?.data.token);
          localStorage.setItem("user", response?.data.user._id);
          console.log(response?.data);
          window.location.href = "/";
        }
      });
    setTokenn(token);
  };

  return (
    <div className="App">
      <div className="daddy">
        <div style={{ marginTop: "10vh" }}>
          <Logo />
        </div>
        <div className="loginbody">
          <p className="logintxt1">Нэвтрэх</p>
          <div className="inputgrp" style={{ paddingBottom: "30px" }}>
            <p className="logintxt2"> Цахим хаяг</p>
            <input
              id="emailid"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="name@mail.domain"
              className="logininput"
            ></input>
          </div>
          <div className="inputgrp">
            <p className="logintxt2">Нууц үг</p>
            <input
              id="passid"
              onChange={(e) => setPassvalue(e.target.value)}
              type="password"
              placeholder="••••••••••"
              className="logininput"
            ></input>
          </div>
          <div className="loginlinks" style={{ paddingBottom: "35px" }}>
            <div className="checkbox">
              <input type="checkbox" id="scales" name="scales" />
              <label for="scales">Намайг сана</label>
            </div>
            <Link to="/forgotpass" style={{ color: "black" }}>
              Нууц үгээ мартсан
            </Link>
          </div>
          <button
            className="grnbtn"
            style={{ width: "400px" }}
            onClick={dataRetriever}
          >
            Нэвтрэх
          </button>
          <Link to="/signup" style={{ color: "#02b589", paddingTop: "20px" }}>
            Шинэ хэрэглэгч бол энд дарна уу?
          </Link>
        </div>
      </div>
    </div>
  );
}
