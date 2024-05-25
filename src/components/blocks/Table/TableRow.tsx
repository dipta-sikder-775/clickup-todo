// import { Checkbox, Table, Tooltip } from "@mantine/core";
// import PriorityCell from "../PriorityCell";
// import StatusCell from "../StatusCell";
// import CommentCell from "../CommentCell";
// import ActionCell from "../ActionCell";
// import DueDateCell from "../DueDateCell";
// import AssigneeCell from "../AssigneeCell";
// import { IoRadioButtonOn } from "react-icons/io5";
// import cn from "../../../utils/cn";
// import { useAppDispatch } from "../../../app/hooks";
// import { toggleSelectTodo } from "../../../app/features/todo/utils";

// const TableRow = () => {
//     const dispatch = useAppDispatch();
//   return (
//     <Table.Tr key={row?.id}>
//       <Table.Td>
//         <Checkbox
//           color="#544dc9"
//           size="xs"
//           aria-label="Select row"
//           checked={row.isSelected}
//           onChange={() => dispatch(toggleSelectTodo(row?.id as string))}
//         />
//       </Table.Td>

//       <Table.Td>
//         <Align className="justify-normal gap-2">
//           <Tooltip label={row?.status?.customName}>
//             <span>
//               <IoRadioButtonOn
//                 className={cn("h-4 w-4", {
//                   "text-[#228be6]": true,
//                 })}
//               />
//             </span>
//           </Tooltip>

//           {row?.name}
//         </Align>
//       </Table.Td>

//       <Table.Td>
//         <AssigneeCell assignee={row?.assignee} mainId={row?.id} />
//       </Table.Td>

//       <Table.Td>
//         <DueDateCell dueDate={row?.dueDate} mainId={row?.id} />
//       </Table.Td>

//       <Table.Td>
//         <PriorityCell priority={row?.priority} mainId={row?.id} />
//       </Table.Td>

//       <Table.Td>
//         <StatusCell status={row?.status} mainId={row?.id} />
//       </Table.Td>

//       <Table.Td>
//         <CommentCell comments={row?.comments} mainId={row?.id} />
//       </Table.Td>

//       <Table.Td>
//         <ActionCell mainId={row?.id} />
//       </Table.Td>
//     </Table.Tr>
//   );
// };

// export default TableRow;
