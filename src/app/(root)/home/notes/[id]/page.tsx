"use client";

import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Toolbar from "../../_components/Toolbar";

const NotePage = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="max-w-[800px] mx-auto h-full px-8">
      <Toolbar />
    </div>
  );
};

export default NotePage;
