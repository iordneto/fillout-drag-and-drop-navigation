"use client";

import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { Copy, Edit, Files, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FlagIcon } from "../icons/flag-icon";
import type { ContextMenuProps } from "./types";

export const NavigationContextMenu: React.FC<ContextMenuProps> = ({
  isOpen,
  position,
  onClose,
  onAction,
}) => {
  return (
    <DropdownMenu open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DropdownMenuTrigger asChild>
        <div
          className="fixed w-0 h-0 pointer-events-none"
          style={{ left: position.x, top: position.y }}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-48 rounded-xl p-0"
        side="bottom"
        align="start"
        sideOffset={5}
      >
        <DropdownMenuLabel className="font-medium text-[#1a1a1a] text-md bg-[#FAFBFC] px-3 py-2">
          Settings
        </DropdownMenuLabel>

        <DropdownMenuGroup className="p-1.5">
          <DropdownMenuItem
            onClick={() => onAction("setFirst")}
            className="gap-1.5 font-medium"
          >
            <FlagIcon className="w-4 h-4 text-blue-500 stroke-2" />
            Set as first pagesss
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onAction("rename")}
            className="gap-2 font-medium"
          >
            <Edit className="w-4 h-4 stroke-2" />
            Rename
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onAction("copy")}
            className="gap-2 font-medium"
          >
            <Copy className="w-4 h-4 stroke-2" />
            Copy
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onAction("duplicate")}
            className="gap-2 font-medium"
          >
            <Files className="w-4 h-4 stroke-2" />
            Duplicate
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => onAction("delete")}
            className="gap-2 text-red-600 focus:text-red-600 font-medium"
          >
            <Trash2 className="w-4 h-4 text-red-600 stroke-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
