import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ITableRows, TTableRows } from "./types";

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

export const getTableRows = () =>
  createSelector(selectTableRows, (tableRowsObj) => {
    const mainRows = Object.values(tableRowsObj);

    const tableRows: TTableRows = mainRows
      .map((mainRow) => {
        const subtasks = mainRow.subtasks
          ? Object.values(mainRow.subtasks)
          : undefined;

        return { ...mainRow, subtasks };
      })
      .sort((a, b) => a.index - b.index);

    const isSelectedData = isSelected(tableRowsObj);

    return { tableRows, ...isSelectedData };
  });

// const arr = [
//   {
//     id: "1",
//     parentId: null,
//     isSelected: false,
//     isCollapsed: false,
//     prev: null,
//     next: null,
//   },
//   {
//     id: "parent1",
//     parentId: null,
//     isSelected: false,
//     isCollapsed: false,
//     prev: null,
//     next: "1",
//     children: [
//       {
//         id: "1",
//         parentId: "parent1",
//         isSelected: false,
//         isCollapsed: false,
//         prev: null,
//         next: null,
//       },
//     ],
//   },

//   {
//     id: "parent2",
//     parentId: null,
//     isSelected: false,
//     isCollapsed: false,
//     prev: "parent1",
//     next: null,
//     children: [],
//   },
// ];

// const first = ({ currentIndex: number, operationObj, mainArr }) => {
//   return {
//     ...operationObj,
//     parent: parrentObj[prev.parentId]||parrentObj[next.parentId],
//     prev: mainArr[currentIndex - 1].id,
//     next: mainArr[currentIndex - 1].id,
//     children: [
// first()
//     ]
//   };
// };
