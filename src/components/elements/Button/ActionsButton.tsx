import { IconType } from "react-icons";
import { BsThreeDots } from "react-icons/bs";
import cn from "../../../utils/cn";
import PopOverCellIcon from "../Icon/PopOverCellIcon";

interface ICommentButtonProps
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >,
    "children"
  > {
  data?: {
    icon?: IconType;
    className?: string;
  };
}

const ActionsButton = ({
  className,
  data,
  ...restProps
}: ICommentButtonProps) => {
  return (
    <span
      className={cn("p relative flex items-center gap-2", className)}
      {...restProps}
    >
      <PopOverCellIcon
        className={cn(
          "h-5 w-5 cursor-pointer rounded p-1 text-text-gray-status hover:bg-bg-gray-action-button",
          data?.className,
        )}
      >
        {data?.icon ? data?.icon : BsThreeDots}
      </PopOverCellIcon>
    </span>
  );
};

export default ActionsButton;
