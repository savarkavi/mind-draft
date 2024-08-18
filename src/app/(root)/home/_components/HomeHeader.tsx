import { useQuery } from "convex/react";
import { Ellipsis, Menu } from "lucide-react";
import { useParams } from "next/navigation";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import HomeHeaderItems from "./HomeHeaderItems";
import { useUser } from "@clerk/nextjs";

const HomeHeader = () => {
  const { user } = useUser();

  if (!user) {
    return <div></div>;
  }

  return <HomeHeaderItems />;
};

export default HomeHeader;
