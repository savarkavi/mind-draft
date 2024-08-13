"use client";

import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";
import { ChevronsLeftIcon } from "lucide-react";

const Sidebar = ({ onChevronClick }: { onChevronClick: () => void }) => {
  const { user } = useUser();

  return (
    <div className={cn("bg-[#EFE4CF] h-screen shadow-md w-full")}>
      <div className="flex justify-between">
        <div className="flex items-center gap-4 justify-between cursor-pointer hover:bg-gray-500/10 p-4 w-full">
          <div className="flex gap-4 items-center">
            <UserButton showName />
          </div>
          <ChevronsLeftIcon
            className="cursor-pointer"
            onClick={() => onChevronClick()}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
