import { Checkbox, Table, Tooltip } from "@mantine/core";
import { IoRadioButtonOn } from "react-icons/io5";
import {
  getTableRows,
  toggleSelectAllTodo,
  toggleSelectTodo,
} from "./app/features/todo/utils";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { tableHeads } from "./assets/todo-table-headings";

import ActionCell from "./components/blocks/ActionCell";
import AssigneeCell from "./components/blocks/AssigneeCell";
import CommentCell from "./components/blocks/CommentCell";
import DueDateCell from "./components/blocks/DueDateCell";
import PriorityCell from "./components/blocks/PriorityCell";
import StatusCell from "./components/blocks/StatusCell";
import Align from "./components/elements/Align";
import cn from "./utils/cn";
import { Fragment } from "react/jsx-runtime";

const App = () => {
  const dispatch = useAppDispatch();
  const { tableRows, isEverythingSelected, isPartiallySelected } =
    useAppSelector(getTableRows);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      <section></section>

      <Table
        borderColor="#f0f1f3"
        highlightOnHover
        stickyHeader
        highlightOnHoverColor="#f7f8f9"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <Checkbox
                color="#544dc9"
                size="xs"
                aria-label="Select row"
                checked={isEverythingSelected}
                indeterminate={isPartiallySelected}
                onChange={() => dispatch(toggleSelectAllTodo())}
              />
            </Table.Th>

            {tableHeads?.map((head) => (
              <Table.Th
                className="text-sm font-normal text-[#656f7d]"
                //
                key={head?.id}
              >
                {head?.title}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {tableRows?.map((row) => {
            return (
              <Fragment key={row?.id}>
                <Table.Tr>
                  <Table.Td>
                    <Checkbox
                      color="#544dc9"
                      size="xs"
                      aria-label="Select row"
                      checked={row.isSelected}
                      onChange={() =>
                        dispatch(
                          toggleSelectTodo({
                            mainTodoId: row?.id as string,
                            subTodoId: undefined,
                          }),
                        )
                      }
                    />
                  </Table.Td>

                  <Table.Td>
                    <Align className="justify-normal gap-2">
                      <Tooltip label={row?.status?.customName}>
                        <span>
                          <IoRadioButtonOn
                            className={cn("h-4 w-4", {
                              "text-[#228be6]": true,
                            })}
                          />
                        </span>
                      </Tooltip>

                      {row?.name}
                    </Align>
                  </Table.Td>

                  <Table.Td>
                    <AssigneeCell assignee={row?.assignee} mainId={row?.id} />
                  </Table.Td>

                  <Table.Td>
                    <DueDateCell dueDate={row?.dueDate} mainId={row?.id} />
                  </Table.Td>

                  <Table.Td>
                    <PriorityCell priority={row?.priority} mainId={row?.id} />
                  </Table.Td>

                  <Table.Td>
                    <StatusCell status={row?.status} mainId={row?.id} />
                  </Table.Td>

                  <Table.Td>
                    <CommentCell comments={row?.comments} mainId={row?.id} />
                  </Table.Td>

                  <Table.Td>
                    <ActionCell mainId={row?.id} />
                  </Table.Td>
                </Table.Tr>

                {row?.subtasks?.map((subtask) => {
                  return (
                    <Table.Tr>
                      <Table.Td>
                        <Checkbox
                          color="#544dc9"
                          size="xs"
                          aria-label="Select row"
                          checked={subtask.isSelected}
                          onChange={() =>
                            dispatch(
                              toggleSelectTodo({
                                mainTodoId: row?.id as string,
                                subTodoId: subtask?.id as string,
                              }),
                            )
                          }
                        />
                      </Table.Td>

                      <Table.Td>
                        <Align 
                        // className="justify-normal gap-2" 
                        className={cn("justify-normal gap-2" ,{
                          "!pl-6": row?.id && subtask?.id,
                        })}>
                          <Tooltip label={subtask?.status?.customName}>
                            <span>
                              <IoRadioButtonOn
                                className={cn("h-4 w-4", {
                                  "text-[#228be6]": true,
                                })}
                              />
                            </span>
                          </Tooltip>

                          {subtask?.name}
                        </Align>
                      </Table.Td>

                      <Table.Td>
                        <AssigneeCell
                          assignee={subtask?.assignee}
                          mainId={row?.id}
                        />
                      </Table.Td>

                      <Table.Td>
                        <DueDateCell
                          dueDate={subtask?.dueDate}
                          mainId={row?.id}
                          subId={subtask?.id}
                        />
                      </Table.Td>

                      <Table.Td>
                        <PriorityCell
                          priority={subtask?.priority}
                          mainId={row?.id}
                          subId={subtask?.id}
                        />
                      </Table.Td>

                      <Table.Td>
                        <StatusCell
                          status={subtask?.status}
                          mainId={row?.id}
                          subId={subtask?.id}
                        />
                      </Table.Td>

                      <Table.Td>
                        <CommentCell
                          comments={row?.comments}
                          mainId={row?.id}
                          subId={subtask?.id}
                        />
                      </Table.Td>

                      <Table.Td>
                        <ActionCell mainId={row?.id} subId={subtask?.id} />
                      </Table.Td>
                    </Table.Tr>
                  );
                })}
              </Fragment>
            );
          })}
        </Table.Tbody>
      </Table>
    </div>
  );
};

export default App;
