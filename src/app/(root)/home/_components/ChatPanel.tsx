import { ArrowUp } from "lucide-react";

const ChatPanel = () => {
  return (
    <div className="rounded-lg bg-[#EFE4CF] h-[600px] shadow-md mt-4 p-2 relative flex flex-col justify-between">
      <div></div>
      <form className="relative">
        <input
          placeholder="Ask questions about the document"
          className="outline-none p-3 rounded-lg w-full"
        />
        <ArrowUp className="absolute right-4 top-1/2 -translate-y-1/2" />
      </form>
    </div>
  );
};

export default ChatPanel;
