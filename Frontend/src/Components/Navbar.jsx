import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className="flex flex-row justify-center gap-5 mt-10 mb-10 font-bold underline">
      <Link to="/">Home</Link>
      <Link to="/interview">Interview</Link>
      <Link to="/progress">Progress</Link>
      {user ? (
        <Link to="/" onClick={() => localStorage.removeItem("userData")}>
          Logout
        </Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
};
