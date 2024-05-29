import { Button, Textarea } from "@mantine/core";
import dayjs from "dayjs";
import { useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import {
  addComment,
  incrementLikeOfComment,
  updateComment,
} from "../../../../app/features/todo/slice";
import { TComment } from "../../../../app/features/todo/types";
import { useAppDispatch } from "../../../../app/hooks";
import cn from "../../../../utils/cn";
import Avatar from "../../../elements/Avatar";
import CommentButton from "../../../elements/Button/CommentButton";
import CommentCardAction from "../../CommentCardAction";
import PopoverCell from "../PopoverCell";

interface ICommentCellProps {
  comments?: TComment[];
  mainId?: string | number;
  subId?: string | number;
  className?: string;
}

interface ICommentCardProps {
  comment?: TComment;
  mainId?: string | number;
  subId?: string | number;
  handleToggleEditMode: (comment: TComment | undefined | null) => void;
  editCommentData: TComment | null | undefined;
}

const CommentCard = ({
  comment,
  mainId,
  subId,
  handleToggleEditMode,
  editCommentData,
}: ICommentCardProps) => {
  const dispatch = useAppDispatch();
  const parsedDate = dayjs(comment?.date);
  const formattedDate = comment?.date
    ? `${parsedDate.format("MMM DD")} at ${parsedDate.format("hh:mm a")}`
    : "";

  const isLiked = !!comment?.likes;

  const handleLikeClick: React.MouseEventHandler<HTMLSpanElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(incrementLikeOfComment({ mainId, subId, commentId: comment?.id }));
  };

  return (
    <div className="group/card rounded border border-solid border-border-gray-2">
      <div className="overflow-hidden px-5 py-1">
        <div className="flex items-center justify-between pt-2">
          <span className="flex items-center gap-2 text-sm font-medium text-text-black-1">
            <Avatar
              avatar={comment?.author?.avatar}
              id={comment?.id}
              name={comment?.author?.name}
              key={comment?.id}
            />
            {comment?.author?.name}
          </span>

          <span>
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className={cn(
                "text-xs font-normal text-text-gray-1 group-hover/card:hidden",
                {
                  "!hidden !opacity-0": editCommentData?.id === comment?.id,
                },
              )}
            >
              {formattedDate}
            </span>

            <span
              className={cn("hidden group-hover/card:block", {
                "!block !opacity-100": editCommentData?.id === comment?.id,
              })}
            >
              <CommentCardAction
                comment={comment}
                mainId={mainId}
                subId={subId}
                handleToggleEditMode={handleToggleEditMode}
              />
            </span>
          </span>
        </div>

        <p className="mt-3 text-wrap text-justify text-sm font-normal text-text-black-1">
          {comment?.text}
        </p>
      </div>

      <div className="mt-2 !w-full border-b border-solid border-border-gray-2" />

      <div className="overflow-hidden px-5 py-1 hover:bg-bg-gray-hover-body">
        <span className="select-none">
          <span
            className={cn(
              "flex w-fit cursor-pointer items-center gap-[5px] rounded-full  px-2 py-0.5 transition-all duration-300 ease-linear",
              {
                "border border-solid border-border-violet-like bg-bg-violet-like hover:bg-bg-violet-like-hover":
                  isLiked,
              },
            )}
            onClick={handleLikeClick}
          >
            {isLiked ? (
              <BiSolidLike className="h-3.5 w-3.5 cursor-pointer text-icon-yellow-like" />
            ) : (
              <BiLike className="h-3.5 w-3.5 cursor-pointer text-icon-gray" />
            )}
            <span className="text-xs font-medium text-text-black-1">
              {comment?.likes}
            </span>
          </span>
        </span>
      </div>
    </div>
  );
};

const CommentCell = ({
  comments,
  mainId,
  subId,
  className,
}: ICommentCellProps) => {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState("");
  const [editCommentData, setEditCommentData] = useState<
    TComment | null | undefined
  >(null);
  const isEditMode = !!editCommentData;

  const handleToggleEditMode = (comment: TComment | null | undefined) => {
    setEditCommentData((prev) => {
      if (!prev) {
        setComment(comment?.text ?? "");
        return comment;
      } else {
        setComment("");
        return null;
      }
    });
  };

  const handleManageCommentSubmit: React.MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isEditMode) {
      dispatch(
        addComment({
          mainId: mainId!,
          subId,
          comment: {
            text: comment,
          },
        }),
      );
      setComment("");
      return;
    } else if (isEditMode && comment !== editCommentData?.text) {
      dispatch(
        updateComment({
          mainId,
          subId,
          updatedComment: {
            ...editCommentData,
            text: comment,
          },
        }),
      );
      setComment("");
      setEditCommentData(null);
    } else {
      setComment("");
      setEditCommentData(null);
    }
  };

  return (
    <PopoverCell
      target={{
        content: (
          <CommentButton
            data={{ text: !!comments?.length && comments?.length }}
          />
        ),
        className,
      }}
      popOver={{
        content: (
          <div className="flex h-full w-full flex-col">
            <div className="flex flex-col gap-2">
              {comments?.map((comment) => {
                return (
                  <CommentCard
                    comment={comment}
                    mainId={mainId}
                    subId={subId}
                    handleToggleEditMode={handleToggleEditMode}
                    editCommentData={editCommentData}
                    key={comment?.id}
                  />
                );
              })}
            </div>

            <div className="mt-3 flex flex-col gap-1">
              <Textarea
                label="Comment"
                placeholder="Write comment here"
                children={comment}
                value={comment}
                onChange={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setComment(event.currentTarget.value);
                }}
              />

              <Button
                onClick={handleManageCommentSubmit}
                disabled={!comment}
                size="xs"
                variant={
                  isEditMode
                    ? comment === editCommentData?.text
                      ? "outline"
                      : "light"
                    : "filled"
                }
              >
                {isEditMode
                  ? comment === editCommentData?.text
                    ? "Cancel Edit"
                    : "Update Comment"
                  : "Add Comment"}
              </Button>
            </div>
          </div>
        ),
      }}
    />
  );
};

export default CommentCell;
