import { Popover, UnstyledButton } from "@mantine/core";
import cn from "../../../utils/cn";
import CellWrapper from "../../elements/CellWrapper";

type TEvents =
  | React.MouseEvent<HTMLButtonElement, MouseEvent>
  | React.FormEvent<HTMLButtonElement>
  | React.PointerEvent<HTMLButtonElement>;

type TFunc = ((event: TEvents) => void) | undefined;

interface IPopoverCellProps {
  target?: {
    content?: React.ReactNode;
    className?: string;
    stopPropagation?: boolean;
    onClick?: TFunc;
    onPointerDown?: TFunc;
    onChange?: TFunc;
    disabled?: boolean;
  };

  popOver?: {
    content?: React.ReactNode;
    width?: number;
  };
}

const manageStopPropagation =
  (props: {
    func?: TFunc;
    isDisabled?: boolean;
    enableStopPropagation?: boolean;
  }) =>
  (e: TEvents) => {
    e.stopPropagation();
    e.preventDefault();
    // if (props?.enableStopPropagation) {
    // }
    if (!props.isDisabled) {
      props?.func?.(e);
    }
  };

const PopoverCell = ({ popOver, target }: IPopoverCellProps) => {
  const { content: popoverContent, width = 300 } = popOver || {};

  return (
    <Popover width={width} trapFocus position="bottom" withArrow shadow="md">
      <Popover.Target>
        <UnstyledButton
          size="xs"
          color="#87909e"
          variant="subtle"
          onClick={manageStopPropagation({
            func: target?.onClick,
            isDisabled: target?.disabled,
            enableStopPropagation: target?.stopPropagation,
          })}
          onPointerDown={manageStopPropagation({
            func: target?.onPointerDown,
            isDisabled: target?.disabled,
            enableStopPropagation: target?.stopPropagation,
          })}
          onChange={manageStopPropagation({
            func: target?.onChange,
            isDisabled: target?.disabled,
            enableStopPropagation: target?.stopPropagation,
          })}
          // className="w-full h-full"
        >
          <CellWrapper className={cn(target?.className)}>
            {target?.content}
          </CellWrapper>
        </UnstyledButton>
      </Popover.Target>

      <Popover.Dropdown>{!!popoverContent && popoverContent}</Popover.Dropdown>
    </Popover>
  );
};

export default PopoverCell;
