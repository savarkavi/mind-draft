"use client";

import { useEffect, useState } from "react";
import Sidebar from "./_components/Sidebar";
import { useMediaQuery } from "usehooks-ts";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { Menu, MenuIcon } from "lucide-react";

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isCollapsed, setIsCollapased] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const onChevronClick = () => {
    setIsCollapased(true);
  };

  const onMenuClick = () => {
    setIsCollapased(false);
  };

  useEffect(() => {
    if (isMobile) {
      setIsCollapased(true);
    } else {
      setIsCollapased(false);
    }
  }, [isMobile]);

  console.log("isMobile:" + isMobile);
  console.log("isCollapsed:" + isCollapsed);

  return (
    <div className="flex">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          className={cn(
            "transition-all",
            !isCollapsed ? "min-w-[288px] max-w-[800px]" : "w-0 min-w-0"
          )}
        >
          <Sidebar onChevronClick={onChevronClick} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={850} className="p-4">
          <div className="h-8">
            {isCollapsed && (
              <Menu className="cursor-pointer" onClick={onMenuClick} />
            )}
          </div>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default HomeLayout;
