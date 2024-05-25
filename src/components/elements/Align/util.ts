import { TAlign, TJustify, TJustifyAlignConfig, TResponsive } from "./types";

export const getClassNameObj = ({
  align,
  justify,
  direction,
  layoutMethod,
}: TJustifyAlignConfig) => {
  const justifyResponsive: Required<TResponsive<TJustify>> =
    typeof justify === "object"
      ? (justify as Required<TResponsive<TJustify>>)
      : ({} as Required<TResponsive<TJustify>>);
  const alignResponsive: Required<TResponsive<TAlign>> =
    typeof align === "object"
      ? (align as Required<TResponsive<TAlign>>)
      : ({} as Required<TResponsive<TAlign>>);

  return {
    "": direction === "row",
    "flex-col": direction === "column",
    flex: layoutMethod === "flex",
    grid: layoutMethod === "grid",
    "justify-center": justify === "center",
    "justify-start": justify === "start",
    "justify-end": justify === "end",
    "justify-between": justify === "between",
    "justify-around": justify === "around",
    "items-center": align === "center",
    "items-start": align === "start",
    "items-end": align === "end",
    "items-between": align === "between",
    "items-around": align === "around",

    // justify responsive
    // sm
    "sm:justify-center": justifyResponsive.sm === "center",
    "sm:justify-start": justifyResponsive.sm === "start",
    "sm:justify-end": justifyResponsive.sm === "end",
    "sm:justify-between": justifyResponsive.sm === "between",
    "sm:justify-around": justifyResponsive.sm === "around",
    // md
    "md:justify-center": justifyResponsive.md === "center",
    "md:justify-start": justifyResponsive.md === "start",
    "md:justify-end": justifyResponsive.md === "end",
    "md:justify-between": justifyResponsive.md === "between",
    "md:justify-around": justifyResponsive.md === "around",
    // lg
    "lg:justify-center": justifyResponsive.lg === "center",
    "lg:justify-start": justifyResponsive.lg === "start",
    "lg:justify-end": justifyResponsive.lg === "end",
    "lg:justify-between": justifyResponsive.lg === "between",
    "lg:justify-around": justifyResponsive.lg === "around",
    // xl
    "xl:justify-center": justifyResponsive.xl === "center",
    "xl:justify-start": justifyResponsive.xl === "start",
    "xl:justify-end": justifyResponsive.xl === "end",
    "xl:justify-between": justifyResponsive.xl === "between",
    "xl:justify-around": justifyResponsive.xl === "around",
    // xxl
    "xxl:justify-center": justifyResponsive.xxl === "center",
    "xxl:justify-start": justifyResponsive.xxl === "start",
    "xxl:justify-end": justifyResponsive.xxl === "end",
    "xxl:justify-between": justifyResponsive.xxl === "between",
    "xxl:justify-around": justifyResponsive.xxl === "around",

    // align responsive
    // sm
    "sm:items-center": alignResponsive.sm === "center",
    "sm:items-start": alignResponsive.sm === "start",
    "sm:items-end": alignResponsive.sm === "end",
    "sm:items-between": alignResponsive.sm === "between",
    "sm:items-around": alignResponsive.sm === "around",
    // md
    "md:items-center": alignResponsive.md === "center",
    "md:items-start": alignResponsive.md === "start",
    "md:items-end": alignResponsive.md === "end",
    "md:items-between": alignResponsive.md === "between",
    "md:items-around": alignResponsive.md === "around",
    // lg
    "lg:items-center": alignResponsive.lg === "center",
    "lg:items-start": alignResponsive.lg === "start",
    "lg:items-end": alignResponsive.lg === "end",
    "lg:items-between": alignResponsive.lg === "between",
    "lg:items-around": alignResponsive.lg === "around",
    // xl
    "xl:items-center": alignResponsive.xl === "center",
    "xl:items-start": alignResponsive.xl === "start",
    "xl:items-end": alignResponsive.xl === "end",
    "xl:items-between": alignResponsive.xl === "between",
    "xl:items-around": alignResponsive.xl === "around",
    // xxl
    "xxl:items-center": alignResponsive.xxl === "center",
    "xxl:items-start": alignResponsive.xxl === "start",
    "xxl:items-end": alignResponsive.xxl === "end",
    "xxl:items-between": alignResponsive.xxl === "between",
    "xxl:items-around": alignResponsive.xxl === "around",
  };
};
