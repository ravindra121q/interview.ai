import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="flex flex-row justify-center gap-5 mt-10 mb-10 font-bold underline">
      <Link to="/">Home</Link>
      <Link to="/interview">Interview</Link>
      <Link to="/progress">Progress</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};
