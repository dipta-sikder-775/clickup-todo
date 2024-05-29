import {
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useMemo } from "react";

interface IUseRowDndContextProps<T> {
  dataSource: T[];
  uniqueKey: keyof T;
  handleReorder?: (props: {
    oldIndex: number;
    newIndex: number;
    newId: number | string;
    oldId: number | string;
  }) => void;
}

const useRowDndContext = <T>({
  dataSource,
  uniqueKey,
  handleReorder,
}: IUseRowDndContextProps<T>) => {
  const dataIds = useMemo<UniqueIdentifier[]>(
    () =>
      (dataSource ?? [])?.map(
        (dt) => String(dt?.[uniqueKey]) as UniqueIdentifier,
      ),
    [dataSource, uniqueKey],
  );

  // reorder rows after drag & drop
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active && over && active.id !== over.id) {
      const oldIndex = dataIds.indexOf(active.id);
      const newIndex = dataIds.indexOf(over.id);
      handleReorder?.({ newId: over.id, oldId: active.id, newIndex, oldIndex });
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  return {
    dndContextProps: {
      collisionDetection: closestCenter,
      modifiers: [restrictToVerticalAxis],
      onDragEnd: handleDragEnd,
      sensors,
    },

    sortableContextProps: {
      items: dataIds,
      strategy: verticalListSortingStrategy,
    },

    data: {
      reOrderedDataToRender: dataSource,
    },
  };
};

export default useRowDndContext;
