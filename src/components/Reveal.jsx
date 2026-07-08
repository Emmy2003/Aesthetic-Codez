import { memo } from "react";
import useReveal from "../hooks/useReveal";

const Reveal = memo(function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: delay + "ms" }}
      className={
        "transition-all duration-700 ease-out " +
        (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6") +
        " " +
        className
      }
    >
      {children}
    </div>
  );
});

export default Reveal;
