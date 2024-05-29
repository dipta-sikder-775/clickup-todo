import { UnstyledButton } from "@mantine/core";
import { TStatus, TStatusKey } from "../../../app/features/todo/types";
import useUpdateTodo from "../../../hooks/useUpdateTodo";
import cn from "../../../utils/cn";
import StatusIcon from "../../elements/Icon/StatusIcon";
import OptionListButton from "../../elements/Button/OptionListButton";

type TStatusOptionsData = {
  key: TStatusKey;
  color: string;
  justify: string;
  leftSection: React.ReactNode;
  rightSection: React.ReactNode;
  children: string;
}[];

const statusOptionsData: TStatusOptionsData = [
  {
    color: "gray",
    justify: "start",
    leftSection: <StatusIcon status={"TODO"} />,
    rightSection: <StatusIcon status="CHECK_MARK" />,
    children: "Todo",
    key: "TODO",
  },
  {
    color: "dark",
    justify: "start",
    leftSection: <StatusIcon status={"IN_PROGRESS"} />,
    rightSection: <StatusIcon status={"CHECK_MARK"} />,
    children: "In Progress",
    key: "IN_PROGRESS",
  },
  {
    color: "gray",
    justify: "start",
    leftSection: <StatusIcon status={"DONE"} />,
    rightSection: <StatusIcon status={"CHECK_MARK"} />,
    children: "Completed",
    key: "DONE",
  },
];

export interface IStatusOptionsProps {
  mainId?: string | number;
  subId?: string | number;
}

type THandleStatusChangeArgs = IStatusOptionsProps & TStatus;

const StatusOptions = ({ mainId, subId }: IStatusOptionsProps) => {
  const { updateTodoData, getIsSelected, allTodos, mainTodoData, subTodoData } =
    useUpdateTodo({
      mainId,
      subId,
    });

  const handleStatusChange =
    ({ mainId, subId, key, customName }: THandleStatusChangeArgs) =>
    () => {
      updateTodoData({
        mainId,
        subId,
        updatedTodo: {
          index:
            mainId && subId
              ? subTodoData?.index ?? 0
              : mainTodoData?.index ?? 0,
          status: {
            key,
            customName,
          },
        },
      });
    };

  return (
    <div className="flex w-full flex-col gap-2">
      {statusOptionsData?.map((statusOption) => {
        const isSelected = getIsSelected({
          allTodos,
          optionKey: statusOption?.key,
          mainId,
          subId,
          checkingFor: "status",
        });

        return (
          <OptionListButton
            onClick={handleStatusChange({
              mainId,
              subId,
              key: statusOption?.key,
              customName: statusOption?.children,
            })}
            data={{
              children: {
                content: statusOption?.children,
                className: "text-text-gray-status",
              },
              leftSection: {
                content: statusOption?.leftSection,
              },
              isSelected,
              rightSection: {
                content: statusOption?.rightSection,
              },
            }}
            key={statusOption?.key}
          />
        );
      })}
    </div>
  );
};

export default StatusOptions;
