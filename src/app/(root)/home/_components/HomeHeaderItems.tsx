import { useMutation, useQuery } from "convex/react";
import { Ellipsis, Trash } from "lucide-react";
import React, { useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useParams, useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteDialog from "@/components/DeleteDialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const HomeHeaderItems = () => {
  const { id } = useParams();
  const note = useQuery(api.notes.getNote, { id: id as Id<"notes"> });
  const restoreNote = useMutation(api.notes.restoreNote);
  const deleteNote = useMutation(api.notes.deleteNote);

  const router = useRouter();

  if (!note) return;

  const onRestoreNote = (id: Id<"notes">) => {
    const promise = restoreNote({ id });

    toast.promise(promise, {
      loading: "restoring note...",
      success: "Note Restored",
      error: "Failed to restore the note",
    });
  };

  const onDeleteNote = async (id: Id<"notes">) => {
    const promise = deleteNote({ id });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Not deleted",
      error: "Failed to delete the note",
    });

    router.push("/home");
  };

  const createdAt = new Date(note?._creationTime);
  let formattedDate = createdAt.toLocaleDateString("en-US");

  return (
    <div className="w-full">
      {note.isArchived ? (
        <div className="bg-red-400 w-full p-4 flex justify-center items-center gap-4 rounded-md">
          <p className="text-white">This note is Archived.</p>
          <div className="flex items-center gap-4">
            <Button
              size="sm"
              className="text-sm"
              onClick={() => onRestoreNote(note._id)}
            >
              Restore
            </Button>
            <Button
              size="sm"
              className="text-sm"
              onClick={() => onDeleteNote(note._id)}
            >
              Delete forever
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between w-full">
          <h2 className="text-xl font-semibold cursor-default">
            {note?.title}
          </h2>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <DeleteDialog note={note} isPage />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <p>{`Created on ${formattedDate}`}</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export default HomeHeaderItems;
