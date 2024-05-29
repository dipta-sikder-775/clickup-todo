// import { HeaderContext } from "@tanstack/react-table";
// import { useAppDispatch, useAppSelector } from "../../../app/hooks";
// import { TTableRow } from "../../../app/features/todo/types";
// import { getTableRows, toggleSelectAllTodo } from "../../../app/features/todo/utils";
// import { Checkbox } from "@mantine/core";

// const SelectAllRow = ({ table }: HeaderContext<TTableRow, unknown>) => {
//   const dispatch = useAppDispatch();
//   const { isEverythingSelected, isPartiallySelected } =
//     useAppSelector(getTableRows);

//   return (
//     <div className="ml-[20px] flex items-center gap-2">
//       <Checkbox
//         color="#544dc9"
//         size="xs"
//         aria-label="Select row"
//         checked={isEverythingSelected}
//         indeterminate={isPartiallySelected}
//         onChange={(e) => {
//           e.preventDefault();
//           e.stopPropagation();
//           dispatch(toggleSelectAllTodo());
//         }}
//         onClick={(e) => {
//           e.preventDefault();
//           e.stopPropagation();
//         }}
//         onPointerDown={(e) => {
//           e.preventDefault();
//           e.stopPropagation();
//         }}
//       />

//       <span>Name</span>
//     </div>
//   );
// };

// export default SelectAllRow
