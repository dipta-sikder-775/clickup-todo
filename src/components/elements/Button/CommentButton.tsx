import { LuMessageCircle } from "react-icons/lu";
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
  data: {
    text?: React.ReactNode;
  };
}

// children: LuMessageCircle,
// className: "rotate-[270deg]",

const CommentButton = ({
  data: { text },
  className,
  ...restProps
}: ICommentButtonProps) => {
  return (
    <span className={cn("flex items-center gap-2", className)} {...restProps}>
      <PopOverCellIcon className={cn("rotate-[270deg] text-icon-gray")}>
        {LuMessageCircle}
      </PopOverCellIcon>

      <span className={cn("text-base font-normal text-text-gray-2")}>
        {text}
      </span>
    </span>
  );
};

export default CommentButton;
