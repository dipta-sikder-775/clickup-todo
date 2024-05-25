import { useMemo } from "react";
import { IAlignProps } from "./types";
import { getClassNameObj } from "./util";
import cn from "../../../utils/cn";

const Align = ({
  children,
  className,
  direction = "row",
  layoutMethod = "flex",
  justify = "center",
  align = "center",
  ...restProps
}: IAlignProps) => {
  const classNameObj = useMemo(
    () =>
      getClassNameObj({
        align,
        justify,
        direction,
        layoutMethod,
      }),
    [align, justify, direction, layoutMethod]
  );

  return (
    <div
      className={cn("items-center justify-center", classNameObj, className)}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default Align;
