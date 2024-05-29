import { TPriority } from "../../../../app/features/todo/types";
import PriorityButton from "../../../elements/Button/PriorityButton";
import PriorityOptions from "../../PriorityOptions";
import { IStatusOptionsProps } from "../../StatusOptions";
import PopoverCell from "../PopoverCell";

interface IPriorityCellProps extends IStatusOptionsProps {
  priority?: TPriority;
  className?: string;
}

const PriorityCell = ({
  priority,
  mainId,
  subId,
  className,
}: IPriorityCellProps) => {
  const selectedKey = priority?.key;

  return (
    <PopoverCell
      target={{
        content: (
          <PriorityButton data={{ text: priority?.customName, selectedKey }} />
        ),
        className,
      }}
      popOver={{
        width: 220,
        content: (
          <PriorityOptions priority={priority} mainId={mainId} subId={subId} />
        ),
      }}
    />
  );
};

export default PriorityCell;
