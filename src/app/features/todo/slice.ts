import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { assigneeOptions } from "../../../assets/assignee";
import { ITableRow, ITodoInitialState, TAssign, TComment } from "./types";
import { isSelected } from "./utils";

export const initialState: ITodoInitialState = {
  tableRows: {
    "1": {
      id: "1",
      index: 0,
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
      comments: [
        {
          id: "1nknsdkonconf",
          author: assigneeOptions[0],
          date: new Date().toISOString(),
          text: "This is a comment",
        },
      ],
      isSelected: false,
      isCollapsed: false,
      subtasks: {
        "n1-1": {
          id: "n1-1",
          index: 0,
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
          comments: [
            {
              id: "1omibcvyvfs",
              author: assigneeOptions[0],
              date: new Date().toISOString(),
              text: "This is a comment",
            },
          ],
        },
        "n1-2": {
          id: "n1-2",
          index: 1,
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
      index: 1,
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
      comments: [
        {
          id: "1ronmjinijas",
          author: assigneeOptions[0],
          date: new Date().toISOString(),
          text: "This is a comment",
        },
      ],
      isSelected: false,
      isCollapsed: false,
      subtasks: {
        "n2-1": {
          id: "n2-1",
          index: 0,
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
          comments: [
            {
              id: "1zjnnfsjbuhbauh",
              author: assigneeOptions[0],
              date: new Date().toISOString(),
              text: "This is a comment",
            },
          ],
        },
        "n2-2": {
          id: "n2-2",
          index: 1,
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
          comments: [
            {
              id: "1yubgubcyub",
              author: assigneeOptions[0],
              date: new Date().toISOString(),
              text: "This is a comment",
            },
          ],
        },
      },
    },
    "3": {
      id: "3",
      index: 2,
      name: "New feature 3",
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
      comments: [
        {
          id: "1ronmjinijas",
          author: assigneeOptions[0],
          date: new Date().toISOString(),
          text: "This is a comment",
        },
      ],
      isSelected: false,
      isCollapsed: false,
      subtasks: {
        "n3-2": {
          id: "n3-2",
          index: 1,
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
          comments: [
            {
              id: "1yubgubcyub",
              author: assigneeOptions[0],
              date: new Date().toISOString(),
              text: "This is a comment",
            },
          ],
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
      action: PayloadAction<{
        mainTodoId?: string | number;
        todo: Omit<ITableRow, "id" | "index">;
      }>,
    ) => {
      const newId = nanoid();
      if (action.payload.mainTodoId) {
        const subRows = Object.values(
          state.tableRows[action.payload.mainTodoId].subtasks! ?? {},
        );
        const sortedSubRows = subRows.sort((a, b) => a.index - b.index);
        const lastIndex =
          sortedSubRows?.[sortedSubRows.length - 1]?.index ?? -1;
        state.tableRows[action.payload.mainTodoId].subtasks = {
          ...(state.tableRows[action.payload.mainTodoId].subtasks ?? {}),
          [newId]: {
            ...action.payload.todo,
            index: lastIndex + 1,
            id: newId,
            status: {
              key: "TODO",
              color: "#FF0000",
              customName: "To Do",
            },
            priority: {
              key: null,
              color: "",
            },
            assignee: [],
            comments: [],
            tags: [],
            isCollapsed: false,
            isSelected: false,
            dueDate: new Date().toISOString(),
          },
        };
        return;
      }

      const rows = Object.values(state.tableRows);
      const sortedRows = rows.sort((a, b) => a.index - b.index);
      const lastIndex = sortedRows?.[sortedRows.length - 1].index;
      state.tableRows[newId] = {
        ...action.payload.todo,
        index: lastIndex + 1,
        id: newId,
        status: {
          key: "TODO",
          color: "#FF0000",
          customName: "To Do",
        },
        priority: {
          key: null,
          color: "",
        },
        assignee: [],
        comments: [],
        tags: [],
        isCollapsed: false,
        isSelected: false,
        dueDate: new Date().toISOString(),
      };
    },

    removeTodo: (
      state,
      action: PayloadAction<{
        mainTodoId: string | number;
        subTodoId?: string | number;
      }>,
    ) => {
      if (action.payload.mainTodoId && action.payload.subTodoId) {
        const subRows = Object.values(
          state.tableRows[action.payload.mainTodoId].subtasks! ?? {},
        );
        const sortedSubRows = subRows.sort((a, b) => a.index - b.index);
        const targetSubTodoIndex =
          state.tableRows[action.payload.mainTodoId].index;

        for (
          let index = targetSubTodoIndex + 1;
          index < sortedSubRows?.length;
          index++
        ) {
          const element = sortedSubRows?.[index];
          element.index--;
        }

        delete state.tableRows[action.payload.mainTodoId].subtasks![
          action.payload.subTodoId
        ];
        return;
      }

      const rows = Object.values(state.tableRows);
      const sortedRows = rows.sort((a, b) => a.index - b.index);
      const targetTodoIndex = state.tableRows[action.payload.mainTodoId].index;

      for (
        let index = targetTodoIndex + 1;
        index < sortedRows?.length;
        index++
      ) {
        const element = sortedRows?.[index];
        element.index--;
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

    changeMainTodoIndex: (
      state,
      action: PayloadAction<{
        oldIndex: number;
        newIndex: number;
        oldId?: string | number;
        newId?: string | number;
      }>,
    ) => {
      const todosArr = Object.values(state.tableRows);
      const sortedTodos = todosArr?.concat()?.sort((a, b) => a.index - b.index);
      if (
        action.payload.newIndex - action.payload.oldIndex === 1 ||
        action.payload.oldIndex - action.payload.newIndex === 1
      ) {
        sortedTodos[action.payload.oldIndex].index = action.payload.newIndex;
        sortedTodos[action.payload.newIndex].index = action.payload.oldIndex;
      } else if (action.payload.oldIndex < action.payload.newIndex) {
        // top to bottom
        for (
          let index = action.payload.newIndex;
          index > action.payload.oldIndex;
          index--
        ) {
          const element = sortedTodos?.[index];
          element.index--;
        }
        sortedTodos[action.payload.oldIndex].index = action.payload.newIndex;
      } else if (action.payload.oldIndex > action.payload.newIndex) {
        // bottom to top
        for (
          let index = action.payload.newIndex;
          index < action.payload.oldIndex;
          index++
        ) {
          const element = sortedTodos?.[index];
          element.index++;
        }
        sortedTodos[action.payload.oldIndex].index = action.payload.newIndex;
      }
    },

    toggleSelectedUser: (
      state,
      action: PayloadAction<{
        mainId?: string | number;
        subId?: string | number;
        assignee: TAssign;
      }>,
    ) => {
      if (action.payload.mainId && action.payload.subId) {
        const assigneeState =
          state.tableRows[action.payload.mainId].subtasks![action.payload.subId]
            .assignee;
        const assigneeIndex = assigneeState?.findIndex(
          (assign) => assign.id === action.payload.assignee.id,
        );

        if (assigneeIndex !== undefined && assigneeIndex !== -1) {
          assigneeState?.splice(assigneeIndex, 1);
          return;
        }

        state.tableRows[action.payload.mainId].subtasks![
          action.payload.subId
        ].assignee?.push(action.payload.assignee);
      } else if (action.payload.mainId) {
        const assigneeState = state.tableRows[action.payload.mainId].assignee;
        const assigneeIndex = assigneeState?.findIndex(
          (assign) => assign.id === action.payload.assignee.id,
        );
        if (assigneeIndex !== undefined && assigneeIndex !== -1) {
          assigneeState?.splice(assigneeIndex, 1);
          return;
        }

        state.tableRows[action.payload.mainId].assignee?.push(
          action.payload.assignee,
        );
      }
    },

    // comments
    addComment: (
      state,
      action: PayloadAction<{
        mainId?: string | number;
        subId?: string | number;
        comment: { text: string };
      }>,
    ) => {
      if (action.payload.mainId && action.payload.subId) {
        state.tableRows[action.payload.mainId].subtasks![
          action.payload.subId
        ].comments = [
          ...(state.tableRows[action.payload.mainId].subtasks![
            action.payload.subId
          ].comments ?? []),
          {
            ...action.payload.comment,
            id: nanoid(),
            author: assigneeOptions[0],
            likes: 0,
            date: new Date().toISOString(),
          },
        ];

        return;
      }

      if (action.payload.mainId) {
        state.tableRows[action.payload.mainId].comments = [
          ...(state.tableRows[action.payload.mainId].comments ?? []),
          {
            ...action.payload.comment,
            id: nanoid(),
            author: assigneeOptions[0],
            likes: 0,
            date: new Date().toISOString(),
          },
        ];
      }
    },

    removeComment: (
      state,
      action: PayloadAction<{
        mainId?: string | number;
        subId?: string | number;
        commentId?: string | number;
      }>,
    ) => {
      if (action.payload.mainId && action.payload.subId) {
        const comments =
          state.tableRows[action.payload.mainId].subtasks![action.payload.subId]
            .comments;
        const commentIndex = comments?.findIndex(
          (comment) => comment.id === action.payload.commentId,
        );
        if (commentIndex !== undefined && commentIndex !== -1) {
          comments?.splice(commentIndex, 1);
          return;
        }
      } else if (action.payload.mainId) {
        const comments = state.tableRows[action.payload.mainId].comments;
        const commentIndex = comments?.findIndex(
          (comment) => comment.id === action.payload.commentId,
        );
        if (commentIndex !== undefined && commentIndex !== -1) {
          comments?.splice(commentIndex, 1);
        }
      }
    },

    updateComment: (
      state,
      action: PayloadAction<{
        mainId?: string | number;
        subId?: string | number;
        updatedComment?: TComment;
      }>,
    ) => {
      if (action.payload.mainId && action.payload.subId) {
        const comments =
          state.tableRows[action.payload.mainId].subtasks![action.payload.subId]
            .comments;
        const commentIndex = comments?.findIndex(
          (comment) => comment.id === action.payload.updatedComment?.id,
        );
        if (commentIndex !== undefined && commentIndex !== -1) {
          comments![commentIndex] = {
            ...(action.payload.updatedComment ?? {}),
          };
          return;
        }
      } else if (action.payload.mainId) {
        const comments = state.tableRows[action.payload.mainId].comments;
        const commentIndex = comments?.findIndex(
          (comment) => comment.id === action.payload.updatedComment?.id,
        );
        if (commentIndex !== undefined && commentIndex !== -1) {
          comments![commentIndex] = {
            ...(action.payload.updatedComment ?? {}),
          };
        }
      }
    },

    incrementLikeOfComment: (
      state,
      action: PayloadAction<{
        mainId?: string | number;
        subId?: string | number;
        commentId?: string | number;
      }>,
    ) => {
      if (action.payload.mainId && action.payload.subId) {
        const comments =
          state.tableRows[action.payload.mainId].subtasks![action.payload.subId]
            .comments;
        const commentIndex = comments?.findIndex(
          (comment) => comment.id === action.payload.commentId,
        );
        if (commentIndex !== undefined && commentIndex !== -1) {
          comments![commentIndex].likes =
            (comments![commentIndex].likes ?? 0) + 1;
          return;
        }
      } else if (action.payload.mainId) {
        const comments = state.tableRows[action.payload.mainId].comments;
        const commentIndex = comments?.findIndex(
          (comment) => comment.id === action.payload.commentId,
        );
        if (commentIndex !== undefined && commentIndex !== -1) {
          comments![commentIndex].likes =
            (comments![commentIndex].likes ?? 0) + 1;
        }
      }
    },
  },
});

const todoSliceReducer = todoSlice.reducer;

export const {
  addTodo,
  removeTodo,
  toggleCollapseTodo,
  toggleSelectTodo,
  updateTodo,
  toggleSelectAllTodo,
  changeMainTodoIndex,
  toggleSelectedUser,
  addComment,
  removeComment,
  updateComment,
  incrementLikeOfComment,
} = todoSlice.actions;

export default todoSliceReducer;
