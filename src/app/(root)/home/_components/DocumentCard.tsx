import { Button } from "@/components/ui/button";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const DocumentCard = ({
  document,
  idx,
  length,
}: {
  document: Doc<"documents">;
  idx: number;
  length: number;
}) => {
  return (
    <div
      className={cn(
        "bg-[#EFE4CF] p-4 rounded-lg flex flex-col gap-4 justify-between w-full max-w-[350px] h-[350px] shadow-lg"
      )}
    >
      <div className="flex flex-col gap-4 overflow-y-auto">
        <h2 className="text-xl font-semibold">{document.title}</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
          necessitatibus ab porro praesentium corrupti reiciendis recusandae id
          architecto omnis harum pariatur officiis sunt aperiam. Ex maxime sint
          modi ea earum omnis deserunt aliquid quisquam ullam quidem eos labore
        </p>
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
