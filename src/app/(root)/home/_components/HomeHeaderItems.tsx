import { useQuery } from "convex/react";
import { Ellipsis, Trash } from "lucide-react";
import React, { useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useParams } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteDialog from "@/components/DeleteDialog";

const HomeHeaderItems = () => {
  const { id } = useParams();
  const note = useQuery(api.notes.getNote, { id: id as Id<"notes"> });

  if (!note) return;

  const createdAt = new Date(note?._creationTime);
  let formattedDate = createdAt.toLocaleDateString("en-US");

  return (
    <div className="flex justify-between w-full">
      <h2 className="text-xl font-semibold cursor-default">{note?.title}</h2>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <DeleteDialog note={note} />
            {/* <div className="flex items-center gap-2">
              <Trash className="w-5 h-5" />
              <span>Delete</span>
            </div> */}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <p>{`Created on ${formattedDate}`}</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HomeHeaderItems;
