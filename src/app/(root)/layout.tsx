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
  const isMobile = useMediaQuery("(max-width: 1400px)");

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

  return (
    <div className="flex">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={15}
          minSize={15}
          maxSize={isCollapsed ? 0 : 50}
          className={cn(
            "transition-all",
            isMobile && "min-w-[288px] max-w-[800px]",
            isCollapsed ? "w-0 min-w-0" : "min-w-[288px] max-w-[800px]"
          )}
        >
          <Sidebar onChevronClick={onChevronClick} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="p-4" defaultSize={85}>
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
