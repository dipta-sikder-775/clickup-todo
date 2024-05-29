import { IconType } from "react-icons";
import { FaCheck } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoRadioButtonOn } from "react-icons/io5";
import { TStatusKey } from "../app/features/todo/types";

export const statusIconOptions: Record<TStatusKey | "CHECK_MARK", IconType> = {
  TODO: IoRadioButtonOn,
  IN_PROGRESS: IoRadioButtonOn,
  DONE: IoMdCheckmarkCircle,
  CHECK_MARK: FaCheck,
};
