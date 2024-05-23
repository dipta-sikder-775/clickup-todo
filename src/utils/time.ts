import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export const humanizeDate = (
  date?: string | number | dayjs.Dayjs | Date | null
) => {
  if (!date) return "";
  const days = dayjs(date).diff(dayjs(), "days");
  return dayjs.duration(days, "days").humanize(true);
};
