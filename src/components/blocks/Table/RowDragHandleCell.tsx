// import { CellContext } from "@tanstack/react-table";
// import { TTableRow } from "../../../app/features/todo/types";
// import { useSortable } from "@dnd-kit/sortable";
// import { useAppDispatch } from "../../../app/hooks";
// import { IoMdArrowDropdown } from "react-icons/io";
// import cn from "../../../utils/cn";
// import { toggleCollapseTodo, toggleSelectTodo } from "../../../app/features/todo/utils";
// import { Checkbox } from "@mantine/core";
// import { RiDraggable } from "react-icons/ri";

// const RowDragHandleCell = ({
//     row,
//     getValue,
//   }: CellContext<TTableRow, unknown>) => {
//     const dispatch = useAppDispatch();
//     const { attributes, listeners } = useSortable({
//       id: row?.id,
//     });

//     console.log("row?.original: ", row?.original?.id);

//     return (
//       // Alternatively, you could set these attributes on the rows themselves
//       <div
//         style={{
//           // Since rows are flattened by default,
//           // we can use the row.depth property
//           // and paddingLeft to visually indicate the depth
//           // of the row
//           paddingLeft: `${row.depth * 2}rem`,
//         }}
//       >
//         <div {...attributes} {...listeners} className="flex items-center gap-1">
//           <RiDraggable className="h-4 w-4 cursor-pointer select-none fill-icon-gray text-icon-gray text-inherit" />
//           <Checkbox
//             color="#544dc9"
//             size="xs"
//             aria-label="Select row"
//             checked={row?.original?.isSelected}
//             onChange={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               console.log("checkbox clicked");
//               dispatch(
//                 toggleSelectTodo({
//                   mainTodoId: row?.original?.id as string,
//                   subTodoId: undefined,
//                 }),
//               );
//             }}
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//             }}
//             onPointerDown={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//             }}
//           />

//           <IoMdArrowDropdown
//             className={cn("h-4 w-4 transition-all duration-100 ease-linear", {
//               "rotate-[-90deg] transform": !row?.original?.isCollapsed,
//             })}
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               dispatch(toggleCollapseTodo(row.original.id!));
//             }}
//             onPointerDown={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//             }}
//           />
//         </div>
//       </div>
//     );
//   };

//   export default RowDragHandleCell;
