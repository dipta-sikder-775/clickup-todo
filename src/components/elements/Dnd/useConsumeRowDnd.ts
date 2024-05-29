import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties } from "react";

interface IUseConsumeRowDndProps {
  id: UniqueIdentifier;
}

const useConsumeRowDnd = ({ id }: IUseConsumeRowDndProps) => {
  const {
    transform,
    transition,
    setNodeRef,
    isDragging,
    attributes,
    listeners,
  } = useSortable({
    id,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: "relative",
  };

  return {
    targetProps: {
      ref: setNodeRef,
      style: style,
    },
    controlElementProps: {
      ...attributes,
      ...listeners,
    },
  };
};

export default useConsumeRowDnd;
