import { TbFlag3, TbFlag3Filled } from "react-icons/tb";
import { TPriorityKey } from "../../../app/features/todo/types";
import cn from "../../../utils/cn";
import PopOverCellIcon from "../Icon/PopOverCellIcon";

interface IPriorityButtonProps
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >,
    "children"
  > {
  data: {
    text?: React.ReactNode;
    selectedKey?: TPriorityKey;
  };
}

// children: LuMessageCircle,
// className: "rotate-[270deg]",

const PriorityButton = ({
  data: { text, selectedKey },
  className,
  ...restProps
}: IPriorityButtonProps) => {
  return (
    <span className={cn("flex items-center gap-2", className)} {...restProps}>
      <PopOverCellIcon
        className={cn("text-icon-gray", {
          "text-icon-red": selectedKey === "URGENT",
          "text-icon-blue": selectedKey === "NORMAL",
          "text-icon-yellow": selectedKey === "HIGH",
          "text-icon-gray": selectedKey === "LOW",
        })}
      >
        {!selectedKey ? TbFlag3 : TbFlag3Filled}
      </PopOverCellIcon>

      <span className={cn("text-sm font-normal text-text-black-1")}>
        {text}
      </span>
    </span>
  );
};

export default PriorityButton;
