import { cn } from "@/lib/utils";
import { LucideIcon, Trash2 } from "lucide-react";

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
import { Id } from "../../../../convex/_generated/dataModel";

interface ItemProps {
  label: string;
  icon: LucideIcon;
  isNote?: boolean;
  onClick: (data?: any) => void;
  onArchiveNote?: (id: Id<"notes">) => void;
  noteId?: Id<"notes">;
  className?: string;
}

const Item = ({
  label,
  icon: Icon,
  isNote,
  onClick,
  onArchiveNote,
  noteId,
  className,
}: ItemProps) => {
  return (
    <div
      className={cn(
        "group flex justify-between items-center text-gray-600 cursor-pointer hover:bg-gray-500/10 p-4",
        className
      )}
      onClick={() => (isNote ? onClick(noteId) : onClick())}
    >
      <div
        className={cn(
          "flex items-center gap-4",
          isNote && "pl-[40px] font-bold"
        )}
      >
        <Icon className="w-5 h-5 shrink-0" />
        <span className="shrink-0">{label}</span>
      </div>
      {isNote && (
        <AlertDialog>
          <AlertDialogTrigger>
            <Trash2 className="w-5 h-5 hidden group-hover:block" />
          </AlertDialogTrigger>
          <AlertDialogContent className="z-[9999]">
            <AlertDialogHeader>
              <AlertDialogTitle>
                Do you want to archive this note?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will not permanently delete your note and can be restored
                from trash.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (noteId && onArchiveNote) {
                    onArchiveNote(noteId);
                  }
                }}
              >
                Archive
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default Item;
