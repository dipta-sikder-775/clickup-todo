import { UnstyledButton } from "@mantine/core";
import cn from "../../../utils/cn";

interface IOptionListButtonProps
  extends Omit<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "children"
  > {
  data: {
    leftSection?: {
      content?: React.ReactNode;
      className?: string;
    };
    rightSection?: {
      content?: React.ReactNode;
      className?: string;
    };
    isSelected?: boolean;
    children?: {
      content?: React.ReactNode;
      className?: string;
    };
  };
}

const OptionListButton = ({
  data: { children, isSelected, leftSection, rightSection },
  className,
  ...rest
}: IOptionListButtonProps) => {
  return (
    <button
      className={cn(
        "flex w-full items-center justify-between border-none !p-2 outline-none transition-all duration-100 ease-in-out hover:rounded-md hover:bg-bg-gray-priority-option-hover focus:outline-none",
        className,
      )}
      {...rest}
    >
      <span
        className={
          "flex items-center gap-3 transition-all duration-100 ease-in-out"
        }
      >
        <span className={cn(leftSection?.className)}>
          {leftSection?.content}
        </span>

        <span
          className={cn(
            "text-sm font-normal text-text-black-1 transition-all duration-100 ease-in-out",
            {
              "font-medium": isSelected,
            },
            children?.className,
          )}
        >
          {children?.content}
        </span>
      </span>

      <span
        className={cn(
          "min-w-5 transition-all duration-100 ease-in-out",
          rightSection?.className,
        )}
      >
        {isSelected && rightSection?.content}
      </span>
    </button>
  );
};

export default OptionListButton;
