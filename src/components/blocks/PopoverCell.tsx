import { Button, Popover } from "@mantine/core";
import { IconType } from "react-icons";
import PopOverCellIcon from "../elements/Align/Icon/PopOverCellIcon";

interface IPopoverCellProps {
  target?: {
    type?: "button";
    content?: React.ReactNode;
    icon?: {
      children?: IconType;
      className?: string;
    };
  };

  popOver?: {
    content?: React.ReactNode;
    width?: number;
  };
}
const PopoverCell = ({ popOver, target }: IPopoverCellProps) => {
  const { content, icon, type } = target || {};
  const { content: popoverContent, width = 300 } = popOver || {};

  return (
    <Popover width={width} trapFocus position="bottom" withArrow shadow="md">
      <Popover.Target>
        {type !== "button" ? (
          <Button
            leftSection={
              <>
                {!!icon?.children && (
                  <PopOverCellIcon className={icon?.className}>
                    {icon?.children}
                  </PopOverCellIcon>
                )}
              </>
            }
            size="xs"
            color="#87909e"
            variant="subtle"
          >
            {!!content && content}
          </Button>
        ) : (
          !!content && content
        )}
      </Popover.Target>

      <Popover.Dropdown>{!!popoverContent && popoverContent}</Popover.Dropdown>
    </Popover>
  );
};

export default PopoverCell;
