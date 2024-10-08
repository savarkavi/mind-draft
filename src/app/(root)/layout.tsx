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
import { Menu } from "lucide-react";
import HomeHeader from "./home/_components/HomeHeader";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isCollapsed, setIsCollapased] = useState(false);
  const isTablet = useMediaQuery("(max-width: 1400px)");
  const isMobile = useMediaQuery("(max-width: 640px)");
  const pathname = usePathname();

  const onChevronClick = () => {
    setIsCollapased(true);
  };

  const onMenuClick = () => {
    setIsCollapased(false);
  };

  useEffect(() => {
    if (isTablet) {
      setIsCollapased(true);
    } else {
      setIsCollapased(false);
    }
  }, [isTablet]);

  return (
    <div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={15}
          minSize={isMobile ? 100 : 15}
          maxSize={isCollapsed ? 0 : isMobile ? 100 : 50}
          className={cn(
            "transition-all relative",
            isTablet && "min-w-[288px] max-w-full",
            isCollapsed || (isCollapsed && isTablet)
              ? "w-0 min-w-0"
              : "min-w-[288px] max-w-full"
          )}
        >
          <Sidebar
            onChevronClick={onChevronClick}
            isTablet={isTablet}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapased}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={85}>
          <div className="flex gap-12 p-4">
            <div className="flex items-center gap-6">
              <Link href="/home">
                <Image src="/logo.png" alt="logo" width={42} height={42} />
              </Link>
              {isCollapsed && (
                <Menu className="cursor-pointer" onClick={onMenuClick} />
              )}
            </div>
            {pathname.includes("/notes") && <HomeHeader />}
          </div>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default HomeLayout;
