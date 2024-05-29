import { useClickOutside } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { AiOutlineEnter } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { addTodo } from "../../../app/features/todo/slice";
import { useAppDispatch } from "../../../app/hooks";
import cn from "../../../utils/cn";

interface ICreateNewRowProps {
  mainId?: string | number;
  placeholder?: string;
}

const CreateNewRow = ({ mainId, placeholder }: ICreateNewRowProps) => {
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (opened) {
      ref.current?.focus();
    }
  }, [opened, ref]);

  const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (ref?.current) {
        if (!ref.current.value) return;
        dispatch(
          addTodo({
            todo: {
              name: ref.current.value,
            },
            mainTodoId: mainId,
          }),
        );
        ref.current.value = "";
      }
      setOpened(true);
      ref.current?.focus();
    }
  };

  return (
    <div
      className={cn("py-2 pl-[73px] hover:bg-bg-gray-hover-body", {
        "bg-white hover:bg-white": opened,
      })}
    >
      {opened ? (
        <div className="flex items-center justify-between gap-2">
          <input
            className="w-full border-none outline-none"
            type="text"
            ref={ref}
            onKeyDown={handleAddTodo}
            placeholder={placeholder || "Write a task name..."}
          />

          <div className="">
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpened(false);
                }}
                onPointerDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="rounded border border-border-gray px-2 py-0.5 text-xs font-medium text-text-gray-1 transition-all duration-100 hover:bg-bg-gray-hover"
              >
                Cancel
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  if (ref?.current) {
                    if (!ref.current.value) return;
                    dispatch(
                      addTodo({
                        todo: {
                          name: ref.current.value,
                        },
                        mainTodoId: mainId,
                      }),
                    );
                    ref.current.value = "";
                  }
                }}
                onPointerDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="flex flex-shrink-0 items-center gap-0.5 rounded bg-bg-violet-2 px-2 py-0.5 text-xs font-medium text-white transition-all duration-100 hover:bg-bg-violet-2-hover"
              >
                <span className="text-inherit">Save</span>

                <span>
                  <AiOutlineEnter className="h-3 w-3" />
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-0.5">
          <GoPlus className="h-4 w-4 cursor-pointer text-text-gray-1" />

          <button
            onClick={() => setOpened(true)}
            className="flex items-center justify-center rounded border border-border-gray border-opacity-0 px-2 text-sm text-text-gray-1 transition-all duration-100 hover:border-opacity-100"
          >
            Add Task
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateNewRow;
