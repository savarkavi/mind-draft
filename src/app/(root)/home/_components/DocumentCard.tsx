import { Button } from "@/components/ui/button";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { Eye } from "lucide-react";

const DocumentCard = ({ document }: { document: Doc<"documents"> }) => {
  return (
    <div className="bg-[#EFE4CF] p-4 rounded-lg flex flex-col gap-4 justify-between w-full max-w-[300px] h-[300px]">
      <h2 className="text-xl font-semibold">{document.title}</h2>
      <p>this is a summary of the document</p>
      <Button className="flex items-center gap-2 bg-[#4dc88a]">
        <Eye className="w-4 h-4" />
        <span>View</span>
      </Button>
    </div>
  );
};

export default DocumentCard;
