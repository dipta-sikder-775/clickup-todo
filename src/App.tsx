import { Fragment } from "react/jsx-runtime";
import { getTableRows } from "./app/features/todo/todoSlice";
import { useAppSelector } from "./app/hooks";
import { tableHeads } from "./assets/todo-table-headings";
import dayjs from "dayjs";
import { humanizeDate } from "./utils/time";

const App = () => {
  const rows = useAppSelector(getTableRows);
  // console.log(rows);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      <table>
        <thead>
          <tr>
            <th></th>
            {tableHeads?.map((head) => (
              <th className="text-[#656f7d] text-xs font-normal" key={head?.id}>
                {head?.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            {rows?.map((row) => {
              console.log(row);
              return (
                <Fragment key={row?.id}>
                  <td>{row?.name}</td>
                  <td>{row?.assignee}</td>
                  <td>{humanizeDate(row?.dueDate)}</td>
                  <td>{row?.priority}</td>
                  <td>{row?.status}</td>
                  <td>{row?.comments}</td>
                </Fragment>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;
