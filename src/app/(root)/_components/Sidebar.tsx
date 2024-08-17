import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";
import { ChevronsLeftIcon } from "lucide-react";
import SidebarItems from "./SidebarItems";

const Sidebar = ({ onChevronClick }: { onChevronClick: () => void }) => {
  const { user } = useUser();

  if (!user) {
    return <div className="bg-[#EFE4CF] h-screen shadow-md w-full"></div>;
  }

  return (
    <div
      className={cn(
        "bg-[#EFE4CF] h-screen shadow-md w-full flex flex-col overflow-y-auto"
      )}
    >
      <div className="flex justify-between mb-12">
        <div className="flex items-center gap-4 justify-between cursor-pointer hover:bg-gray-500/10 w-full p-4">
          <div className="flex gap-4 items-center">
            <UserButton showName />
          </div>
          <ChevronsLeftIcon
            className="cursor-pointer"
            onClick={() => onChevronClick()}
          />
        </div>
      </div>
      <SidebarItems />
    </div>
  );
};

export default Sidebar;
