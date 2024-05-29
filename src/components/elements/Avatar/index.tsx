import { RxCrossCircled } from "react-icons/rx";
import cn from "../../../utils/cn";

interface IAvatarProps {
  avatar?: string | null;
  name?: string | null;
  id?: string | number | null;
  crossButton?: {
    onClick?: (props: {
      clickEvent: React.MouseEvent<HTMLSpanElement, MouseEvent>;
      id: IAvatarProps["id"];
    }) => void;
    isButtonNecessary?: boolean;
  };
  isInactive?: boolean;
}

const Avatar = ({
  avatar,
  name,
  id,
  crossButton,
  isInactive,
}: IAvatarProps) => {
  return (
    <span className="group relative cursor-context-menu">
      <span
        className={cn(
          "absolute right-[1px] top-[1px] h-2 w-2 rounded-full border-[0.5px] border-solid border-white  ",
          {
            "group-hover:hidden": crossButton?.isButtonNecessary,
            "bg-bg-green-active": !isInactive,
          },
        )}
      />

      {crossButton?.isButtonNecessary && (
        <span
          className="absolute right-[-6px] top-[-6px] hidden cursor-pointer rounded-full border-[0.5px] border-solid border-white bg-bg-gray-avatar-cross hover:bg-bg-violet-avatar group-hover:block"
          onClick={(e) => {
            e.stopPropagation();
            crossButton?.onClick?.({ id, clickEvent: e });
          }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <RxCrossCircled className="h-4 w-4 text-white" />
        </span>
      )}

      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bg-violet-avatar text-[10px] font-normal text-white/90">
        {!avatar ? (
          name
            ?.split(" ")
            ?.map((word) => word?.[0]?.toUpperCase())
            ?.join("")
        ) : (
          <img className="h-full w-full object-cover" src={avatar} />
        )}
      </span>
    </span>
  );
};

export default Avatar;
