import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../Pages/HomePage";
import { InterviewPage } from "../Pages/InterviewPage";
import { ProgressPage } from "../Pages/ProgressPage";
import { LoginPage } from "../Pages/LoginPage";
import { RegisterPage } from "../Pages/RegisterPage";
import { PrivateRoute } from "./PrivateRoute";

export const All_Routes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route
        path="/interview"
        element={
          <PrivateRoute>
            <InterviewPage />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/progress"
        element={
          <PrivateRoute>
            <ProgressPage />
          </PrivateRoute>
        }
      ></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="*" element={<h1>404 Page Not Found</h1>}></Route>
    </Routes>
  );
};
