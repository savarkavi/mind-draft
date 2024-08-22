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
