import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  ChevronsLeftIcon,
  CirclePlus,
  File,
  ScrollText,
  Search,
  Settings,
  Trash,
} from "lucide-react";
import Item from "./Item";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

const Sidebar = ({ onChevronClick }: { onChevronClick: () => void }) => {
  const { user } = useUser();

  if (!user) {
    return;
  }

  const notes = useQuery(api.notes.getNotes);

  const createNote = useMutation(api.notes.createNote);

  const onCreateNote = () => {
    const promise = createNote({ title: "Untitled" });

    toast.promise(promise, {
      loading: "Creating a new note ...",
      success: "New note created",
      error: "Failed to create a note",
    });
  };

  return (
    <div className={cn("bg-[#EFE4CF] h-screen shadow-md w-full")}>
      <div className="flex justify-between mb-12">
        <div className="flex items-center gap-4 justify-between cursor-pointer hover:bg-gray-500/10 w-full p-4">
          <div className="flex gap-4 items-center">
            <UserButton showName />
          </div>
          <ChevronsLeftIcon
            className="cursor-pointer"
            onClick={() => onChevronClick()}
          />
        </div>
      </div>
      <Item label="Search" icon={Search} onClick={() => {}} />
      <Item label="New Note" icon={CirclePlus} onClick={onCreateNote} />
      {notes?.map((note) => (
        <Item
          key={note._id}
          label="Untitled"
          icon={File}
          isNote
          onClick={() => {}}
        />
      ))}
      <Item label="Documents" icon={ScrollText} onClick={() => {}} />
      <Item label="Trash" icon={Trash} onClick={() => {}} />
      <Item label="Settings" icon={Settings} onClick={() => {}} />
    </div>
  );
};

export default Sidebar;
