import {
  ITableRow,
  TPriorityKey,
  TStatusKey,
} from "../app/features/todo/types";
import { selectTodo, updateTodo } from "../app/features/todo/utils";
import { useAppDispatch, useAppSelector } from "../app/hooks";

type TUpdateTodoDataArgs = {
  mainId?: string | number | null | undefined;
  subId?: string | number | null | undefined;
  updatedTodo: ITableRow;
};

type TIsStatusSelectedArgs = {
  mainId?: string | number;
  subId?: string | number;
  allTodos: {
    [key: string]: ITableRow;
  };
} & (
  | {
      optionKey: TStatusKey;
      checkingFor: "status";
    }
  | {
      optionKey: TPriorityKey;
      checkingFor: "priority";
    }
);

type TUseUpdateTodo = Omit<TUpdateTodoDataArgs, "updatedTodo"> | void;

const useUpdateTodo = ({ mainId, subId }: TUseUpdateTodo = {}) => {
  const dispatch = useAppDispatch();
  const { tableRows: allTodos } = useAppSelector(selectTodo);

  const updateTodoData = ({
    mainId,
    subId,
    updatedTodo,
  }: TUpdateTodoDataArgs) => {
    if (!mainId && !subId) return;

    if (mainId && subId) {
      dispatch(
        updateTodo({
          mainTodoId: mainId!,
          subTodoId: subId!,
          updatedTodo: {
            ...(allTodos[mainId].subtasks![subId!] ?? {}),
            ...updatedTodo,
          },
        }),
      );

      return;
    } else if (mainId) {
      dispatch(
        updateTodo({
          mainTodoId: mainId!,
          updatedTodo: {
            ...(allTodos[mainId] ?? {}),
            ...updatedTodo,
          },
        }),
      );
    }
  };

  const getIsSelected = ({
    allTodos,
    mainId,
    subId,
    optionKey,
    checkingFor,
  }: TIsStatusSelectedArgs) => {
    if (mainId && subId) {
      if (checkingFor === "status")
        return allTodos[mainId].subtasks![subId].status?.key === optionKey;

      if (checkingFor === "priority")
        return allTodos[mainId].subtasks![subId].priority?.key === optionKey;
    } else if (mainId) {
      if (checkingFor === "status")
        return allTodos[mainId].status?.key === optionKey;
      if (checkingFor === "priority")
        return allTodos[mainId].priority?.key === optionKey;
    }
    return false;
  };

  return {
    updateTodoData,
    getIsSelected,
    dispatch,
    allTodos,
    mainTodoData: mainId ? allTodos?.[mainId!] : undefined,
    subTodoData:
      mainId && subId
        ? allTodos?.[mainId!]?.subtasks?.[subId!] ?? {}
        : undefined,
  };
};

export default useUpdateTodo;
