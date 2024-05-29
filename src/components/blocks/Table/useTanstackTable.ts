// import {
//   DragEndEvent,
//   KeyboardSensor,
//   MouseSensor,
//   TouchSensor,
//   UniqueIdentifier,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import { arrayMove } from "@dnd-kit/sortable";
// import {
//   ColumnDef,
//   ExpandedState,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { useEffect, useMemo, useState } from "react";
// import { TTableRow } from "../../../app/features/todo/types";
// import { tableConfigColumns } from "./columns";

// const useTanStackTable = () => {
//   const columns = useMemo<ColumnDef<TTableRow>[]>(() => tableConfigColumns, []);

//   const [data, setData] = useState<TTableRow[]>(() => []);

// //   useEffect(() => {
// //     setData(tableData);
// //   }, [tableData]);

//   const dataIds = useMemo<UniqueIdentifier[]>(
//     () => data?.map(({ id }) => id!),
//     [data],
//   );

// //   const rerender = () => setData(() => tableData);
//   const [expanded, setExpanded] = useState<ExpandedState>({});

//   const table = useReactTable({
//     columns,
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
//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;
//     if (active && over && active.id !== over.id) {
//       setData((data) => {
//         const oldIndex = dataIds.indexOf(active.id);
//         const newIndex = dataIds.indexOf(over.id);
//         return arrayMove(data, oldIndex, newIndex); //this is just a splice util
//       });
//     }
//   };

//   const sensors = useSensors(
//     useSensor(MouseSensor, {}),
//     useSensor(TouchSensor, {}),
//     useSensor(KeyboardSensor, {}),
//   );
// };

// export default useTanStackTable;
