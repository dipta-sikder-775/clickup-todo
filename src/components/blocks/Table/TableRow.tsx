// import { type Row, flexRender } from "@tanstack/react-table";
// import { CSSProperties } from "react";
// import { TTableRow } from "../../../app/features/todo/types";
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

// const TableRow = ({ row }: { row: Row<TTableRow> }) => {
//   const { transform, transition, setNodeRef, isDragging } = useSortable({
//     id: row.original.id!,
//   });

//   const style: CSSProperties = {
//     transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
//     transition: transition,
//     opacity: isDragging ? 0.8 : 1,
//     zIndex: isDragging ? 1 : 0,
//     position: "relative",
//   };

//   return (
//     // connect row ref to dnd-kit, apply important styles
//     <div
//       className="tr group/tableRow flex w-full items-center justify-start border-b border-solid border-border-gray-2 last:!border-b-0 hover:bg-bg-gray-hover-body"
//       ref={setNodeRef}
//       style={style}
//     >
//       {row?.getVisibleCells()?.map((cell) => (
//         <div
//           className="td"
//           key={cell.id}
//           style={{ width: cell.column.getSize() }}
//         >
//           {flexRender(cell.column.columnDef.cell, cell.getContext())}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TableRow;
