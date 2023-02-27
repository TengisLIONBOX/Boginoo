import React from "react";
import axios from "axios";
import "../App.css";
import { Logo } from "../logo";
import emailjs from "@emailjs/browser";
import { useState } from "react";

export const Forgotpass = () => {
  const [too, setToo] = useState("");
  const [resetValue, setResetValue] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [id, setId] = useState("");
  const [passValue, setPassValue] = useState("");

  const generator = () => {
    const minm = 100000;
    const maxm = 999999;
    const output = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    return output;
  };
  const dataRetriever = async () => {
    try {
      const output = generator();
      setToo(output);
      emailjs.send(
        "service_zddymub",
        "template_owc1pob",
        {
          verify_code: output,
          send_to: emailValue,
        },
        "CrUADr8S7uiZ8X8Yr"
      );
      document.getElementById("resetid").style.display = "block";
      document.getElementById("inputid").style.display = "none";
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleNameChange = (e) => {
    setResetValue(e.target.value.slice(0, 6));
  };
  const reset = () => {
    console.log("reset", resetValue, "output");

    document.getElementById("resetid").style.boxShadow =
      "rgba(255, 0, 0, 0.658) 0px 3px 8px";

    if (resetValue === too) {
      document.getElementById("resetid").style.display = "none";
      document.getElementById("updateid").style.display = "block";
    }
  };

  const dataChanger = async () => {
    await axios.get("https://boginoo-chi.vercel.app/user/").then((response) => {
      response?.data?.map(function (b) {
        if (b.email === emailValue) {
          setId(b._id);
        }
      });
    });
    await axios
      .put(`https://boginoo-chi.vercel.app/user/${id}`, {
        email: emailValue,
        password: passValue,
      })
      .then((response) => {
        console.log(response.data);
      });
    console.log(id, emailValue);
    window.location.href = "/login";
  };
  return (
    <div className="App">
      <div className="daddy">
        <div style={{ marginTop: "10vh" }}>
          <Logo />
        </div>
        <div className="loginbody">
          <p className="logintxt1">Нууц үг сэргээх</p>
          <div id="inputid">
            <p
              style={{
                maxWidth: "250px",
                paddingLeft: "20%",
                paddingBottom: "20px",
                textAlign: "center",
              }}
            >
              Бид таны цахим хаяг руу нууц үг сэргээх хаяг явуулах болно.
            </p>

            <div
              className="inputgrp"
              style={{ paddingBottom: "30px" }}
              value={resetValue}
              id="inputreset"
            >
              <p className="logintxt2">Цахим хаяг</p>
              <input
                onChange={(e) => setEmailValue(e.target.value)}
                type="email"
                placeholder="name@mail.domain"
                className="logininput"
              ></input>
            </div>
            <button
              className="grnbtn"
              style={{ width: "400px" }}
              onClick={dataRetriever}
            >
              Илгээх
            </button>
          </div>
          <div
            className="inputgrp"
            style={{
              paddingTop: "30px",
              paddingBottom: "30px",
            }}
          >
            <div id="resetid" style={{ display: "none" }}>
              <input
                value={resetValue}
                type="number"
                placeholder="Reset pass"
                className="logininput"
                onChange={handleNameChange}
              />

              <button onClick={reset} className="grnbtn">
                Илгээх
              </button>
            </div>
          </div>
          <div id="updateid" style={{ display: "none" }}>
            <p className="logintxt1">New password:</p>
            <input
              onChange={(e) => setPassValue(e.target.value)}
              type="password"
              placeholder="New Password"
              className="logininput"
              id="passid"
            ></input>
            <button
              className="grnbtn"
              style={{ width: "100px" }}
              onClick={dataChanger}
            >
              Илгээх
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
