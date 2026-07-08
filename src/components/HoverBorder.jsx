import { memo } from "react";
import { TOKENS } from "../constants/tokens";

const HoverBorder = memo(function HoverBorder({
  children,
  className = "",
  style = {},
  as: Comp = "div",
  ...rest
}) {
  return (
    <Comp
      className={"transition-all duration-200 " + className}
      style={{ borderColor: TOKENS.border, ...style }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = TOKENS.borderStrong;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = TOKENS.border;
      }}
      {...rest}
    >
      {children}
    </Comp>
  );
});

export default HoverBorder;
