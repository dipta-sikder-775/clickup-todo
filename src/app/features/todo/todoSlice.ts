import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { nanoid } from "nanoid";

// Define a type for the slice state
interface ITableRow {
  id?: string | number;
  isSelected?: boolean;
  isCollapsed?: boolean;
  tags?: string[];
  subtasks?: ITableRows;
  name?: string;
  assignee?: string[];
  dueDate?: string | Date;
  priority?: string;
  status?: "TODO" | "IN_PROGRESS" | "DONE";
  comments?: string;
}

interface ITableRows {
  [key: string]: ITableRow;
}

interface ITodoInitialState {
  tableRows: {
    [key: string]: ITableRow;
  };
}

type TSubTaskOmit = Omit<ITableRow, "subtasks" | "id">;

type TTableRows = (TSubTaskOmit & {
  id: string | number;
  subtasks?: TSubTaskOmit[];
})[];

// Define the initial state using that type
const initialState: ITodoInitialState = {
  tableRows: {
    "1": {
      id: "1",
      name: "Create a new feature",
      assignee: ["John Doe"],
      dueDate: "2021-12-31",
      priority: "High",
      status: "TODO",
      comments: "This is a comment",
      isSelected: false,
      isCollapsed: false,
      subtasks: {
        "1": {
          id: "1",
          name: "Subtask 1",
          assignee: ["John Doe"],
          dueDate: "2021-12-31",
          priority: "High",
          status: "TODO",
          comments: "This is a comment",
        },
        "2": {
          id: "2",
          name: "Subtask 2",
          assignee: ["John Doe"],
          dueDate: "2021-12-31",
          priority: "High",
          status: "TODO",
          comments: "This is a comment",
        },
      },
    },
  },
};

export const todoSlice = createSlice({
  name: "todo",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,

  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addTodo: (state, action: PayloadAction<ITableRow>) => {
      state.tableRows[nanoid()] = action.payload;
    },

    addSubTodo: (
      state,
      action: PayloadAction<{ mainTodoId: string; subtask: ITableRow }>
    ) => {
      state.tableRows[action.payload.mainTodoId].subtasks = {
        [nanoid()]: action.payload.subtask,
      };
    },

    removeMainTodo: (state, action: PayloadAction<string | number>) => {
      delete state.tableRows[action.payload];
    },

    removeSubTodo: (
      state,
      action: PayloadAction<{ mainTodoId: string; subTodoId: string }>
    ) => {
      delete state.tableRows[action.payload.mainTodoId].subtasks![
        action.payload.subTodoId
      ];
    },

    toggleCollapseTodo: (state, action: PayloadAction<string | number>) => {
      state.tableRows[action.payload].isCollapsed =
        !state.tableRows[action.payload].isCollapsed;
    },

    toggleSelectTodo: (state, action: PayloadAction<string | number>) => {
      state.tableRows[action.payload].isSelected = true;
    },

    updateMainTodo: (
      state,
      action: PayloadAction<{
        id: string | number;
        updatedTodo: Omit<ITableRow, "id">;
      }>
    ) => {
      state.tableRows[action.payload.id] = action.payload.updatedTodo;
    },

    updateSubTodo: (
      state,
      action: PayloadAction<{
        mainTodoId: string | number;
        subTodoId: string | number;
        updatedSubTodo: Omit<ITableRow, "id">;
      }>
    ) => {
      state.tableRows[action.payload.mainTodoId].subtasks![
        action.payload.subTodoId
      ] = action.payload.updatedSubTodo;
    },
  },
});

export const {
  addSubTodo,
  addTodo,
  removeMainTodo,
  removeSubTodo,
  toggleCollapseTodo,
  toggleSelectTodo,
  updateMainTodo,
  updateSubTodo,
} = todoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTodo = (state: RootState) => state.todoSlice;

export const getTableRows = (state: RootState): TTableRows => {
  const mainRows = Object.values(state.todoSlice.tableRows);
  return mainRows.map((mainRow) => {
    const subtasks = mainRow.subtasks
      ? Object.values(mainRow.subtasks)
      : undefined;
    return { ...mainRow, subtasks };
  });
};

const todoSliceReducer = todoSlice.reducer;

export default todoSliceReducer;
