import React, { Children, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return children;
};
