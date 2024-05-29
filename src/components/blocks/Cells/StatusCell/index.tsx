import { TStatus } from "../../../../app/features/todo/types";
import StatusButton from "../../../elements/Button/StatusButton";
import StatusOptions, { IStatusOptionsProps } from "../../StatusOptions";
import PopoverCell from "../PopoverCell";

interface IStatusCellProps extends IStatusOptionsProps {
  status?: TStatus;
  className?: string;
}

const StatusCell = ({ status, mainId, subId, className }: IStatusCellProps) => {
  return (
    <PopoverCell
      target={{
        content: (
          <StatusButton
            data={{
              status: status?.key,
              text: status?.customName,
            }}
          />
        ),
        className,
      }}
      popOver={{
        width: 220,
        content: <StatusOptions mainId={mainId} subId={subId} />,
      }}
    />
  );
};

export default StatusCell;
