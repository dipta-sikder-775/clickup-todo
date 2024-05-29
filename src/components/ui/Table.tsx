import {
  CollisionDetection,
  DragEndEvent,
  Modifier,
  SensorDescriptor,
  SensorOptions,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { SortingStrategy } from "@dnd-kit/sortable";
import { Collapse } from "@mantine/core";
import { Fragment } from "react";
import { TTableRows } from "../../app/features/todo/types";
import CreateNewRow from "../blocks/CreateNewRow";
import BodyRow from "../blocks/Table/BodyRow";
import HeadRow from "../blocks/Table/HeadRow";
import DragAndDropContext from "../elements/Dnd/DragAndDropContext";
import SortableDataContext from "../elements/Dnd/SortableDataContext";

interface ITableProps {
  tableRows: TTableRows;
  sortableContextProps: {
    items: UniqueIdentifier[];
    strategy: SortingStrategy;
  };
  dndContextProps: {
    collisionDetection: CollisionDetection;
    modifiers: Modifier[];
    onDragEnd: ({ active, over }: DragEndEvent) => void;
    sensors: SensorDescriptor<SensorOptions>[];
  };
}

const Table = ({
  dndContextProps,
  sortableContextProps,
  tableRows,
}: ITableProps) => {
  return (
    <div>
      <DragAndDropContext contextProps={dndContextProps}>
        <div className="table">
          <div className="thead sticky top-0">
            <HeadRow />
          </div>

          <div className="tbody">
            <SortableDataContext sortableContextProps={sortableContextProps}>
              {tableRows?.map((row) => {
                return (
                  <Fragment key={row.id}>
                    <BodyRow row={row} mainId={row?.id} />

                    <Collapse
                      in={!!row?.isCollapsed && !!row?.subtasks?.length}
                    >
                      {row?.subtasks?.map((subtask) => {
                        return (
                          <Fragment key={subtask?.id}>
                            <BodyRow
                              row={subtask}
                              mainId={row?.id}
                              subId={subtask?.id}
                            />
                          </Fragment>
                        );
                      })}
                    </Collapse>

                    {row?.isCollapsed && (
                      <CreateNewRow
                        mainId={row?.id}
                        placeholder="Write a sub-todo name..."
                      />
                    )}
                  </Fragment>
                );
              })}
            </SortableDataContext>

            <CreateNewRow />
          </div>
        </div>
      </DragAndDropContext>
    </div>
  );
};

export default Table;
