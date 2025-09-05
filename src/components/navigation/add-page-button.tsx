import { Plus } from "lucide-react";

interface AddPageButtonProps {
  onClick: () => void;
}

const AddPageButton = ({ onClick }: AddPageButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 ml-10 px-2.5 py-1.5 text-gray-600 bg-white hover:text-gray-900 hover:bg-gray-50 rounded-lg shadow-[inset_0_0_0_0.5px_#E1E1E1,0_1px_1px_rgba(0,0,0,0.02),0_1px_3px_rgba(0,0,0,0.04)] cursor-pointer transition-all duration-200"
      type="button"
    >
      <Plus className="w-4 h-4 stroke-[2.5]" />
      <span className="text-sm font-medium">Add page</span>
    </button>
  );
};

export default AddPageButton;
