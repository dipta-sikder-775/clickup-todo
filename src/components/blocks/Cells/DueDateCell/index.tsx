import { Stack } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { Dayjs } from "dayjs";
import useUpdateTodo from "../../../../hooks/useUpdateTodo";
import { humanizeDate } from "../../../../utils/time";
import IconOrContentButton from "../../../elements/Button/IconOrContentButton";
import PopoverCell from "../PopoverCell";

interface IDueDateCellProps {
  dueDate?: string | number | Dayjs | Date | null | undefined;
  mainId?: string | number;
  subId?: string | number;
  className?: string;
}

type THandleDateChangeArgs = {
  mainId?: string | number | null | undefined;
  subId?: string | number | null | undefined;
  dueDate: string | number | Dayjs | Date | null | undefined;
};

const DueDateCell = ({
  dueDate,
  mainId,
  subId,
  className,
}: IDueDateCellProps) => {
  const { updateTodoData, mainTodoData, subTodoData } = useUpdateTodo({
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
        index:
          mainId && subId ? subTodoData?.index ?? 0 : mainTodoData?.index ?? 0,
        dueDate,
      },
    });
  };

  const { content, status } = humanizeDate(dueDate);

  return (
    <PopoverCell
      target={{
        content: (
          <IconOrContentButton
            data={{
              buttonFor: "due-date",
              content,
              status,
            }}
          />
        ),
        className: className,
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
