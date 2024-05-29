import {
  CollisionDetection,
  DndContext,
  DragEndEvent,
  Modifier,
  SensorDescriptor,
  SensorOptions,
} from "@dnd-kit/core";

interface IDragAndDropContextProps {
  contextProps: {
    collisionDetection: CollisionDetection;
    modifiers: Modifier[];
    onDragEnd: ({ active, over }: DragEndEvent) => void;
    sensors: SensorDescriptor<SensorOptions>[];
  };
  children: React.ReactNode;
}

const DragAndDropContext = ({
  contextProps,
  children,
}: IDragAndDropContextProps) => {
  return <DndContext {...contextProps}>{children}</DndContext>;
};

export default DragAndDropContext;
