import { Button, Stack, Textarea } from "@mantine/core";
import { LuMessageCircle } from "react-icons/lu";
import { TComment } from "../../../app/features/todo/types";
import PopoverCell from "../PopoverCell";

interface ICommentCellProps {
  comments?: TComment[];
  mainId?: string | number;
  subId?: string | number;
}

const CommentCell = ({ comments, mainId, subId }: ICommentCellProps) => {
    console.log({mainId, subId})
  return (
    <PopoverCell
      target={{
        content: !!comments?.length && comments?.length,
        icon: {
          children: LuMessageCircle,
          className: "rotate-[270deg]",
        },
      }}
      popOver={{
        content: (
          <Stack gap="xs">
            <Textarea label="Comment" placeholder="Write comment here" />

            <Button size="xs" variant="light">
              Add Comment
            </Button>
          </Stack>
        ),
      }}
    />
  );
};

export default CommentCell;
