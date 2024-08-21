import { useMutation, useQuery } from "convex/react";
import { ArchiveRestore, Loader2, Search, Trash } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { toast } from "sonner";
import DeleteDialog from "@/components/DeleteDialog";
import { useRouter } from "next/navigation";

const TrashContent = () => {
  const archivedNotes = useQuery(api.notes.getArchivedNotes);
  const restoreNote = useMutation(api.notes.restoreNote);

  const router = useRouter();

  const onRestoreNote = (id: Id<"notes">) => {
    const promise = restoreNote({ id });

    toast.promise(promise, {
      loading: "restoring note...",
      success: "Note Restored",
      error: "Failed to restore the note",
    });
  };

  const onNoteClick = (id: string) => {
    router.push(`/home/notes/${id}`);
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
                onClick={() => onNoteClick(note._id)}
              >
                <h2>{note.title}</h2>
                <div className="flex gap-4 items-center">
                  <ArchiveRestore
                    className="w-5 h-5 text-green-500 shrink-0"
                    onClick={() => onRestoreNote(note._id)}
                  />
                  <DeleteDialog note={note} />
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
