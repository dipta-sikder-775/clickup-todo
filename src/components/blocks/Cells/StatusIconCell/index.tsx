import { TStatus } from "../../../../app/features/todo/types";
import cn from "../../../../utils/cn";
import StatusIcon from "../../../elements/Icon/StatusIcon";
import StatusOptions, { IStatusOptionsProps } from "../../StatusOptions";
import PopoverCell from "../PopoverCell";

interface IStatusIconCellProps extends IStatusOptionsProps {
  status?: TStatus;
}

const StatusIconCell = ({ status, mainId, subId }: IStatusIconCellProps) => {
  return (
    <PopoverCell
      target={{
        content: (
            <StatusIcon
              status={status?.key}
              tooltip={{
                text: status?.customName,
                active: true,
                className: cn({ "ml-11": mainId && subId }),
                requiredParringAndBgColor: true,
              }}
            />
        ),
        className: "!border-[0px] !p-0",
      }}
      popOver={{
        width: 220,
        content: <StatusOptions mainId={mainId} subId={subId} />,
      }}
    />
  );
};

export default StatusIconCell;
