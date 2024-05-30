import cn from "../../../utils/cn";

import { CiCalendarDate } from "react-icons/ci";
import { IoMdPersonAdd } from "react-icons/io";
import { toggleSelectedUser } from "../../../app/features/todo/slice";
import { TAssign } from "../../../app/features/todo/types";
import { useAppDispatch } from "../../../app/hooks";
import Avatar from "../Avatar";
import PopOverCellIcon from "../Icon/PopOverCellIcon";

interface IIconOrContentButtonProps
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >,
    "children"
  > {
  data:
    | {
        content?: TAssign[];
        buttonFor: "assignee";
        mainId?: string | number;
        subId?: string | number;
      }
    | {
        content?: string | boolean;
        buttonFor: "due-date";
        status: "DUE_TODAY_TASK" | "OVER_DUE_TASK" | "FUTURE_TASK" | null;
      };
}

const IconOrContentButton = ({
  data,
  className,
  ...restProps
}: IIconOrContentButtonProps) => {
  const dispatch = useAppDispatch();
  const handleSelectUser =
    ({
      mainId,
      subId,
      assignee,
    }: {
      mainId?: string | number;
      subId?: string | number;
      assignee: TAssign;
    }) =>
    ({
      clickEvent,
      id,
    }: {
      clickEvent: React.MouseEvent<HTMLSpanElement, MouseEvent>;
      id: string | number | null | undefined;
    }) => {
      clickEvent.preventDefault();
      clickEvent.stopPropagation();
      dispatch(toggleSelectedUser({ mainId, subId, assignee }));
    };

  return (
    <span className={cn("flex items-center gap-2", className)} {...restProps}>
      {(Array.isArray(data?.content)
        ? !data?.content?.length
        : !!data?.content) && (
        <PopOverCellIcon className={cn("text-icon-gray", className)}>
          {data?.buttonFor === "assignee" ? IoMdPersonAdd : CiCalendarDate}
        </PopOverCellIcon>
      )}

      {data?.buttonFor === "due-date" ? (
        <span
          className={cn("text-sm font-normal text-text-black-1", {
            "text-text-red":
              data?.buttonFor === "due-date" &&
              data?.status === "OVER_DUE_TASK",
            "text-text-yellow":
              data?.buttonFor === "due-date" &&
              data?.status === "DUE_TODAY_TASK",
            "text-text-black-1":
              data?.buttonFor === "due-date" && data?.status === "FUTURE_TASK",
          })}
        >
          {data?.content}

          <span className="sr-only">due date button</span>
        </span>
      ) : (
        <span className="flex flex-wrap items-center justify-center gap-1">
          {data?.content
            ?.concat()
            ?.slice(0, 2)
            ?.map((assignee) => {
              const { id, name, avatar } = assignee;

              return (
                <Avatar
                  avatar={avatar}
                  name={name}
                  id={id}
                  key={id}
                  crossButton={{
                    isButtonNecessary: true,
                    onClick: handleSelectUser({
                      mainId: data?.mainId,
                      subId: data?.subId,
                      assignee,
                    }),
                  }}
                />
              );
            })}

          <span className="sr-only">assignee button</span>
        </span>
      )}
    </span>
  );
};

export default IconOrContentButton;
