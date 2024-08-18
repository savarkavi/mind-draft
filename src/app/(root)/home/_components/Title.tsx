import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Doc } from "../../../../../convex/_generated/dataModel";

const Title = ({ note }: { note: Doc<"notes"> }) => {
  const [title, setTitle] = useState(note.title);

  return (
    <TextareaAutosize
      className="bg-[#F3EBDB] text-5xl font-bold focus:outline-none"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
};

export default Title;
