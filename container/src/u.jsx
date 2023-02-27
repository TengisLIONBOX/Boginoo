import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export const U = () => {
  const location = useLocation();

  const bairshil = location.pathname;
  useEffect(() => {
    const dataRetriever = async () => {
      await axios
        .get(`https://boginoo-chi.vercel.app/urlid${bairshil}`)
        .then((response) => {
          console.log(response?.data);
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
