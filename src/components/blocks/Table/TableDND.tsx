// import React, { useEffect } from "react";

// import {
//   ExpandedState,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// // needed for table body level scope DnD setup
// import {
//   DndContext,
//   KeyboardSensor,
//   MouseSensor,
//   TouchSensor,
//   closestCenter,
//   useSensor,
//   useSensors,
//   type DragEndEvent,
//   type UniqueIdentifier,
// } from "@dnd-kit/core";
// import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
// import {
//   SortableContext,
//   arrayMove,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";

// // needed for row & cell level scope DnD setup
// import { TTableRow } from "../../../app/features/todo/types";
// import TableRow from "./TableRow";

// // Cell Component

// // Row Component

// interface IRowDNDProps {
//   tableData: TTableRow[];
// }

// // Table Component
// export default function RowDND({ tableData }: IRowDNDProps) {
//   const [data, setData] = React.useState<TTableRow[]>(() => tableData);

//   useEffect(() => {
//     setData(tableData);
//   }, [tableData]);

//   const dataIds = React.useMemo<UniqueIdentifier[]>(
//     () => data?.map(({ id }) => id!),
//     [data],
//   );

//   const rerender = () => setData(() => tableData);

//   const [expanded, setExpanded] = React.useState<ExpandedState>({});

//   const table = useReactTable({
//     columns:[],
//     data,
//     // state: {
//     //   expanded,
//     // },
//     getCoreRowModel: getCoreRowModel(),
//     getRowId: (row) => String(row.id)!, //required because row indexes will change
//     debugTable: true,
//     debugHeaders: true,
//     debugColumns: true,
//     // getExpandedRowModel: getExpandedRowModel(),
//     // getSubRows: (row) => row.subtasks,
//     // onExpandedChange: setExpanded,
//   });

//   // reorder rows after drag & drop
//   function handleDragEnd(event: DragEndEvent) {
//     const { active, over } = event;
//     if (active && over && active.id !== over.id) {
//       setData((data) => {
//         const oldIndex = dataIds.indexOf(active.id);
//         const newIndex = dataIds.indexOf(over.id);
//         return arrayMove(data, oldIndex, newIndex); //this is just a splice util
//       });
//     }
//   }

//   const sensors = useSensors(
//     useSensor(MouseSensor, {}),
//     useSensor(TouchSensor, {}),
//     useSensor(KeyboardSensor, {}),
//   );

//   return (
//     // NOTE: This provider creates div elements, so don't nest inside of <table> elements
//     <DndContext
//       collisionDetection={closestCenter}
//       modifiers={[restrictToVerticalAxis]}
//       onDragEnd={handleDragEnd}
//       sensors={sensors}
//     >
//       <div className="p-2">
//         <section className="table w-full">
//           <div className="thead w-full">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <div
//                 className="tr flex items-center justify-start"
//                 key={headerGroup.id}
//               >
//                 {headerGroup?.headers?.map((header) => (
//                   <div
//                     className="th text-xs text-[#656f7d]"
//                     key={header.id}
//                     //   colSpan={header.colSpan}
//                     style={{ width: header.getSize() }}
//                   >
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext(),
//                         )}
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>

//           <div className="tbody">
//             <SortableContext
//               items={dataIds}
//               strategy={verticalListSortingStrategy}
//             >
//               {table.getRowModel().rows.map((row) => (
//                 <TableRow key={row.id} row={row} />
//               ))}
//             </SortableContext>
//           </div>
//         </section>
//         {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
//       </div>
//     </DndContext>
//   );
// }
