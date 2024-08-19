import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

const Title = ({ note }: { note: Doc<"notes"> }) => {
  const [title, setTitle] = useState(note.title);
  const changeNoteTitle = useMutation(api.notes.changeNoteTitle);

  const onTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    changeNoteTitle({ id: note._id, title: e.target.value });
  };

  return (
    <TextareaAutosize
      className="bg-[#F3EBDB] text-5xl font-bold focus:outline-none"
      value={title}
      onChange={onTitleChange}
    />
  );
};

export default Title;
