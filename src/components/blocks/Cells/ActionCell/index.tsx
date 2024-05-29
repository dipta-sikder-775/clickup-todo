import { Button, Stack, Text } from "@mantine/core";
import { RiDeleteBinLine } from "react-icons/ri";
import { removeTodo } from "../../../../app/features/todo/slice";
import { useAppDispatch } from "../../../../app/hooks";
import ActionsButton from "../../../elements/Button/ActionsButton";
import PopOverCellIcon from "../../../elements/Icon/PopOverCellIcon";
import PopoverCell from "../PopoverCell";
import cn from "../../../../utils/cn";

interface IActionCellProps {
  mainId?: string | number;
  subId?: string | number;
  className?: string;
}

const ActionCell = ({ mainId, subId, className }: IActionCellProps) => {
  const dispatch = useAppDispatch();
  // console.log({ mainId, subId });

  const handleDelete =
    ({ mainId, subId }: IActionCellProps) =>
    () => {
      dispatch(removeTodo({ mainTodoId: mainId!, subTodoId: subId! }));
    };

  return (
    <PopoverCell
      target={{
        content: <ActionsButton />,
        className: cn("!border-[0px] !p-0 ", className),
      }}
      popOver={{
        width: 200,
        content: (
          <Stack gap="xs">
            <Text variant="text">Do you want to delete?</Text>

            <Button color="red" onClick={handleDelete({ mainId, subId })}>
              <PopOverCellIcon className="">{RiDeleteBinLine}</PopOverCellIcon>
            </Button>
          </Stack>
        ),
      }}
    />
  );
};

export default ActionCell;
