// import { Tooltip } from "@mantine/core";
// import { ColumnDef } from "@tanstack/react-table";
// import { IoRadioButtonOn } from "react-icons/io5";
// import { TTableRow } from "../../../app/features/todo/types";
// import cn from "../../../utils/cn";
// import Align from "../../elements/Align";
// import AssigneeCell from "../Cells/AssigneeCell";
// import CommentCell from "../Cells/CommentCell";
// import PriorityCell from "../Cells/PriorityCell";
// import StatusCell from "../Cells/StatusCell";
// import RowDragHandleCell from "./RowDragHandleCell";
// import SelectAllRow from "./SelectAllRow";
// import DueDateCell from "../Cells/DueDateCell";
// import ActionCell from "../Cells/ActionCell";

// export const tableConfigColumns: ColumnDef<TTableRow>[] = [
//   // Create a dedicated drag handle column. Alternatively, you could just set up dnd events on the rows themselves.
//   // {
//   //   id: "drag-handle",
//   //   // header: SelectAllRow,
//   //   header: SelectAllRow,
//   //   // cell: RowDragHandleCell,
//   //   // footer: (props) => props?.column?.id,
//   //   size: 60,
//   // },
//   {
//     accessorKey: "name",
//     header: SelectAllRow,
//     cell: (props) => {
//       const {
//         row: { original },
//       } = props;
//       return (
//         <Align className="justify-normal">
//           <RowDragHandleCell {...props} />

//           <Align className="justify-normal gap-2">
//             <Tooltip label={original?.status?.customName}>
//               <span>
//                 <IoRadioButtonOn
//                   className={cn("h-4 w-4", {
//                     "text-[#228be6]": true,
//                   })}
//                 />
//               </span>
//             </Tooltip>

//             {original?.name}
//           </Align>

//           {/* <Collapse className="pl-4" in={!!original?.isCollapsed}>
//             {original?.subtasks?.map((subtask) => (
//               <Align className="justify-normal gap-2" key={subtask?.id}>
//                 <Tooltip label={subtask?.status?.customName}>
//                   <span>
//                     <IoRadioButtonOn
//                       className={cn("h-4 w-4", {
//                         "text-[#228be6]": true,
//                       })}
//                     />
//                   </span>
//                 </Tooltip>

//                 {subtask?.name}
//               </Align>
//             ))}
//           </Collapse> */}
//         </Align>
//       );
//     },
//     // footer: (props) => props?.column?.id,
//     size: 300,
//   },
//   {
//     // accessorFn: (row) => row.lastName,
//     id: "assignee",
//     header: "Assignee",
//     accessorKey: "assignee",
//     cell: ({ row: { original } }) => (
//       <>
//         <AssigneeCell assignee={original?.assignee} mainId={original?.id} />

//         {/* <Collapse in={!!original?.isCollapsed}>
//             {original?.subtasks?.map((subtask) => (
//               <AssigneeCell
//                 assignee={subtask?.assignee}
//                 mainId={original?.id}
//                 subId={subtask?.id}
//                 key={subtask?.id}
//               />
//             ))}
//           </Collapse> */}
//       </>
//     ),
//     // footer: (props) => props?.column?.id,
//   },
//   {
//     header: "Due Date",
//     accessorKey: "dueDate",
//     cell: ({ row: { original } }) => (
//       <>
//         <DueDateCell dueDate={original?.dueDate} mainId={original?.id} />

//         {/* <Collapse in={!!original?.isCollapsed}>
//             {original?.subtasks?.map((subtask) => (
//               <DueDateCell
//                 dueDate={subtask?.dueDate}
//                 mainId={original?.id}
//                 subId={subtask?.id}
//                 key={subtask?.id}
//               />
//             ))}
//           </Collapse> */}
//       </>
//     ),
//     // footer: (props) => props?.column?.id,
//   },
//   {
//     header: "Priority",
//     accessorKey: "priority",
//     cell: ({ row: { original } }) => (
//       <>
//         <PriorityCell priority={original?.priority} mainId={original?.id} />

//         {/* <Collapse in={!!original?.isCollapsed}>
//             {original?.subtasks?.map((subtask) => (
//               <PriorityCell
//                 priority={subtask?.priority}
//                 mainId={original?.id}
//                 subId={subtask?.id}
//                 key={subtask?.id}
//               />
//             ))}
//           </Collapse> */}
//       </>
//     ),
//     // footer: (props) => props?.column?.id,
//   },
//   {
//     header: "Status",
//     accessorKey: "status",
//     cell: ({ row: { original } }) => (
//       <>
//         <StatusCell status={original?.status} mainId={original?.id} />

//         {/* <Collapse in={!!original?.isCollapsed}>
//             {original?.subtasks?.map((subtask) => (
//               <StatusCell
//                 status={subtask?.status}
//                 mainId={original?.id}
//                 subId={subtask?.id}
//                 key={subtask?.id}
//               />
//             ))}
//           </Collapse> */}
//       </>
//     ),
//     // footer: (props) => props?.column?.id,
//   },
//   {
//     header: "Comments",
//     accessorKey: "comment",
//     cell: ({ row: { original } }) => (
//       <>
//         <CommentCell comments={original?.comments} mainId={original?.id} />

//         {/* <Collapse in={!!original?.isCollapsed}>
//             {original?.subtasks?.map((subtask) => (
//               <CommentCell
//                 comments={subtask?.comments}
//                 mainId={original?.id}
//                 subId={subtask?.id}
//                 key={subtask?.id}
//               />
//             ))}
//           </Collapse> */}
//       </>
//     ),
//     // footer: (props) => props?.column?.id,
//   },
//   {
//     header: "Actions",
//     // accessorKey: "comment",
//     id: "action",
//     cell: ({ row: { original, depth } }) => {
//       return (
//         <>
//           <ActionCell mainId={original?.id} />

//           {/* <Collapse className="flex flex-col gap-2 mt-2" in={!!original?.isCollapsed}>
//               {original?.subtasks?.map((subtask) => (
//                 <ActionCell
//                   mainId={original?.id}
//                   subId={subtask?.id}
//                   key={subtask?.id}
//                 />
//               ))}
//             </Collapse> */}
//         </>
//       );
//     },
//   },
// ];
