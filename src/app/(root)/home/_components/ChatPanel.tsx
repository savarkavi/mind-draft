import { useAction, useQuery } from "convex/react";
import { ArrowUp, Loader } from "lucide-react";
import { useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ChatPanel = ({ document }: { document: Doc<"documents"> }) => {
  const [question, setQuestion] = useState("");
  const askQuestion = useAction(api.documents.askQuestion);
  const chat = useQuery(api.chats.getChat, { documentId: document._id });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!question) {
      return toast.error("Please provide a question.");
    }

    setQuestion("");

    const answer = await askQuestion({
      question,
      storageId: document.storageId,
      documentId: document._id,
    });
  };

  return (
    <div className="rounded-lg bg-[#EFE4CF] h-[600px] shadow-md mt-4 p-2 relative flex flex-col justify-between">
      <div className="overflow-y-auto h-[500px]">
        {!chat ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loader className="animate-spin" />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col gap-6 p-4">
            {chat.map((message) => {
              return (
                <p
                  key={message._id}
                  className={cn(
                    "py-2 px-4 rounded-lg shadow-lg",
                    message.isHuman
                      ? "bg-stone-700 text-white self-end"
                      : "bg-[#F3EBDB] self-start whitespace-pre-line"
                  )}
                >
                  {message.text}
                </p>
              );
            })}
          </div>
        )}
      </div>
      <form className="relative" onSubmit={onSubmit}>
        <input
          placeholder="Ask questions about the document"
          className="outline-none p-3 rounded-lg w-full"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <ArrowUp className="absolute right-4 top-1/2 -translate-y-1/2" />
      </form>
    </div>
  );
};

export default ChatPanel;
