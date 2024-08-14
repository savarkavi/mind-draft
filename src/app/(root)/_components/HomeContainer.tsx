"use client";

import { platypi } from "@/app/(marketing)/_components/Heading";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { Loader } from "lucide-react";
import Image from "next/image";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

const HomeContainer = () => {
  const { user } = useUser();

  const createNote = useMutation(api.notes.createNote);

  const onCreateNote = () => {
    const promise = createNote({ title: "Untitled" });

    toast.promise(promise, {
      loading: "Creating a new note ...",
      success: "New note created",
      error: "Failed to create a note",
    });
  };

  if (!user)
    return (
      <div className="flex items-center justify-center">
        <Loader className="animate-spin w-8 h-8" />
      </div>
    );

  return (
    <div className="flex flex-col items-center mt-32">
      <div className="relative w-[350px] h-[350px]">
        <Image
          src="/Idea.png"
          alt="home page image"
          fill
          className="object-contain"
        />
      </div>
      <h1
        className={`text-[#4dc88a] font-bold text-2xl ${platypi.className}`}
      >{`Welcome to MindDraft, ${user.username?.toUpperCase()}`}</h1>
      <Button className="bg-[#4dc88a] mt-8" onClick={onCreateNote}>
        Create Note
      </Button>
    </div>
  );
};

export default HomeContainer;
