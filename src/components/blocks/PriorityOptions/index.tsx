import { FaCheck } from "react-icons/fa";
import { GrClear } from "react-icons/gr";
import { TbFlag3Filled } from "react-icons/tb";
import { TPriority, TPriorityKey } from "../../../app/features/todo/types";
import useUpdateTodo from "../../../hooks/useUpdateTodo";
import cn from "../../../utils/cn";
import OptionListButton from "../../elements/Button/OptionListButton";
import PopOverCellIcon from "../../elements/Icon/PopOverCellIcon";

type TPriorityCompareInput = {
  key?: TPriorityKey | null | undefined;
  currentKey?: TPriority;
};

type TPriorityOption = {
  color: string;
  justify: string;
  leftSection: JSX.Element;
  rightSection?: JSX.Element;
  children: string;
  key: TPriorityKey | null | undefined;
  rowAbove?: boolean;
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
    {
      color: "gray",
      justify: "start",
      leftSection: (
        <PopOverCellIcon className="h-3.5 w-3.5 text-icon-gray-2">
          {GrClear}
        </PopOverCellIcon>
      ),
      rowAbove: true,
      children: "Clear",
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
  const { updateTodoData, getIsSelected, allTodos, mainTodoData, subTodoData } =
    useUpdateTodo({
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
          index:
            mainId && subId
              ? subTodoData?.index ?? 0
              : mainTodoData?.index ?? 0,
          priority: {
            key,
            customName,
          },
        },
      });
    };
  // console.log({ mainId, subId });
  return (
    <div className="flex flex-col gap-2">
      {getStatusOptionsData(priority).map((statusOption, i) => {
        const isSelected = getIsSelected({
          allTodos,
          optionKey: statusOption.key,
          mainId,
          subId,
          checkingFor: "priority",
        });

        if (statusOption?.rowAbove) {
          return (
            <div className="mt-2" key={i}>
              <div className="mb-2 w-full border-b border-solid border-b-border-gray-2" />
              <OptionListButton
                onClick={handlePriorityChange({
                  mainId,
                  subId,
                  key: undefined,
                  customName: "",
                })}
                data={{
                  children: {
                    content: statusOption.children,
                  },
                  leftSection: {
                    content: statusOption.leftSection,
                  },
                  isSelected: false,
                  rightSection: {
                    content: statusOption.rightSection,
                  },
                }}
              />
            </div>
          );
        }

        return (
          <OptionListButton
            onClick={handlePriorityChange({
              mainId,
              subId,
              key: statusOption.key,
              customName: statusOption.children,
            })}
            data={{
              children: {
                content: statusOption.children,
              },
              leftSection: {
                content: statusOption.leftSection,
              },
              isSelected,
              rightSection: {
                content: statusOption.rightSection,
              },
            }}
          />
        );
      })}
    </div>
  );
};

export default PriorityOptions;
