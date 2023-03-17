import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export const U = () => {
  const location = useLocation();

  const bairshil = location.pathname;
  useEffect(() => {
    const dataRetriever = async () => {
      await axios({
        url: `https://boginoo-chi.vercel.app/urlid/${bairshil}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response) => {
        if (response?.data) {
          console.log(response?.data);
          window.location.href = response?.data;
        }
      });
    };
    if (
      bairshil !== "/" ||
      bairshil !== "login" ||
      bairshil !== "/signup" ||
      bairshil !== "/forgotpass" ||
      bairshil !== "/history"
    ) {
      dataRetriever();
    }
  }, [bairshil]);

  return <div></div>;
};
