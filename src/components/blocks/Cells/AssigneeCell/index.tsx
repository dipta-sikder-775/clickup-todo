import { toggleSelectedUser } from "../../../../app/features/todo/slice";
import { TAssign } from "../../../../app/features/todo/types";
import { useAppDispatch } from "../../../../app/hooks";
import { assigneeOptions } from "../../../../assets/assignee";
import { statusIconOptions } from "../../../../assets/icons";
import Avatar from "../../../elements/Avatar";
import IconOrContentButton from "../../../elements/Button/IconOrContentButton";
import PopOverCellIcon from "../../../elements/Icon/PopOverCellIcon";
import PopoverCell from "../PopoverCell";

interface IAssigneeCellProps {
  assignee?: TAssign[];
  mainId?: string | number;
  subId?: string | number;
  className?: string;
}

const AssigneeCell = ({
  assignee,
  mainId,
  subId,
  className,
}: IAssigneeCellProps) => {
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
    () => {
      dispatch(toggleSelectedUser({ mainId, subId, assignee }));
    };

  return (
    <PopoverCell
      target={{
        content: (
          <IconOrContentButton
            data={{ buttonFor: "assignee", content: assignee, mainId, subId }}
          />
        ),
        className,
      }}

      popOver={{
        content: (
          <div>
            <h5 className="mb-1 text-sm font-medium text-text-black-1">
              Assign Users
            </h5>
            <span className="flex flex-wrap items-center justify-center gap-1">
              {assigneeOptions?.map((assigneeOption) => {
                const { id, name, avatar, email } = assigneeOption;
                return (
                  <div
                    onClick={handleSelectUser({
                      mainId,
                      subId,
                      assignee: assigneeOption,
                    })}
                    className="flex w-full items-center justify-between rounded px-2 py-1 hover:bg-bg-gray-hover"
                    key={id}
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Avatar avatar={avatar} name={name} id={id} />
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="block text-sm font-medium text-text-black-1">
                          {name}
                        </span>

                        <span className="block text-xs font-normal text-text-gray-1">
                          {email}
                        </span>
                      </div>
                    </div>

                    <div>
                      {assignee?.some((assign) => assign.id === id) && (
                        <PopOverCellIcon className="h-3 w-3 text-icon-violet">
                          {statusIconOptions["CHECK_MARK"]}
                        </PopOverCellIcon>
                      )}
                    </div>
                  </div>
                );
              })}
            </span>
          </div>
        ),
      }}
    />
  );
};

export default AssigneeCell;
