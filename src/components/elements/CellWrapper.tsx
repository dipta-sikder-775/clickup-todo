import React from "react";
import cn from "../../utils/cn";
interface ICellWrapperProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}
const CellWrapper = ({
  children,
  className,
  ...restProps
}: ICellWrapperProps) => {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-normal rounded border border-border-gray border-opacity-0 px-3 py-1 transition-all duration-75 ease-linear hover:border-opacity-100",
        className,
      )}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default CellWrapper;
