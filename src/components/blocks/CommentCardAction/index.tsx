import { GoPencil } from "react-icons/go";
import { RiDeleteBinLine } from "react-icons/ri";
import { removeComment } from "../../../app/features/todo/slice";
import { TComment } from "../../../app/features/todo/types";
import { useAppDispatch } from "../../../app/hooks";
import ActionsButton from "../../elements/Button/ActionsButton";

interface ICommentCardActionProps {
  comment?: TComment;
  mainId?: string | number;
  subId?: string | number;
  handleToggleEditMode: (comment: TComment | undefined | null) => void;
}

const CommentCardAction = ({
  comment,
  mainId,
  subId,
  handleToggleEditMode,
}: ICommentCardActionProps) => {
  const dispatch = useAppDispatch();

  return (
    <span className="flex h-full w-full items-center justify-center gap-2">
      <ActionsButton
        data={{
          icon: GoPencil,
          className: "w-5 h-5",
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleToggleEditMode(comment);
        }}
        onPointerDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      />

      <ActionsButton
        data={{
          icon: RiDeleteBinLine,
          className: "text-red-500 hover:text-red-600 w-5 h-5",
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch(removeComment({ mainId, subId, commentId: comment?.id }));
        }}
        onPointerDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      />
    </span>
  );

};

export default CommentCardAction;
