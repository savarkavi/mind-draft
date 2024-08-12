import Image from "next/image";
import React from "react";

const HomePage = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative w-[350px] h-[350px]">
        <Image
          src="/Idea.png"
          alt="home page image"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default HomePage;
