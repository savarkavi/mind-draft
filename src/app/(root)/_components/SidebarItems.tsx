import {
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
import { Id } from "../../../../convex/_generated/dataModel";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TrashContent from "./TrashContent";
import { useMediaQuery } from "usehooks-ts";
import SearchDialog from "./SearchDialog";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SidebarItems = ({
  isTablet,
  isCollapsed,
  setIsCollapsed,
}: {
  isTablet: boolean;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const notes = useQuery(api.notes.getNotes);
  const createNote = useMutation(api.notes.createNote);
  const archiveNote = useMutation(api.notes.archiveNote);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const onCreateNote = () => {
    const promise = createNote({ title: "Untitled" });

    toast.promise(promise, {
      loading: "Creating a new note ...",
      success: "New note created",
      error: "Failed to create a note",
    });
  };

  const onArchiveNote = (id: Id<"notes">) => {
    const promise = archiveNote({ id });

    toast.promise(promise, {
      loading: "Archiving your note ...",
      success: "Note archived",
      error: "Failed to archive the note",
    });
  };

  const onNoteClick = (id: Id<"notes">) => {
    router.push(`/home/notes/${id}`);

    if (isTablet) {
      setIsCollapsed(true);
    }
  };

  const onDocumentsClick = () => {
    router.push("/home/documents");

    if (isTablet) {
      setIsCollapsed(true);
    }
  };

  return (
    <div className="h-full relative">
      <SearchDialog open={searchOpen} setOpen={setSearchOpen} notes={notes} />
      <div>
        <Item
          label="Search"
          icon={Search}
          onClick={() => setSearchOpen(true)}
        />
        <Item
          label="New Note"
          icon={CirclePlus}
          className="w-full"
          onClick={onCreateNote}
        />
        {notes?.map((note) => (
          <Item
            key={note._id}
            label={note.title ? note.title : "Untitled"}
            icon={File}
            isNote
            onClick={onNoteClick}
            onArchiveNote={onArchiveNote}
            noteId={note._id}
          />
        ))}
        <Item label="Documents" icon={ScrollText} onClick={onDocumentsClick} />
        <Popover>
          <PopoverTrigger className="w-full">
            <Item label="Trash" icon={Trash} onClick={() => {}} />
          </PopoverTrigger>
          <PopoverContent
            side={isMobile ? "top" : "right"}
            className="bg-[#EFE4CF] w-full"
          >
            <TrashContent />
          </PopoverContent>
        </Popover>
      </div>
      <Item
        label="Settings"
        icon={Settings}
        onClick={() => {}}
        className="absolute bottom-0 left-0 bg-[#EFE4CF] w-full hover:bg-[#EFE4CF]"
      />
    </div>
  );
};

export default SidebarItems;
