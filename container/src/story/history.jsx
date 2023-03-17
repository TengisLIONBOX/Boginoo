import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { Logo } from "../logo";

export function History() {
  const navigate = useNavigate();

  const checkUser = () => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  };

  useEffect(() => {
    checkUser();
  }, []);
  const [save, setSave] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [prev, setPrev] = useState(true);

  useEffect(() => {
    const dataRetriever = async () => {
      await axios({
        url: `https://boginoo-chi.vercel.app/users/${localStorage.getItem(
          "user"
        )}?page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response) => {
        console.log(response);
        console.log(response.data);
        setSave(response);
      });
    };
    dataRetriever();
  }, [page]);

  if (save?.data?.length === 0) {
    setTimeout(() => {
      setPage(1);
    }, 1);
  }

  return (
    <div>
      <div>
        <Logo />
        <div className="boginosgohinput">
          <input
            placeholder="https://www.web-huudas.mn"
            className="homeinput"
          ></input>
          <div style={{ paddingLeft: "15px" }}>
            <button className="grnbtn">Богиносгох</button>
          </div>
        </div>
        <p className="tuuhtxt">Түүх</p>
        {save?.data?.map((el) => {
          return (
            <div className="bigurlgrp">
              <div className="urlgrp">
                <p style={{ color: "grey" }}>Өгөгдсөн холбоос:</p>
                {el.origUrl}
              </div>
              <div className="urlgrp2">
                <div style={{ paddingLeft: "100px" }}>
                  <p style={{ color: "grey" }} id="shorturl">
                    Богино холбоос:
                  </p>
                  https://boginooshorter.vercel.app/{el.shortUrl}
                </div>
              </div>
            </div>
          );
        })}
        <div className="btns">
          {prev ? (
            <button
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                }
              }}
              className="grnbtn"
            >
              Previous
            </button>
          ) : (
            <></>
          )}
          <button onClick={() => setPage(page + 1)} className="grnbtn">
            next
          </button>
        </div>
      </div>
    </div>
  );
}
