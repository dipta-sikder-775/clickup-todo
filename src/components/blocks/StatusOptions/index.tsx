import { Button, Stack } from "@mantine/core";
import { FaCheck } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoRadioButtonOn } from "react-icons/io5";
import { TStatus, TStatusKey } from "../../../app/features/todo/types";
import useUpdateTodo from "../../../hooks/useUpdateTodo";
import PopOverCellIcon from "../../elements/Align/Icon/PopOverCellIcon";

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
    leftSection: <PopOverCellIcon>{IoRadioButtonOn}</PopOverCellIcon>,
    rightSection: (
      <PopOverCellIcon className="h-3 w-3 text-[#544dc9]">
        {FaCheck}
      </PopOverCellIcon>
    ),
    children: "Todo",
    key: "TODO",
  },
  {
    color: "dark",
    justify: "start",
    leftSection: (
      <PopOverCellIcon className="text-[#1090e0]">
        {IoRadioButtonOn}
      </PopOverCellIcon>
    ),
    rightSection: (
      <PopOverCellIcon className="h-3 w-3 text-[#544dc9]">
        {FaCheck}
      </PopOverCellIcon>
    ),
    children: "In Progress",
    key: "IN_PROGRESS",
  },
  {
    color: "gray",
    justify: "start",
    leftSection: (
      <PopOverCellIcon className="text-[#008844]">
        {IoMdCheckmarkCircle}
      </PopOverCellIcon>
    ),
    rightSection: (
      <PopOverCellIcon className="h-3 w-3 text-[#544dc9]">
        {FaCheck}
      </PopOverCellIcon>
    ),
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
  const { updateTodoData, getIsSelected, allTodos } = useUpdateTodo({
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
          status: {
            key,
            customName,
          },
        },
      });
    };

  return (
    <Stack gap="xs" align="stretch" justify="start">
      {statusOptionsData.map((statusOption) => (
        <Button
          key={statusOption.key}
          size="xs"
          variant="subtle"
          color={statusOption.color}
          justify={statusOption.justify}
          leftSection={statusOption.leftSection}
          rightSection={
            getIsSelected({
              allTodos,
              optionKey: statusOption.key,
              mainId,
              subId,
              checkingFor: "status",
            })
              ? statusOption.rightSection
              : undefined
          }
          onClick={handleStatusChange({
            mainId,
            subId,
            key: statusOption.key,
            customName: statusOption.children,
          })}
        >
          {statusOption.children}
        </Button>
      ))}
    </Stack>
  );
};

export default StatusOptions;
