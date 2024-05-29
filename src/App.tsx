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
import StatusButton from "./components/elements/Button/StatusButton";

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
  const { tableRows, todoTableRows, doneTableRows, inProgressTableRows } =
    useAppSelector(selectTableRows);

  const { dndContextProps, sortableContextProps } = useRowDndContext({
    dataSource: tableRows,
    uniqueKey: "id",
    handleReorder: ({ oldIndex, newIndex }) => {
      dispatch(changeMainTodoIndex({ oldIndex, newIndex }));
    },
  });

  return (
    <main className="flex flex-col gap-3 py-4 px-2">
      <section>
        <div>
          <StatusButton
            data={{
              status: "TODO",
              text: "Todo",
            }}
            className="w-fit"
          />
        </div>

        <Table
          dndContextProps={dndContextProps}
          sortableContextProps={sortableContextProps}
          tableRows={todoTableRows}
        />
      </section>

     {!!inProgressTableRows?.length&& <section>
        <div>
          <StatusButton
            data={{
              status: "IN_PROGRESS",
              text: "Todo",
            }}
            className="w-fit"
          />
        </div>

        <Table
          dndContextProps={dndContextProps}
          sortableContextProps={sortableContextProps}
          tableRows={inProgressTableRows}
        />
      </section>}

      {!!doneTableRows?.length&&<section>
        <div>
          <StatusButton
            data={{
              status: "DONE",
              text: "Todo",
            }}
            className="w-fit"
          />
        </div>

        <Table
          dndContextProps={dndContextProps}
          sortableContextProps={sortableContextProps}
          tableRows={doneTableRows}
        />
      </section>}
    </main>
  );
};

export default App;
