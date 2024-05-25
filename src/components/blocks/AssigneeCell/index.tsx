import { MultiSelect, Stack } from "@mantine/core";
import { IoMdPersonAdd } from "react-icons/io";
import { TAssign } from "../../../app/features/todo/types";
import PopoverCell from "../PopoverCell";

interface IAssigneeCellProps {
  assignee?: TAssign[];
  mainId?: string | number;
  subId?: string | number;
}

const AssigneeCell = ({ assignee, mainId, subId }: IAssigneeCellProps) => {
  console.log({ mainId, subId });
  return (
    <PopoverCell
      target={{
        content: assignee?.map((assign) => assign.name).join(", "),
        icon: {
          children: IoMdPersonAdd,
        },
      }}
      popOver={{
        content: (
          <Stack gap="xs">
            <MultiSelect
              label="Your favorite libraries"
              placeholder="Pick value"
              data={["React", "Angular", "Vue", "Svelte"]}
              defaultValue={["React"]}
              clearable
              searchable
            />
          </Stack>
        ),
      }}
    />
  );
};

export default AssigneeCell;
