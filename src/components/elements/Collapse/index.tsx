// import {
//   AnimationControls,
//   LazyMotion,
//   TargetAndTransition,
//   VariantLabels,
//   domAnimation,
//   m,
// } from "framer-motion";

// interface ICollapseProps
//   extends React.DetailedHTMLProps<
//     React.HTMLAttributes<HTMLTableRowElement>,
//     HTMLTableRowElement
//   > {
//   isOpen: boolean;
// }

// const Collapse = ({ children, isOpen, ...rest }: ICollapseProps) => {
//   const animate:
//     | boolean
//     | VariantLabels
//     | AnimationControls
//     | TargetAndTransition = {
//     transition: { type: "tween" },
//     height: isOpen ? "auto" : 0,
//   };

//   return (
//     <LazyMotion features={domAnimation} strict>
//       <div aria-expanded={isOpen} {...rest}>
//         <m.div
//           style={{ overflow: "hidden" }}
//           initial={{ height: 0, opacity: 1 }}
//           animate={animate}
//           exit={{ height: 0, opacity: 1 }}
//         >
//           {children}
//         </m.div>
//       </div>
//     </LazyMotion>
//   );
// };

// export default Collapse;
