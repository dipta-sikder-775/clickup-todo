import React, { useState } from "react";
import { GoPencil } from "react-icons/go";
import { TTableRow } from "../../app/features/todo/types";
import { useClickOutside } from "@mantine/hooks";

interface IInlineEditProps {
  row?: TTableRow;
}

const InlineEdit = ({ row }: IInlineEditProps) => {
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));

  return (
    <div className="flex items-center justify-between gap-0.5">
      {opened ? (
        <input
          className="w-full flex-1 border-none bg-transparent outline-none focus-within:outline-none focus:outline-none"
          type="text"
          value={row?.name}
          ref={ref}
        />
      ) : (
        row?.name
      )}

      <div className="block">
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpened((prev) => !prev);
          }}
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="cursor-pointer rounded p-1 hover:bg-bg-gray-action-button"
        >
          <GoPencil className="h-[10px] w-[10px] text-text-gray-status " />
        </div>
      </div>
    </div>
  );
};

export default InlineEdit;
