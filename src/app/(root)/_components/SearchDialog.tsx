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
  documents,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notes: Doc<"notes">[] | undefined;
  documents: Doc<"documents">[] | undefined;
}) => {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Type a command or search..."
        disabled={notes?.length === 0 && documents?.length === 0}
      />
      {notes?.length === 0 && documents?.length === 0 ? (
        <div className="px-4 py-8 text-center">
          There are no notes or documents
        </div>
      ) : (
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
          <CommandGroup heading="documents">
            {!documents ? (
              <p>No documents found.</p>
            ) : (
              documents.map((document) => {
                return (
                  <CommandItem key={document._id}>{document.title}</CommandItem>
                );
              })
            )}
          </CommandGroup>
        </CommandList>
      )}
    </CommandDialog>
  );
};

export default SearchDialog;
