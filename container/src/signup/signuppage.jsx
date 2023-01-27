import React from "react";
import axios from "axios";
import { useState } from "react";
import "../App.css";
import { Logo } from "../logo";

export const Signup = () => {
  const [signup, setSignup] = useState(false);
  const [emailValue, setEmail] = useState("");
  const [passValue, setPassvalue] = useState("");
  const [passValue2, setPassvalue2] = useState("");

  const dataRetriever = async () => {
    try {
      if (emailValue === "" && passValue === "") {
        document.getElementById("emailid").style.boxShadow =
          "rgba(255, 0, 0, 0.658) 0px 3px 8px";
        document.getElementById("passid").style.boxShadow =
          "rgba(255, 0, 0, 0.658) 0px 3px 8px";
        document.getElementById("passid2").style.boxShadow =
          "rgba(255, 0, 0, 0.658) 0px 3px 8px";
      } else {
        if (passValue === passValue2) {
          const result = await axios.post("http://localhost:3333/user/", {
            email: emailValue,
            password: passValue,
          });
          setSignup(result);
          document.getElementById("emailid").value = "";
          document.getElementById("passid").value = "";
          document.getElementById("passid2").value = "";
          alert("Amjilttai burtgegdlee!");
          window.location.href = "/login";
        } else {
          alert("Password is not equal!");
          document.getElementById("passid").style.boxShadow =
            "rgba(255, 0, 0, 0.658) 0px 3px 8px";
          document.getElementById("passid2").style.boxShadow =
            "rgba(255, 0, 0, 0.658) 0px 3px 8px";
        }
      }
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="App">
      <div className="daddy">
        <div style={{ marginTop: "10vh" }}>
          <Logo />
        </div>
        <div className="loginbody">
          <p className="logintxt1">Бүртгүүлэх</p>

          <div className="inputgrp" style={{ paddingBottom: "25px" }}>
            <p className="logintxt2"> Цахим хаяг</p>
            <input
              id="emailid"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="name@mail.domain"
              className="logininput"
            ></input>
          </div>
          <div className="inputgrp" style={{ paddingBottom: "25px" }}>
            <p className="logintxt2">Нууц үг</p>
            <input
              id="passid"
              onChange={(e) => setPassvalue(e.target.value)}
              type="password"
              placeholder="••••••••••"
              className="logininput"
            ></input>
          </div>
          <div className="inputgrp" style={{ paddingBottom: "30px" }}>
            <p className="logintxt2">Нууц үгээ давтна уу?</p>
            <input
              id="passid2"
              onChange={(e) => setPassvalue2(e.target.value)}
              type="password"
              placeholder="••••••••••"
              className="logininput"
            ></input>
          </div>

          <button
            onClick={dataRetriever}
            className="grnbtn"
            style={{ width: "400px" }}
          >
            Нэвтрэх
          </button>
        </div>
      </div>
    </div>
  );
};
