import { Stack } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { Dayjs } from "dayjs";
import { CiCalendarDate } from "react-icons/ci";
import useUpdateTodo from "../../../hooks/useUpdateTodo";
import { humanizeDate } from "../../../utils/time";
import PopoverCell from "../PopoverCell";

interface IDueDateCellProps {
  dueDate?: string | number | Dayjs | Date | null | undefined;
  mainId?: string | number;
  subId?: string | number;
}

type THandleDateChangeArgs = {
  mainId?: string | number | null | undefined;
  subId?: string | number | null | undefined;
  dueDate: string | number | Dayjs | Date | null | undefined;
};

const DueDateCell = ({ dueDate, mainId, subId }: IDueDateCellProps) => {
  const { updateTodoData } = useUpdateTodo({
    mainId,
    subId,
  });

  const handleDueDateChange = ({
    mainId,
    subId,
    dueDate,
  }: THandleDateChangeArgs) => {
    updateTodoData({
      mainId,
      subId,
      updatedTodo: {
        dueDate,
      },
    });
  };
  // console.log({ mainId, subId });

  return (
    <PopoverCell
      target={{
        content: !!dueDate && humanizeDate(dueDate),
        icon: {
          children: CiCalendarDate,
        },
      }}
      popOver={{
        content: (
          <Stack gap="xs">
            <DatePicker
              value={dueDate as Date}
              onChange={(dateValue) => {
                handleDueDateChange({ mainId, subId, dueDate: dateValue });
              }}
              defaultDate={new Date(dueDate as Date)}
            />
          </Stack>
        ),
      }}
    />
  );
};

export default DueDateCell;
