import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { PartialBlock } from "@blocknote/core";

const Editor = ({ note }: { note: Doc<"notes"> }) => {
  const editor = useCreateBlockNote({
    initialContent: note.content
      ? (JSON.parse(note.content) as PartialBlock[])
      : undefined,
  });
  const changeNoteContent = useMutation(api.notes.changeNoteContent);

  return (
    <BlockNoteView
      editor={editor}
      theme="light"
      className="mt-14"
      onChange={() =>
        changeNoteContent({
          id: note._id,
          content: JSON.stringify(editor.document),
        })
      }
    />
  );
};

export default Editor;
