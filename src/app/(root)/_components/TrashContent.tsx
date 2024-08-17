import { useMutation, useQuery } from "convex/react";
import { ArchiveRestore, Loader2, Search, Trash } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const TrashContent = () => {
  const archivedNotes = useQuery(api.notes.getArchivedNotes);
  const deleteNote = useMutation(api.notes.deleteNote);
  const restoreNote = useMutation(api.notes.restoreNote);

  const onDeleteNote = (id: Id<"notes">) => {
    const promise = deleteNote({ id });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted",
      error: "Failed to delete the note",
    });
  };

  const onRestoreNote = (id: Id<"notes">) => {
    const promise = restoreNote({ id });

    toast.promise(promise, {
      loading: "restoring note...",
      success: "Note Restored",
      error: "Failed to restore the note",
    });
  };

  return (
    <div>
      <div className="flex gap-4 items-center">
        <Search className="shrink-0 w-5 h-5" />
        <input
          className="p-2 outline-none rounded-lg"
          placeholder="search for notes"
        />
      </div>
      <div className="mt-10">
        {archivedNotes?.length === 0 && (
          <p className="text-center">No archived notes available.</p>
        )}
        {archivedNotes === undefined ? (
          <div className="w-full flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          archivedNotes?.map((note) => {
            return (
              <div
                key={note._id}
                className="p-2 flex justify-between hover:bg-gray-500/10 cursor-pointer"
              >
                <h2>{note.title}</h2>
                <div className="flex gap-4 items-center">
                  <ArchiveRestore
                    className="w-5 h-5 text-green-500"
                    onClick={() => onRestoreNote(note._id)}
                  />
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Trash className="w-5 h-5 text-red-400" />
                    </AlertDialogTrigger>
                    <AlertDialogContent className="z-[9999]">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Do you want to delete this note?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete your note and cannot be
                          restored.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDeleteNote(note._id)}
                          className="bg-red-500"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TrashContent;
