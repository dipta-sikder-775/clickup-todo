import { Button, Stack, Text } from "@mantine/core";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { removeTodo } from "../../../app/features/todo/utils";
import { useAppDispatch } from "../../../app/hooks";
import PopOverCellIcon from "../../elements/Align/Icon/PopOverCellIcon";
import PopoverCell from "../PopoverCell";

interface IActionCellProps {
  mainId?: string | number;
  subId?: string | number;
}

const ActionCell = ({ mainId, subId }: IActionCellProps) => {
  const dispatch = useAppDispatch();
  console.log({ mainId, subId });

  const handleDelete =
    ({ mainId, subId }: IActionCellProps) =>
    () => {
      dispatch(removeTodo({ mainTodoId: mainId!, subTodoId: subId! }));
    };

  return (
    <PopoverCell
      target={{
        content: <BsThreeDots/>,
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
