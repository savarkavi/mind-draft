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
import { Doc, Id } from "../../convex/_generated/dataModel";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

const DeleteDialog = ({
  note,
  isPage,
}: {
  note: Doc<"notes">;
  isPage?: boolean;
}) => {
  const deleteNote = useMutation(api.notes.deleteNote);
  const router = useRouter();

  const onDeleteNote = async (id: Id<"notes">) => {
    const promise = deleteNote({ id });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Not deleted",
      error: "Failed to delete the note",
    });

    router.push("/home");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full flex items-center gap-2">
        <Trash className="w-5 h-5 text-red-400" />
        {isPage && <span>Delete</span>}
      </AlertDialogTrigger>
      <AlertDialogContent className="z-[9999]">
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to delete this note?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your note and cannot be restored.
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
  );
};

export default DeleteDialog;
