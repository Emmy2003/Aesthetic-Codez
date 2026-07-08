import { memo } from "react";
import { TOKENS } from "../constants/tokens";
import { isSafeUrl, getLinkProps } from "../utils/security";
import Reveal from "./Reveal";

// Icon mapping handled by parent via `social.Icon`

const SocialCard = memo(function SocialCard({ social, index }) {
  const safeHref = isSafeUrl(social.href) ? social.href : "#";
  const linkProps = getLinkProps(safeHref);

  // Dynamic icon import pattern for lucide-react
  // In practice, you'd import all icons at top level or use a registry
  // For this build, we pass the icon component from parent

  return (
    <Reveal delay={index * 60}>
      <a
        href={safeHref}
        {...linkProps}
        className="group flex items-center gap-3 rounded-xl border p-4 transition-all duration-200 hover:-translate-y-1"
        style={{ backgroundColor: TOKENS.surface, borderColor: TOKENS.border }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = TOKENS.accent;
          e.currentTarget.style.boxShadow =
            "0 8px 24px -8px " + TOKENS.accent + "40";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = TOKENS.border;
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <span
          className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6"
          style={{ backgroundColor: TOKENS.bg, color: TOKENS.accent }}
        >
          {/* Icon rendered by parent */}
          <social.Icon size={18} />
        </span>
        <span className="min-w-0">
          <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>
            {social.label}
          </div>
          <div className="text-xs truncate" style={{ color: TOKENS.inkMute }}>
            {social.handle}
          </div>
        </span>
      </a>
    </Reveal>
  );
});

export default SocialCard;
