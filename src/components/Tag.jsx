import { memo } from "react";
import { TOKENS } from "../constants/tokens";

const Tag = memo(function Tag({ children }) {
  return (
    <span
      className="text-xs px-2.5 py-1 rounded-md border font-medium tracking-tight whitespace-nowrap transition-all duration-200 hover:scale-105"
      style={{ borderColor: TOKENS.border, color: TOKENS.inkMute }}
    >
      {children}
    </span>
  );
});

export default Tag;
