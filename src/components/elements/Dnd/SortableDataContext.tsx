import { UniqueIdentifier } from "@dnd-kit/core";
import { SortableContext, SortingStrategy } from "@dnd-kit/sortable";

interface ISortableDataContextProps {
  sortableContextProps: {
    items: (
      | UniqueIdentifier
      | {
          id: UniqueIdentifier;
        }
    )[];
    strategy?: SortingStrategy;
  };
  children: React.ReactNode;
}

const SortableDataContext = ({
  sortableContextProps,
  children,
}: ISortableDataContextProps) => {
  return (
    <SortableContext {...sortableContextProps}>{children}</SortableContext>
  );
};

export default SortableDataContext;
