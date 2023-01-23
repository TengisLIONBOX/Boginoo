import React from "react";
import axios from "axios";
import { useState } from "react";
import "../App.css";
import { Logo } from "../logo";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Home() {
  const navigate = useNavigate();
  const [shorty, setShorty] = useState("");
  const [origUrl, setOrigUrl] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/login");
  }, []);

  const [hide, setHide] = useState(false);
  const [urlValue, setUrlvalue] = useState("");

  const dataRetriever = async () => {
    if (urlValue === "") {
    } else {
      try {
        const userId = localStorage.getItem("user");
        await axios
          .post("http://localhost:3333/url/", {
            userId: userId,
            origUrl: urlValue,
          })
          .then((response) => {
            setShorty(response?.data);
          });

        document.getElementById("originput").value = "";
      } catch (err) {
        console.log(err.message);
      }
      setOrigUrl(urlValue);
      setHide(true);
    }
  };
  return (
    <div className="App">
      <div className="daddy">
        <div style={{ paddingTop: "30vh" }}>
          <Logo />
        </div>
        <div className="boginosgohinput">
          <input
            placeholder="https://www.web-huudas.mn"
            id="originput"
            className="homeinput"
            onChange={(e) => setUrlvalue(e.target.value)}
          ></input>
          <div style={{ paddingLeft: "15px" }}>
            <button className="grnbtn" onClick={dataRetriever}>
              Богиносгох
            </button>
          </div>
        </div>
        {hide ? (
          <div className="homelink" id="links">
            <p style={{ color: "grey", marginBottom: "0" }}>
              Өгөгдсөн холбоос:
            </p>
            <p id="origlink" style={{ marginBottom: "20px" }}>
              {origUrl}
            </p>
            <p style={{ color: "grey", marginBottom: "0" }}>Богино холбоос:</p>
            <p id="shortlink">http://localhost:3000/{shorty}</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
