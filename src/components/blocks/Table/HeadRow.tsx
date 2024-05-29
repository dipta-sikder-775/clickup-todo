import { CiCirclePlus } from "react-icons/ci";
import CheckboxButton from "../../elements/Button/CheckboxButton";
import { toggleSelectAllTodo } from "../../../app/features/todo/slice";
import cn from "../../../utils/cn";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useMemo } from "react";
import { getTableRows } from "../../../app/features/todo/utils";

const HeadRow = () => {
  const dispatch = useAppDispatch();
  const selectTableRows = useMemo(getTableRows, []);
  const { isPartiallySelected, isEverythingSelected } =
    useAppSelector(selectTableRows);

  return (
    <div className="tr group/tableHeadRow flex items-center">
      <div className="th ml-[20px] flex min-w-[calc(380px-20px)] items-center">
        <CheckboxButton
          checked={isEverythingSelected}
          indeterminate={isPartiallySelected}
          onClick={() => {
            dispatch(toggleSelectAllTodo());
          }}
          className={cn(
            "opacity-0 transition-all duration-100 ease-linear group-hover/tableHeadRow:opacity-100",
            {
              "opacity-100": isPartiallySelected || isEverythingSelected,
            },
          )}
        />

        <span className="w-full cursor-pointer px-1 py-2.5 text-xs font-normal text-text-gray-1 hover:bg-bg-gray-hover">
          Name
        </span>
      </div>

      <div className="th min-w-[90px] cursor-pointer px-2 py-2.5 text-xs font-normal text-text-gray-1 hover:bg-bg-gray-hover">
        Assignee
      </div>

      <div className="th min-w-[110px] cursor-pointer px-3 py-2.5 text-xs font-normal text-text-gray-1 hover:bg-bg-gray-hover">
        Due Date
      </div>

      <div className="th min-w-[100px] cursor-pointer px-3.5 py-2.5 text-xs font-normal text-text-gray-1 hover:bg-bg-gray-hover">
        Priority
      </div>

      <div className="th min-w-[130px] cursor-pointer px-3.5 py-2.5 text-xs font-normal text-text-gray-1 hover:bg-bg-gray-hover">
        Status
      </div>

      <div className="th min-w-[80px] cursor-pointer px-1 py-2.5 text-xs font-normal text-text-gray-1 hover:bg-bg-gray-hover">
        Comments
      </div>

      <div className="th flex min-w-[60px] cursor-pointer items-center justify-center px-1 py-2.5 text-xs font-normal text-text-gray-1 hover:bg-bg-gray-hover">
        <CiCirclePlus className="h-4 w-4" />
      </div>
    </div>
  );
};

export default HeadRow;
