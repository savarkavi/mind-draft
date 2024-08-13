import { platypi } from "@/app/(marketing)/_components/Heading";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";

const HomePage = async () => {
  const user = await currentUser();

  return (
    <div className="flex justify-center h-full">
      <div className="flex flex-col items-center mt-32">
        <div className="relative w-[350px] h-[350px]">
          <Image
            src="/Idea.png"
            alt="home page image"
            fill
            className="object-contain"
          />
        </div>
        <h1
          className={`text-[#4dc88a] font-bold text-2xl ${platypi.className}`}
        >{`Welcome to MindDraft, ${user?.username?.toUpperCase()}`}</h1>
      </div>
    </div>
  );
};

export default HomePage;
