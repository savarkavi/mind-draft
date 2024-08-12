"use client";

import { cn } from "@/lib/utils";
import { ChevronsLeftIcon } from "lucide-react";
import { useState } from "react";

const Sidebar = ({ onChevronClick }: { onChevronClick: () => void }) => {
  return (
    <div className={cn("bg-[#EFE4CF] h-screen shadow-md p-4")}>
      <div className="flex justify-between">
        <div>Profile</div>
        <ChevronsLeftIcon
          className="cursor-pointer"
          onClick={() => onChevronClick()}
        />
      </div>
    </div>
  );
};

export default Sidebar;
