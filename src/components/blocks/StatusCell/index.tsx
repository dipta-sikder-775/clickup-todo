import { Button } from "@mantine/core";
import { IoRadioButtonOn } from "react-icons/io5";
import { TStatus, TStatusKey } from "../../../app/features/todo/types";
import PopOverCellIcon from "../../elements/Align/Icon/PopOverCellIcon";
import PopoverCell from "../PopoverCell";
import StatusOptions, { IStatusOptionsProps } from "../StatusOptions";

interface IStatusCellProps extends IStatusOptionsProps {
  status?: TStatus;
}

const getColorFromKey = (key?: TStatusKey) => {
  switch (key) {
    case "TODO":
      return "#dcdee1";

    case "IN_PROGRESS":
      return "";
    case "DONE":
      return "#008844";

    default:
      return "";
  }
};

const StatusCell = ({ status, mainId, subId }: IStatusCellProps) => {
  return (
    <PopoverCell
      target={{
        type: "button",
        content: (
          <Button
            leftSection={<PopOverCellIcon>{IoRadioButtonOn}</PopOverCellIcon>}
            variant="filled"
            size="compact-xs"
            color={getColorFromKey(status?.key)}
            autoContrast
          >
            {status?.customName}
          </Button>
        ),
      }}
      popOver={{
        width: 220,
        content: <StatusOptions mainId={mainId} subId={subId} />,
      }}
    />
  );
};

export default StatusCell;
