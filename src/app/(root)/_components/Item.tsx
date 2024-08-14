import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ItemProps {
  label: string;
  icon: LucideIcon;
  isNote?: boolean;
  onClick: () => void;
}

const Item = ({ label, icon: Icon, isNote, onClick }: ItemProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-500/10 text-gray-600",
        isNote && "pl-[50px] font-bold"
      )}
      onClick={() => onClick()}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <span className="shrink-0">{label}</span>
    </div>
  );
};

export default Item;
