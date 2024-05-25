import { TbFlag3, TbFlag3Filled } from "react-icons/tb";
import { TPriority, TPriorityKey } from "../../../app/features/todo/types";
import cn from "../../../utils/cn";
import PopoverCell from "../PopoverCell";
import PriorityOptions from "../PriorityOptions";
import { IStatusOptionsProps } from "../StatusOptions";

interface IPriorityCellProps extends IStatusOptionsProps {
  priority?: TPriority;
}

const getColorClassFromKey = (key?: TPriorityKey) => {
  if (key === "HIGH") {
    return "text-[#CF940A]";
  } else if (key === "LOW") {
    return "text-[#87909E]";
  } else if (key === "NORMAL") {
    return "text-[#4466FF]";
  } else if (key === "URGENT") {
    return "text-[#B13A41]";
  }
  return "";
};

const PriorityCell = ({ priority, mainId, subId }: IPriorityCellProps) => {
  // const { subTodoData, mainTodoData } = useUpdateTodo({
  //   mainId,
  //   subId,
  // });
  // const selectedKey = mainTodoData?.priority?.key || subTodoData?.priority?.key;
  const selectedKey = priority?.key;

  return (
    <PopoverCell
      target={{
        content: priority?.customName,
        icon: {
          children: !selectedKey ? TbFlag3 : TbFlag3Filled,
          className: cn(getColorClassFromKey(selectedKey)),
        },
      }}
      popOver={{
        width: 220,
        content: (
          <PriorityOptions priority={priority} mainId={mainId} subId={subId} />
        ),
      }}
    />
  );
};

export default PriorityCell;
