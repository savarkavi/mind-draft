import { Button } from "@/components/ui/button";
import { Doc, Id } from "../../../../../convex/_generated/dataModel";
import { Eye, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";

const DocumentCard = ({
  document,
  idx,
  length,
}: {
  document: Doc<"documents">;
  idx: number;
  length: number;
}) => {
  const deleteDocument = useMutation(api.documents.deleteDocument);

  const onDocumentDelete = (id: Id<"documents">) => {
    const promise = deleteDocument({ documentId: id });

    toast.promise(promise, {
      loading: "Deleting document",
      success: "Document deleted",
      error: "Failed to delete the document",
    });
  };

  return (
    <div
      className={cn(
        "bg-[#EFE4CF] p-4 rounded-lg flex flex-col gap-4 justify-between w-full max-w-[350px] h-[350px] shadow-lg"
      )}
    >
      <div className="flex flex-col gap-6 overflow-y-auto">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">{document.title}</h2>
          <AlertDialog>
            <AlertDialogTrigger>
              <Trash className="w-4 h-4 shrink-0" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-left">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-left">
                  This action cannot be undone. This will permanently delete
                  your document.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDocumentDelete(document._id)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <p className="text-sm">{document.description}</p>
      </div>
      <Button className="bg-[#4dc88a]">
        <Link
          href={`/home/documents/${document._id}`}
          className="w-full flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          <span>View</span>
        </Link>
      </Button>
    </div>
  );
};

export default DocumentCard;
