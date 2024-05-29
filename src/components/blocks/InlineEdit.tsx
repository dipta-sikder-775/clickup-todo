import { useClickOutside } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";
import { updateTodo } from "../../app/features/todo/slice";
import { TTableRow } from "../../app/features/todo/types";
import { useAppDispatch } from "../../app/hooks";
import useUpdateTodo from "../../hooks/useUpdateTodo";

interface IInlineEditProps {
  row?: TTableRow;
  mainId?: string | number;
  subId?: string | number;
}

const InlineEdit = ({ row, mainId, subId }: IInlineEditProps) => {
  const { updateTodoData, mainTodoData, subTodoData } = useUpdateTodo({
    mainId,
    subId,
  });
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));
  const [text, setText] = useState(row?.name);

  useEffect(() => {
    if (opened) {
      ref.current?.focus();
    }
  }, [opened, ref]);

  useEffect(() => {
    setText(row?.name);
  }, [row?.name]);

  const handleEdit: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (text === row?.name) return;

    if (e.key === "Enter") {
      updateTodoData({
        mainId,
        subId,
        updatedTodo: {
          index:
            mainId && subId
              ? subTodoData?.index ?? 0
              : mainTodoData?.index ?? 0,
          name: text,
        },
      });
      setOpened(false);
    }
  };

  return (
    <div className="flex items-center justify-between gap-0.5">
      {opened ? (
        <input
          className="w-full flex-1 border-none bg-transparent outline-none focus-within:outline-none focus:outline-none"
          type="text"
          value={text}
          ref={ref}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleEdit}
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
          className="cursor-pointer rounded p-1 opacity-0 transition-opacity duration-300 ease-linear hover:bg-bg-gray-action-button group-hover/tableBodyRow:opacity-100"
        >
          <GoPencil className="h-3 w-3 text-text-gray-status " />
        </div>
      </div>
    </div>
  );
};

export default InlineEdit;
