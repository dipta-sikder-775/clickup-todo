import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getTableRows } from "./app/features/todo/utils";
import useRowDndContext from "./components/elements/Dnd/useRowDndContext";
import { changeMainTodoIndex } from "./app/features/todo/slice";
import Table from "./components/ui/Table";
import StatusButton from "./components/elements/Button/StatusButton";

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
    <main className="flex flex-col gap-3 px-2 py-4">
      <section>
        <div className="ml-10">
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

      {!!inProgressTableRows?.length && (
        <section>
          <div className="ml-10">
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
        </section>
      )}

      {!!doneTableRows?.length && (
        <section>
          <div className="ml-10">
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
        </section>
      )}
    </main>
  );
};

export default App;
