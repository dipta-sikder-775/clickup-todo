import { TStatusKey } from "../../../app/features/todo/types";
import { statusIconOptions } from "../../../assets/icons";
import cn from "../../../utils/cn";
import PopOverCellIcon from "../Icon/PopOverCellIcon";

interface IStatusButtonProps
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >,
    "children"
  > {
  data: {
    status?: TStatusKey;
    text?: React.ReactNode;
  };
}

const StatusButton = ({
  data: { status, text },
  className,
  ...restProps
}: IStatusButtonProps) => {
  return (
    <span
      className={cn(
        "flex items-center gap-[5px] rounded-[5px] px-[5px] py-1",
        {
          "bg-bg-gray-hover-header text-icon-gray hover:bg-bg-gray-hover":
            status === "TODO",
          "bg-bg-paste text-white hover:bg-bg-paste-hover":
            status === "IN_PROGRESS",
          "bg-bg-green text-white hover:bg-bg-green-hover": status === "DONE",
        },
        className,
      )}
      {...restProps}
    >
      {!!status && (
        <PopOverCellIcon
          className={cn({
            "text-icon-gray": status === "TODO",
            "text-white": status === "IN_PROGRESS" || status === "DONE",
          })}
        >
          {statusIconOptions?.[status]}
        </PopOverCellIcon>
      )}

      <span
        className={cn("text-xs font-medium", {
          "text-text-gray-status": status === "TODO",
          "text-white": status === "IN_PROGRESS" || status === "DONE",
        })}
      >
        {text}
      </span>
    </span>
  );
};

export default StatusButton;
