"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadButton, UploadFileResponse } from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";

const UploadModal = () => {
  const [title, setTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);
  const createDocument = useMutation(api.documents.createDocument);

  const saveAfterUpload = async (uploaded: UploadFileResponse[]) => {
    try {
      await createDocument({
        title: title,
        storageId: (uploaded[0].response as any).storageId,
      });

      setTitle("");
      toast.success("Document uploaded");
    } catch (error) {
      toast.error("FAiled to upload the document");
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#4dc88a]">Upload document</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a document</DialogTitle>
          <DialogDescription>
            Upload documents to summarize, analyse and search and query for them
            in the future.
          </DialogDescription>
        </DialogHeader>
        <form className="mt-6 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Document title</label>
            <input
              id="title"
              className="p-2 border border-black outline-none rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <UploadButton
              uploadUrl={generateUploadUrl}
              fileTypes={[".txt", ".xml", ".doc", ".pdf"]}
              onUploadComplete={saveAfterUpload}
              onUploadError={(error: unknown) => {
                alert(`ERROR! ${error}`);
              }}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
