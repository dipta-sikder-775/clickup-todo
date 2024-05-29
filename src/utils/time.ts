import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

type TStatus = "DUE_TODAY_TASK" | "OVER_DUE_TASK" | "FUTURE_TASK" | null;

dayjs.extend(duration);
dayjs.extend(relativeTime);

export const humanizeDate = (
  date?: string | number | dayjs.Dayjs | Date | null,
) => {
  if (!date)
    return {
      content: "",
      status: null,
    };

  const hours = dayjs(date).diff(dayjs(), "hours");
  const days = dayjs(date).diff(dayjs(), "days");
  let humanizeDateText = dayjs.duration(days, "days").humanize(true);
  humanizeDateText = hours >= 0 && hours <= 24 ? "Due Today" : humanizeDateText;
  const status: TStatus =
    hours >= 0 && hours <= 24
      ? "DUE_TODAY_TASK"
      : days < 0
        ? "OVER_DUE_TASK"
        : "FUTURE_TASK";

  return {
    content: humanizeDateText,
    status,
  };
};
