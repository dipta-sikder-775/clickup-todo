import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { ITableRow, ITodoInitialState } from "./types";
import { isSelected } from "./utils";

export const initialState: ITodoInitialState = {
  tableRows: {
    "1": {
      id: "1",
      name: "New feature 1",
      assignee: [
        {
          id: "1",
          name: "John Doe",
          email: "johndoi@gmail.com",
        },
      ],
      dueDate: "2021-12-31",
      priority: {
        key: "HIGH",
        color: "#FF0000",
        customName: "High",
      },
      status: {
        key: "TODO",
        color: "#FF0000",
        customName: "To Do",
      },
      comments: [{ id: "1nknsdkonconf", text: "This is a comment" }],
      isSelected: false,
      isCollapsed: false,
      subtasks: {
        "n1-1": {
          id: "n1-1",
          name: "N1 Subtask 1",
          assignee: [
            {
              id: "1",
              name: "John Doe",
              email: "",
            },
          ],
          dueDate: "2021-12-31",
          priority: {
            key: "HIGH",
            color: "#FF0000",
            customName: "High",
          },
          status: {
            key: "TODO",
            color: "#FF0000",
            customName: "To Do",
          },
          comments: [{ id: "1omibcvyvfs", text: "This is a comment" }],
        },
        "n1-2": {
          id: "n1-2",
          name: "N1 Subtask 2",
          assignee: [
            {
              id: "1",
              name: "John Doe",
              email: "",
            },
          ],
          dueDate: "2021-12-31",
          priority: {
            key: "HIGH",
            color: "#FF0000",
            customName: "High",
          },
          status: {
            key: "TODO",
            color: "#FF0000",
            customName: "To Do",
          },
          comments: [{ id: "1ihbhibvuvs", text: "This is a comment" }],
        },
      },
    },
    "2": {
      id: "2",
      name: "New feature 2",
      assignee: [
        {
          id: "1",
          name: "John Doe",
          email: "",
        },
      ],
      dueDate: "2021-12-31",
      priority: {
        key: "HIGH",
        color: "#FF0000",
        customName: "High",
      },
      status: {
        key: "TODO",
        color: "#FF0000",
        customName: "To Do",
      },
      comments: [{ id: "1ronmjinijas", text: "This is a comment" }],
      isSelected: false,
      isCollapsed: false,
      subtasks: {
        "n2-1": {
          id: "n2-1",
          name: "N2 Subtask 1",
          assignee: [
            {
              id: "1",
              name: "John Doe",
              email: "",
            },
          ],
          dueDate: "2021-12-31",
          priority: {
            key: "HIGH",
            color: "#FF0000",
            customName: "High",
          },
          status: {
            key: "TODO",
            color: "#FF0000",
            customName: "To Do",
          },
          comments: [{ id: "1zjnnfsjbuhbauh", text: "This is a comment" }],
        },
        "n2-2": {
          id: "n2-2",
          name: "N2 Subtask 2",
          assignee: [
            {
              id: "1",
              name: "John Doe",
              email: "",
            },
          ],
          dueDate: "2021-12-31",
          priority: {
            key: "HIGH",
            color: "#FF0000",
            customName: "High",
          },
          status: {
            key: "TODO",
            color: "#FF0000",
            customName: "To Do",
          },
          comments: [{ id: "1yubgubcyub", text: "This is a comment" }],
        },
      },
    },
  },
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,

  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{ mainTodoId?: string | number; todo: ITableRow }>,
    ) => {
      const newId = nanoid();
      if (action.payload.mainTodoId) {
        state.tableRows[action.payload.mainTodoId].subtasks = {
          ...(state.tableRows[action.payload.mainTodoId].subtasks ?? {}),
          [newId]: action.payload.todo,
        };
        return;
      }

      state.tableRows[newId] = action.payload.todo;
    },

    removeTodo: (
      state,
      action: PayloadAction<{
        mainTodoId: string | number;
        subTodoId?: string | number;
      }>,
    ) => {
      if (action.payload.mainTodoId && action.payload.subTodoId) {
        delete state.tableRows[action.payload.mainTodoId].subtasks![
          action.payload.subTodoId
        ];
        return;
      }
      delete state.tableRows[action.payload?.mainTodoId];
    },

    toggleCollapseTodo: (state, action: PayloadAction<string | number>) => {
      state.tableRows[action.payload].isCollapsed =
        !state.tableRows[action.payload].isCollapsed;
    },

    toggleSelectTodo: (
      state,
      action: PayloadAction<{
        mainTodoId: string | number;
        subTodoId?: string | number;
      }>,
    ) => {
      if (action.payload.mainTodoId && action.payload.subTodoId) {
        state.tableRows[action.payload.mainTodoId].subtasks![
          action.payload.subTodoId
        ].isSelected =
          !state.tableRows[action.payload.mainTodoId].subtasks![
            action.payload.subTodoId
          ].isSelected;
        return;
      }
      state.tableRows[action.payload.mainTodoId].isSelected =
        !state.tableRows[action.payload.mainTodoId].isSelected;
    },

    toggleSelectAllTodo: (state) => {
      const mainRowsKey = Object.keys(state.tableRows);
      const { isPartiallySelected } = isSelected(state.tableRows);

      for (const row of mainRowsKey) {
        if (isPartiallySelected) {
          state.tableRows[row].isSelected = false;
          continue;
        }
        state.tableRows[row].isSelected = !state.tableRows[row].isSelected;
      }
    },

    updateTodo: (
      state,
      action: PayloadAction<{
        mainTodoId: string | number;
        subTodoId?: string | number;
        updatedTodo: ITableRow;
      }>,
    ) => {
      if (action.payload.mainTodoId && action.payload.subTodoId) {
        state.tableRows[action.payload.mainTodoId].subtasks![
          action.payload.subTodoId
        ] = action.payload.updatedTodo;
        return;
      }

      state.tableRows[action.payload.mainTodoId] = action.payload.updatedTodo;
    },
  },
});

const todoSliceReducer = todoSlice.reducer;

export default todoSliceReducer;
