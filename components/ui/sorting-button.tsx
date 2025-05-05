// Extracted the sorting button logic into a reusable component
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

interface SortingButtonProps {
  isSorted: "asc" | "desc" | false;
  onClick: () => void;
  label: string;
}

export const SortingButton: React.FC<SortingButtonProps> = ({ isSorted, onClick, label }) => {
  return (
    <Button variant="ghost" onClick={onClick}>
      {label}
      {!isSorted && <ArrowUpDown className="ml-2 h-4 w-4" />}
      {isSorted === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
      {isSorted === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
    </Button>
  );
};