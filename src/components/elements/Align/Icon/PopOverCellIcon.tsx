import { IconType } from "react-icons";
import cn from "../../../../utils/cn";

interface PopOverCellIconProps {
  children?: IconType;
  className?: string;
}
// const a=LuMessageCircle
const PopOverCellIcon = ({
  children: Children,
  className,
}: PopOverCellIconProps) => {
  if (!Children) return null;

  return <Children className={cn("h-4 w-4", className)} />;
};

export default PopOverCellIcon;
