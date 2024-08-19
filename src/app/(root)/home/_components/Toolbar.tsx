import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "../../../../../convex/_generated/dataModel";
import { Loader } from "lucide-react";
import Title from "./Title";
import Editor from "./Editor";

const Toolbar = () => {
  const { id } = useParams();
  const note = useQuery(api.notes.getNote, { id: id as Id<"notes"> });

  if (!note) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="mt-32">
      <Title note={note} />
      <Editor note={note} />
    </div>
  );
};

export default Toolbar;
