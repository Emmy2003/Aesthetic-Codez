import { memo } from "react";
import { ArrowUpRight } from "lucide-react";
import { TOKENS } from "../constants/tokens";
import HoverBorder from "./HoverBorder";
import Tag from "./Tag";

const ProjectRow = memo(function ProjectRow({ project }) {
  return (
    <HoverBorder
      as="div"
      className="group grid sm:grid-cols-[auto,1fr,auto] gap-4 sm:gap-8 items-start sm:items-center py-7 border-b cursor-pointer hover:pl-2"
    >
      <span className="font-mono text-sm" style={{ color: TOKENS.inkFaint }}>
        {project.index}
      </span>

      <div>
        <div className="flex items-center gap-3 flex-wrap">
          <h3
            className="font-semibold text-lg transition-colors duration-200"
            style={{ color: TOKENS.ink }}
          >
            {project.name}
          </h3>
          <span className="text-xs font-medium" style={{ color: TOKENS.accent }}>
            {project.tag}
          </span>
        </div>
        <p
          className="mt-2 text-sm leading-relaxed max-w-xl"
          style={{ color: TOKENS.inkMute }}
        >
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {project.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </div>

      <ArrowUpRight
        size={20}
        className="justify-self-end transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        style={{ color: TOKENS.accent }}
      />
    </HoverBorder>
  );
});

export default ProjectRow;
