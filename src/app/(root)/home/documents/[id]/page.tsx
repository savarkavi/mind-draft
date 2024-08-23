"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { Loader } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatPanel from "../../_components/ChatPanel";

const DocumentPage = () => {
  const { id } = useParams();
  const document = useQuery(api.documents.getDocument, {
    id: id as Id<"documents">,
  });

  if (!document) {
    return (
      <div className="h-full flex justify-center items-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-[900px] mx-auto">
        <h1 className="text-4xl font-semibold">{document.title}</h1>
        <Tabs defaultValue="document" className="mt-8">
          <TabsList className="bg-[#EFE4CF] shadow-md">
            <TabsTrigger value="document" className="text-black">
              Document
            </TabsTrigger>
            <TabsTrigger value="chat" className="text-black">
              Chat
            </TabsTrigger>
          </TabsList>
          <TabsContent value="document">
            {document.documentUrl && (
              <div className="rounded-lg bg-[#EFE4CF] h-[600px] mt-4">
                <iframe
                  src={document.documentUrl}
                  className="rounded-lg w-full h-full bg-white"
                />
              </div>
            )}
          </TabsContent>
          <TabsContent value="chat">
            <ChatPanel document={document} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DocumentPage;
