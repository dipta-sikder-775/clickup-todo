// const columns: TableColumn<TTableRow>[] = [
//   {
//     name: "Name",
//     sortable: true,
//     cell: (row) => (
//       <Align className="justify-normal gap-2">
//         <Tooltip label={row?.status?.customName}>
//           <span>
//             <IoRadioButtonOn
//               className={cn("h-4 w-4", {
//                 "text-[#228be6]": true,
//               })}
//             />
//           </span>
//         </Tooltip>

import { useMemo } from "react";
import { changeMainTodoIndex } from "./app/features/todo/slice";
import { getTableRows } from "./app/features/todo/utils";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import useRowDndContext from "./components/elements/Dnd/useRowDndContext";
import Table from "./components/ui/Table";

//         {row?.name}
//       </Align>
//     ),
//   },
//   {
//     name: "Assignee",
//     sortable: true,
//     cell: (row) => <AssigneeCell assignee={row?.assignee} mainId={row?.id} />,
//   },
//   {
//     name: "Due Date",
//     sortable: true,
//     cell: (row) => <DueDateCell dueDate={row?.dueDate} mainId={row?.id} />,
//   },
//   {
//     name: "Priority",
//     sortable: true,
//     cell: (row) => <PriorityCell priority={row?.priority} mainId={row?.id} />,
//   },
//   {
//     name: "Status",
//     sortable: true,
//     cell: (row) => <StatusCell status={row?.status} mainId={row?.id} />,
//   },
//   {
//     name: "Comments",
//     sortable: true,
//     cell: (row) => <CommentCell comments={row?.comments} mainId={row?.id} />,
//   },
//   {
//     name: "Actions",
//     sortable: false,
//     cell: (row) => <ActionCell mainId={row?.id} />,
//   },
// ];

// const cellWidths = {
//   name: 380,
//   assignee: 90,
//   dueDate: 110,
//   priority: 100,
//   status: 120,
//   comments: 80,
//   actions: 60,
// };

const App = () => {
  const dispatch = useAppDispatch();
  const selectTableRows = useMemo(getTableRows, []);
  const { tableRows } = useAppSelector(selectTableRows);

  const { dndContextProps, sortableContextProps } = useRowDndContext({
    dataSource: tableRows,
    uniqueKey: "id",
    handleReorder: ({ oldIndex, newIndex }) => {
      dispatch(changeMainTodoIndex({ oldIndex, newIndex }));
    },
  });

  return (
    <main>
      <Table
        dndContextProps={dndContextProps}
        sortableContextProps={sortableContextProps}
        tableRows={tableRows}
      />
    </main>
  );
};

export default App;
