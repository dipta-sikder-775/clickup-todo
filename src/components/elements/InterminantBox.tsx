import { useEffect, useRef } from "react";
import cn from "../../utils/cn";

interface IndeterminateCheckboxProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  indeterminate?: boolean;
}

export default function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: IndeterminateCheckboxProps) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={cn("cursor-pointer", className)}
      {...rest}
    />
  );
}
