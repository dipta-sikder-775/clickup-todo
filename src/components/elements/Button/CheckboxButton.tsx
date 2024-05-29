import React from "react";
import {
  BiCheckbox,
  BiCheckboxMinus,
  BiSolidCheckboxChecked,
} from "react-icons/bi";
import cn from "../../../utils/cn";

type TEvents =
  | React.MouseEvent<SVGElement, MouseEvent>
  | React.FormEvent<SVGElement>
  | React.PointerEvent<SVGElement>;

type TFunc = ((event: TEvents) => void) | undefined;

interface ICheckboxButtonProps {
  checked?: boolean;
  onClick?: TFunc;
  onPointerDown?: TFunc;
  onChange?: TFunc;
  disabled?: boolean;
  className?: string;
  indeterminate?: boolean;
  stopPropagation?: boolean;
}

const manageStopPropagation =
  (props: {
    func?: TFunc;
    isDisabled?: boolean;
    enableStopPropagation?: boolean;
  }) =>
  (e: TEvents) => {
    e.stopPropagation();
    e.preventDefault();
    // if (props?.enableStopPropagation) {
    // }
    if (!props.isDisabled) {
      props?.func?.(e);
    }
  };

const CheckboxButton = ({
  checked,
  onChange,
  onPointerDown,
  onClick,
  disabled,
  className,
  indeterminate,
  stopPropagation,
}: ICheckboxButtonProps) => {
  if (indeterminate) {
    return (
      <BiCheckboxMinus
        onClick={manageStopPropagation({
          func: onClick,
          isDisabled: disabled,
          enableStopPropagation: stopPropagation,
        })}
        onPointerDown={manageStopPropagation({
          func: onPointerDown,
          isDisabled: disabled,
          enableStopPropagation: stopPropagation,
        })}
        onChange={manageStopPropagation({
          func: onChange,
          isDisabled: disabled,
          enableStopPropagation: stopPropagation,
        })}
        className={cn("h-6 w-6 cursor-pointer text-text-gray-1", className)}
      />
    );
  } else if (checked) {
    return (
      <BiSolidCheckboxChecked
        onClick={manageStopPropagation({
          func: onClick,
          isDisabled: disabled,
          enableStopPropagation: stopPropagation,
        })}
        onPointerDown={manageStopPropagation({
          func: onPointerDown,
          isDisabled: disabled,
          enableStopPropagation: stopPropagation,
        })}
        onChange={manageStopPropagation({
          func: onChange,
          isDisabled: disabled,
          enableStopPropagation: stopPropagation,
        })}
        className={cn("h-6 w-6 cursor-pointer text-icon-violet", className)}
      />
    );
  }
  return (
    <BiCheckbox
      onClick={manageStopPropagation({
        func: onClick,
        isDisabled: disabled,
        enableStopPropagation: stopPropagation,
      })}
      onPointerDown={manageStopPropagation({
        func: onPointerDown,
        isDisabled: disabled,
        enableStopPropagation: stopPropagation,
      })}
      onChange={manageStopPropagation({
        func: onChange,
        isDisabled: disabled,
        enableStopPropagation: stopPropagation,
      })}
      className={cn("h-6 w-6 cursor-pointer text-text-gray-1", className)}
    />
  );
};

export default CheckboxButton;
