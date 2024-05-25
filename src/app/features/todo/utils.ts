import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { todoSlice } from "./slice";
import { ITableRows, TTableRows } from "./types";

export const {
  addTodo,
  removeTodo,
  toggleCollapseTodo,
  toggleSelectTodo,
  updateTodo,
  toggleSelectAllTodo,
} = todoSlice.actions;

export const selectTodo = (state: RootState) => state.todoSlice;
const selectTableRows = (state: RootState) => state.todoSlice.tableRows;

export const isSelected = (tableRowsObj: ITableRows | undefined | null) => {
  const mainRows = Object.values(tableRowsObj ?? {});
  let isEverythingSelected = true;
  let isSomeSelected = false;

  for (const row of mainRows) {
    if (row.isSelected) {
      isSomeSelected = true;
    } else {
      isEverythingSelected = false;
      if (isSomeSelected) break;
    }
  }
  const isPartiallySelected = isSomeSelected && !isEverythingSelected;

  return { isPartiallySelected, isSomeSelected, isEverythingSelected };
};

export const getTableRows = createSelector(selectTableRows, (tableRowsObj) => {
  const mainRows = Object.values(tableRowsObj);

  const tableRows: TTableRows = mainRows.map((mainRow) => {
    const subtasks = mainRow.subtasks
      ? Object.values(mainRow.subtasks)
      : undefined;

    return { ...mainRow, subtasks };
  });

  const isSelectedData = isSelected(tableRowsObj);

  return { tableRows, ...isSelectedData };
});
