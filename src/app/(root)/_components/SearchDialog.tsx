import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Doc } from "../../../../convex/_generated/dataModel";

const SearchDialog = ({
  open,
  setOpen,
  notes,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notes: Doc<"notes">[] | undefined;
}) => {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="notes">
          {!notes ? (
            <p>No notes found.</p>
          ) : (
            notes.map((note) => {
              return <CommandItem key={note._id}>{note.title}</CommandItem>;
            })
          )}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchDialog;
