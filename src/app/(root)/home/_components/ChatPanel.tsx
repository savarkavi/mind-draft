import { useAction, useQuery } from "convex/react";
import { ArrowUp, Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import TextareaAutosize from "react-textarea-autosize";

const ChatPanel = ({ document }: { document: Doc<"documents"> }) => {
  const [question, setQuestion] = useState("");
  const askQuestion = useAction(api.documents.askQuestion);
  const chat = useQuery(api.chats.getChat, { documentId: document._id });
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!question) {
      return toast.error("Please provide a question.");
    }

    setQuestion("");

    const answer = askQuestion({
      question,
      storageId: document.storageId,
      documentId: document._id,
    });

    toast.promise(answer, {
      loading: "Generating answer",
    });
  };

  if (!chat) {
    return (
      <div className="w-full h-[600px] flex justify-center items-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-[#EFE4CF] h-[600px] shadow-md mt-4 p-2 relative flex flex-col justify-between overflow-y-auto">
      <div className="h-[500px] overflow-y-auto" ref={chatBoxRef}>
        <div className="h-full">
          {chat.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              Looks empty here :(
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
      </div>
      <form className="relative" onSubmit={onSubmit}>
        <TextareaAutosize
          placeholder="Ask questions about the document"
          className="outline-none p-3 pr-12 rounded-lg w-full"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <button>
          <ArrowUp className="absolute right-4 top-3 cursor-pointer" />
        </button>
      </form>
    </div>
  );
};

export default ChatPanel;
