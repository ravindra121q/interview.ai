import axios from "axios";
import React, { useEffect } from "react";
// import dotenv from "dotenv";

// dotenv.config();
import Stacked from "../Components/Stacked";
import Button from "../Components/Button";
import { earningData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
export const HomePage = () => {
  const { currentColor, currentMode } = useStateContext();
  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center"></div>
      </div>

      <div>
        <h1 className="font-bold text-3xl">
          Welcome to our Ai based Interview website
        </h1>
        <div>
          <h3>you are one step ahead towards your success</h3>
        </div>
      </div>
    </div>
  );
};
