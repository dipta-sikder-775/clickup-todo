export type TJustify = "center" | "start" | "end" | "between" | "around";
export type TAlign = "center" | "start" | "end" | "between" | "around";
export type TResponsive<T> = {
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  xxl?: T;
};

export type TJustifyAlignConfig = {
  justify?: TJustify | TResponsive<TJustify>;
  align?: TAlign | TResponsive<TAlign>;
  direction?: "row" | "column";
  layoutMethod?: "flex" | "grid";
};

export interface IAlignProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    TJustifyAlignConfig {
  children?: React.ReactNode;
}
