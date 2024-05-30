import { Tooltip } from "@mantine/core";
import { TStatusKey } from "../../../app/features/todo/types";
import { statusIconOptions } from "../../../assets/icons";
import cn from "../../../utils/cn";
import PopOverCellIcon from "./PopOverCellIcon";

type TOnClickIcon =
  | ((props: {
      e:
        | React.MouseEvent<SVGElement, MouseEvent>
        | React.MouseEvent<HTMLDivElement, MouseEvent>;
      status: TStatusKey;
    }) => void)
  | undefined;

interface IStatusIconProps {
  status?: TStatusKey | "CHECK_MARK" | null;
  tooltip?: {
    active: boolean;
    text?: string;
    className?: string;
    requiredParringAndBgColor?: boolean;
  };
  className?: string;
  onClickIcon?: TOnClickIcon;
}

const StatusIcon = ({
  status,
  className,
  tooltip,
  onClickIcon,
}: IStatusIconProps) => {
  if (status === "TODO") {
    const content = (
      <PopOverCellIcon
        className={cn("cursor-pointer text-icon-gray", className)}
        onClick={(e) => onClickIcon?.({ e, status })}
      >
        {statusIconOptions["TODO"]}
      </PopOverCellIcon>
    );

    return tooltip?.active ? (
      <Tooltip
        className={cn(
          {
            "cursor-pointer rounded p-0.5 transition-all duration-200 ease-in-out hover:bg-bg-gray-action-button":
              tooltip?.active && tooltip?.requiredParringAndBgColor,
          },
          tooltip?.className,
        )}
        label={tooltip?.text || "Todo"}
        onClick={(e) => onClickIcon?.({ e, status })}
      >
        <span>
          {content}
          <span className="sr-only">status icon button</span>
        </span>
      </Tooltip>
    ) : (
      content
    );
  } else if (status === "IN_PROGRESS") {
    const content = (
      <PopOverCellIcon
        className={cn("cursor-pointer text-icon-paste", className)}
        onClick={(e) => onClickIcon?.({ e, status })}
      >
        {statusIconOptions["IN_PROGRESS"]}
      </PopOverCellIcon>
    );

    return tooltip?.active ? (
      <Tooltip
        className={cn(
          {
            "cursor-pointer rounded p-0.5 transition-all duration-200 ease-in-out hover:bg-bg-gray-action-button":
              tooltip?.active && tooltip?.requiredParringAndBgColor,
          },
          tooltip?.className,
        )}
        label={tooltip?.text || "In Progress"}
        onClick={(e) => onClickIcon?.({ e, status })}
      >
        <span>
          {content}
          <span className="sr-only">status icon button</span>
        </span>
      </Tooltip>
    ) : (
      content
    );
  } else if (status === "DONE") {
    const content = (
      <PopOverCellIcon
        className={cn("cursor-pointer text-icon-green", className)}
        onClick={(e) => onClickIcon?.({ e, status })}
      >
        {statusIconOptions["DONE"]}
      </PopOverCellIcon>
    );

    return tooltip?.active ? (
      <Tooltip
        className={cn(
          {
            "cursor-pointer rounded p-0.5 transition-all duration-200 ease-in-out hover:bg-bg-gray-action-button":
              tooltip?.active && tooltip?.requiredParringAndBgColor,
          },
          tooltip?.className,
        )}
        label={tooltip?.text || "Done"}
        onClick={(e) => onClickIcon?.({ e, status })}
      >
        <span>
          {content}
          <span className="sr-only">status icon button</span>
        </span>
      </Tooltip>
    ) : (
      content
    );
  } else if (status === "CHECK_MARK") {
    return (
      <PopOverCellIcon className="h-3 w-3 text-icon-violet">
        {statusIconOptions["CHECK_MARK"]}
      </PopOverCellIcon>
    );
  }

  return null;
};

export default StatusIcon;
