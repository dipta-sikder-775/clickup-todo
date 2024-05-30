import { IoMdArrowDropdown } from "react-icons/io";
import { RiDraggable } from "react-icons/ri";
import {
  toggleCollapseTodo,
  toggleSelectTodo,
} from "../../../app/features/todo/slice";
import { TTableRow } from "../../../app/features/todo/types";
import { useAppDispatch } from "../../../app/hooks";
import cn from "../../../utils/cn";
import Align from "../../elements/Align";
import CheckboxButton from "../../elements/Button/CheckboxButton";
import useConsumeRowDnd from "../../elements/Dnd/useConsumeRowDnd";
import ActionCell from "../Cells/ActionCell";
import AssigneeCell from "../Cells/AssigneeCell";
import CommentCell from "../Cells/CommentCell";
import DueDateCell from "../Cells/DueDateCell";
import PriorityCell from "../Cells/PriorityCell";
import StatusCell from "../Cells/StatusCell";
import StatusIconCell from "../Cells/StatusIconCell";
import InlineEdit from "../InlineEdit";

interface IBodyRowProps {
  row: TTableRow;
  mainId?: string | number;
  subId?: string | number;
}
const BodyRow = ({ row, mainId, subId }: IBodyRowProps) => {
  const dispatch = useAppDispatch();
  const { targetProps, controlElementProps } = useConsumeRowDnd({
    id: subId ? subId! : mainId!,
  });

  return (
    <div
      className="tr group/tableBodyRow flex w-full items-center border-b border-solid border-border-gray-2 hover:bg-bg-gray-hover-body"
      key={row?.id}
      {...targetProps}
    >
      <div className="td">
        <Align className="min-w-[380px] justify-normal gap-2">
          <div {...controlElementProps} className="flex items-center gap-1">
            <RiDraggable className="h-4 w-4 cursor-pointer select-none fill-icon-gray text-icon-gray text-inherit opacity-0 transition-all duration-100 ease-linear group-hover/tableBodyRow:opacity-100" />

            <div className="m-0 block p-0">
              <CheckboxButton
                stopPropagation
                checked={row?.isSelected}
                onClick={() =>
                  dispatch(
                    toggleSelectTodo({
                      mainTodoId: mainId as string,
                      subTodoId: subId,
                    }),
                  )
                }
                className={cn(
                  "opacity-0 transition-all duration-100 ease-linear group-hover/tableBodyRow:opacity-100",
                  {
                    "opacity-100": row?.isSelected,
                  },
                )}
              />

              <span className="sr-only">checkbox to select a table row</span>
            </div>

            {mainId && !subId && (
              <div className="m-0 block p-0">
                <IoMdArrowDropdown
                  className={cn(
                    "h-4 w-4 transition-all duration-100 ease-linear",
                    {
                      "rotate-[-90deg] transform": !row?.isCollapsed,
                    },
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(toggleCollapseTodo(row.id!));
                  }}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                />

                <span className="sr-only">
                  expend and collapse a table sub row
                </span>
              </div>
            )}
          </div>

          <StatusIconCell status={row?.status} mainId={mainId} subId={subId} />

          <InlineEdit row={row} mainId={mainId} subId={subId} />
        </Align>
      </div>

      <div className="td ">
        <AssigneeCell
          className="min-w-[90px]"
          assignee={row?.assignee}
          mainId={mainId}
          subId={subId}
        />
      </div>

      <div className="td">
        <DueDateCell
          className="min-w-[120px]"
          dueDate={row?.dueDate}
          mainId={mainId}
          subId={subId}
        />
      </div>

      <div className="td">
        <PriorityCell
          className="min-w-[100px]"
          priority={row?.priority}
          mainId={mainId}
          subId={subId}
        />
      </div>

      <div className="td">
        <StatusCell
          className="min-w-[120px]"
          status={row?.status}
          mainId={mainId}
          subId={subId}
        />
      </div>

      <div className="td ">
        <CommentCell
          className="min-w-[80px]"
          comments={row?.comments}
          mainId={mainId}
          subId={subId}
        />
      </div>

      <div className="td flex min-w-[60px] items-center justify-center">
        <ActionCell
          className="flex min-w-[60px] items-center justify-center"
          mainId={mainId}
          subId={subId}
        />
      </div>
    </div>
  );
};

export default BodyRow;
