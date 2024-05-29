import { IconType } from "react-icons";
import cn from "../../../utils/cn";

interface PopOverCellIconProps {
  children?: IconType;
  className?: string;
  onClick?: React.MouseEventHandler<SVGElement>;
}

const PopOverCellIcon = ({
  children: Children,
  className,
  onClick,
}: PopOverCellIconProps) => {
  if (!Children) return null;

  return <Children onClick={onClick} className={cn("h-4 w-4", className)} />;
};

export default PopOverCellIcon;
