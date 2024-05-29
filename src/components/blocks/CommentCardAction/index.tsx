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
          // console.log("Edit comment");
        }}
        onPointerDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // console.log("Edit comment");
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
          console.log("Delete comment");
          dispatch(removeComment({ mainId, subId, commentId: comment?.id }));
        }}
        onPointerDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log("Delete comment");
        }}
      />
    </span>
  );

  // return (
  //   <PopoverCell
  //     target={{
  //       content: <ActionsButton />,
  //       className: "!border-[0px] !p-0 relative",
  //       stopPropagation: true,
  //     }}
  //     // children: LuMessageCircle,
  //     // className: "rotate-[270deg]",
  //     popOver={{
  //       content: (
  //         <div className="flex h-full w-full items-center justify-center gap-2">
  //           <ActionsButton
  //             data={{
  //               icon: GoPencil,
  //               className: "w-6 h-6",
  //             }}
  //             onClick={(e)=>{
  //               e.preventDefault();
  //               e.stopPropagation();
  //               console.log("Edit comment");

  //             }}
  //             onPointerDown={(e)=>{
  //               e.preventDefault();
  //               e.stopPropagation();
  //               console.log("Edit comment");

  //             }}
  //           />

  //           <ActionsButton
  //             data={{
  //               icon: RiDeleteBinLine,
  //               className: "text-red-500 hover:text-red-600 w-6 h-6",
  //             }}

  //             onClick={(e)=>{
  //               e.preventDefault();
  //               e.stopPropagation();
  //               console.log("Delete comment");

  //             }}
  //             onPointerDown={(e)=>{
  //               e.preventDefault();
  //               e.stopPropagation();
  //               console.log("Delete comment");

  //             }}
  //           />
  //         </div>
  //       ),
  //       width: 100,
  //     }}
  //   />
  // );
};

export default CommentCardAction;
