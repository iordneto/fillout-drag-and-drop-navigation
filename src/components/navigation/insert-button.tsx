import { Plus } from "lucide-react";
import type { InsertButtonProps } from "./types";

export const InsertButton = ({
  index,
  onInsert,
  isVisible,
}: InsertButtonProps) => {
  const getInsertButtonStyles = () => {
    return `
      flex items-center justify-center overflow-hidden
      transition-all duration-300 ease-out w-0
      ${
        isVisible
          ? "w-6 scale-100 opacity-100 delay-150"
          : "w-0 scale-0 opacity-0 delay-0"
      }
    `;
  };

  return (
    <div className={getInsertButtonStyles()}>
      <button
        onClick={() => onInsert(index)}
        className="p-1 bg-white shadow-[inset_0_0_0_0.5px_#E1E1E1,0_1px_1px_rgba(0,0,0,0.02),0_1px_3px_rgba(0,0,0,0.04)] rounded-full cursor-pointer"
        type="button"
        title="Adicionar página aqui"
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  );
};
