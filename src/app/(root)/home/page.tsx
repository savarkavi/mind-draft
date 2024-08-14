import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import HomeContainer from "../_components/HomeContainer";

const HomePage = async () => {
  return (
    <div className="flex justify-center h-full">
      <HomeContainer />
    </div>
  );
};

export default HomePage;
