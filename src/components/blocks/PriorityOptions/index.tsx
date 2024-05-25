import { Button, Stack } from "@mantine/core";
import { FaCheck } from "react-icons/fa";
import { TbFlag3Filled } from "react-icons/tb";
import { TPriority, TPriorityKey } from "../../../app/features/todo/types";
import useUpdateTodo from "../../../hooks/useUpdateTodo";
import cn from "../../../utils/cn";
import PopOverCellIcon from "../../elements/Align/Icon/PopOverCellIcon";

type TPriorityCompareInput = {
  key?: TPriorityKey | null | undefined;
  currentKey?: TPriority;
};

type TPriorityOption = {
  color: string;
  justify: string;
  leftSection: JSX.Element;
  rightSection: JSX.Element;
  children: string;
  key: TPriorityKey | null | undefined;
};

type THandlePriorityChangeArgs = {
  mainId?: string | number | null | undefined;
  subId?: string | number | null | undefined;
  key: TPriorityKey;
  customName?: string;
};

const getIsSelected = ({ currentKey, key }: TPriorityCompareInput) => {
  return !!currentKey?.key && !!key && currentKey?.key === key;
};

const getStatusOptionsData = (
  currentPriority?: TPriority,
): TPriorityOption[] => {
  return [
    {
      color: "gray",
      justify: "start",
      leftSection: (
        <PopOverCellIcon className="text-[#B13A41]">
          {TbFlag3Filled}
        </PopOverCellIcon>
      ),
      rightSection: (
        <>
          {getIsSelected({ currentKey: currentPriority, key: "URGENT" }) && (
            <PopOverCellIcon className={cn("h-3 w-3 text-[#544dc9]")}>
              {FaCheck}
            </PopOverCellIcon>
          )}
        </>
      ),
      children: "Urgent",
      key: "URGENT",
    },
    {
      color: "dark",
      justify: "start",
      leftSection: (
        <PopOverCellIcon className="text-[#CF940A]">
          {TbFlag3Filled}
        </PopOverCellIcon>
      ),
      rightSection: (
        <>
          {getIsSelected({ currentKey: currentPriority, key: "HIGH" }) && (
            <PopOverCellIcon className={cn("h-3 w-3 text-[#544dc9]")}>
              {FaCheck}
            </PopOverCellIcon>
          )}
        </>
      ),
      children: "High",
      key: "HIGH",
    },
    {
      color: "gray",
      justify: "start",
      leftSection: (
        <PopOverCellIcon className="text-[#4466FF]">
          {TbFlag3Filled}
        </PopOverCellIcon>
      ),
      rightSection: (
        <>
          {getIsSelected({ currentKey: currentPriority, key: "NORMAL" }) && (
            <PopOverCellIcon className={cn("h-3 w-3 text-[#544dc9]")}>
              {FaCheck}
            </PopOverCellIcon>
          )}
        </>
      ),
      children: "Normal",
      key: "NORMAL",
    },
    {
      color: "gray",
      justify: "start",
      leftSection: (
        <PopOverCellIcon className="text-[#87909E]">
          {TbFlag3Filled}
        </PopOverCellIcon>
      ),
      rightSection: (
        <>
          {getIsSelected({ currentKey: currentPriority, key: "LOW" }) && (
            <PopOverCellIcon className={cn("h-3 w-3 text-[#544dc9]")}>
              {FaCheck}
            </PopOverCellIcon>
          )}
        </>
      ),
      children: "Low",
      key: "LOW",
    },
  ];
};

export interface IPriorityOptionsProps {
  mainId?: string | number;
  subId?: string | number;
  priority?: TPriority;
}

const PriorityOptions = ({
  mainId,
  subId,
  priority,
}: IPriorityOptionsProps) => {
  const { updateTodoData, getIsSelected, allTodos } = useUpdateTodo({
    mainId,
    subId,
  });

  const handlePriorityChange =
    ({ mainId, subId, key, customName }: THandlePriorityChangeArgs) =>
    () => {
      updateTodoData({
        mainId,
        subId,
        updatedTodo: {
          priority: {
            key,
            customName,
          },
        },
      });
    };
  console.log({ mainId, subId });
  return (
    <Stack gap="xs" align="stretch" justify="start">
      {getStatusOptionsData(priority).map((statusOption) => (
        <Button
          size="xs"
          variant="subtle"
          color={statusOption.color}
          justify={statusOption.justify}
          leftSection={statusOption.leftSection}
          // rightSection={statusOption.rightSection}
          rightSection={
            getIsSelected({
              allTodos,
              optionKey: statusOption.key,
              mainId,
              subId,
              checkingFor: "priority",
            })
              ? statusOption.rightSection
              : undefined
          }
          onClick={handlePriorityChange({
            mainId,
            subId,
            key: statusOption.key,
            customName: statusOption.children,
          })}
          key={statusOption?.key}
        >
          {statusOption.children}
        </Button>
      ))}
    </Stack>
  );
};

export default PriorityOptions;
