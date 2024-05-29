import { Dayjs } from "dayjs";

export type TPriorityKey =
  | "LOW"
  | "NORMAL"
  | "HIGH"
  | "URGENT"
  | null
  | undefined;
export type TPriority = {
  key: TPriorityKey;
  color?: string;
  customName?: string;
};
export type TStatusKey = "TODO" | "IN_PROGRESS" | "DONE";
export type TStatus = {
  key: TStatusKey;
  color?: string;
  customName?: string;
};
export type TAssign = {
  id?: string | number;
  name?: string;
  avatar?: string;
  email?: string;
};
export type TComment = {
  id?: string | number;
  text?: string;
  author?: TAssign;
  likes?: number;
  date?: string | number | Dayjs | Date | null | undefined;
};

export type TTag = {
  id?: string | number;
  name?: string;
  color?: string;
};

export interface ITableRow {
  id?: string | number;
  index: number;
  isSelected?: boolean;
  isCollapsed?: boolean;
  tags?: TTag[];
  subtasks?: ITableRows;
  name?: string;
  assignee?: TAssign[];
  dueDate?: string | number | Dayjs | Date | null | undefined;
  priority?: TPriority;
  status?: TStatus;
  comments?: TComment[];
}

export interface ITableRows {
  [key: string]: ITableRow;
}

export interface ITodoInitialState {
  tableRows: ITableRows;
}

export type TSubTaskOmit = Omit<ITableRow, "subtasks">;

export type TTableRow = TSubTaskOmit & {
  subtasks?: TSubTaskOmit[];
};

export type TTableRows = TTableRow[];
