import { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  X,
  Instagram,
  Facebook,
  MessageCircle,
  Music2,
} from "lucide-react";

import { TOKENS } from "./constants/tokens";
import { PROJECTS, SKILLS, PROCESS, SOCIALS, SECTIONS } from "./constants/data";
import { isSafeUrl, getLinkProps } from "./utils/security";

import CountUp from "./components/CountUp";
import Reveal from "./components/Reveal";
import Tag from "./components/Tag";
import HoverBorder from "./components/HoverBorder";
import ProjectRow from "./components/ProjectRow";

import Logo from "./Logo.webp";
// Profile photo missing in repo; use logo as fallback to avoid build errors
import ProfilePhoto from "./Photo.webp";

// Icon registry for social cards
const SOCIAL_ICONS = { Mail, MessageCircle, Instagram, Facebook, Music2, Github, Linkedin };

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [underline, setUnderline] = useState({ left: 0, width: 0, opacity: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [navLoaded, setNavLoaded] = useState(false);
  const navRefs = useRef(new Map());
  const scrollContainerRef = useRef(null);
  const observersRef = useRef([]);

  // Nav entrance animation
  useEffect(() => {
    const t = setTimeout(() => setNavLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Scroll detection for header glass effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const onScroll = () => setScrolled(container.scrollTop > 12);
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  // Section spy with IntersectionObserver
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    observersRef.current.forEach((o) => o && o.disconnect());
    observersRef.current = [];

    const observers = SECTIONS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.35, root: container }
      );
      obs.observe(el);
      return obs;
    });

    observersRef.current = observers;
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  // Underline positioning
  useLayoutEffect(() => {
    const el = navRefs.current.get(active);
    if (el) {
      setUnderline({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
    } else {
      setUnderline((u) => ({ ...u, opacity: 0 }));
    }
  }, [active]);

  // Scroll handler
  const scrollToId = useCallback(
    (id) => (e) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el && scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: el.offsetTop - 70,
          behavior: "smooth",
        });
      }
      setMenuOpen(false);
    },
    []
  );

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  // Close menu on Escape
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <div
      ref={scrollContainerRef}
      className="h-screen overflow-y-auto font-sans scroll-smooth"
      style={{ backgroundColor: TOKENS.bg, color: TOKENS.ink }}
    >
      {/* Floating orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute w-[380px] h-[380px] rounded-full blur-[120px] opacity-[0.08]"
          style={{
            backgroundColor: TOKENS.accent,
            top: "-6%",
            left: "-6%",
            animation: "orbDrift1 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[340px] h-[340px] rounded-full blur-[120px] opacity-[0.07]"
          style={{
            backgroundColor: TOKENS.navy,
            bottom: "-4%",
            right: "-6%",
            animation: "orbDrift2 22s ease-in-out infinite",
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════ NAV */}
      <header
        className="sticky top-0 z-30 transition-colors duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(11,12,15,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: "1px solid " + (scrolled ? TOKENS.border : "transparent"),
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="#top"
            onClick={scrollToId("top")}
            className="relative flex items-center group"
            style={{
              animation: navLoaded ? "navDrop 0.6s ease-out both" : "none",
            }}
          >
            <span
              className="absolute -inset-2 rounded-full blur-md transition-opacity duration-300"
              style={{
                backgroundColor: TOKENS.accent,
                opacity: 0.18,
                animation: "logoGlowPulse 3s ease-in-out infinite",
              }}
            />
            <img
              src={Logo}
              alt="Aesthetic Codez"
              width={42}
              height={42}
              className="relative h-[42px] w-[42px] object-contain transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
              loading="eager"
              decoding="async"
            />
          </a>

          <nav className="relative hidden sm:flex gap-7 text-sm">
            {SECTIONS.map((id, i) => (
              <a
                key={id}
                ref={(el) => {
                  if (el) navRefs.current.set(id, el);
                  else navRefs.current.delete(id);
                }}
                href={"#" + id}
                onClick={scrollToId(id)}
                className="transition-colors duration-150"
                style={{
                  color: active === id ? TOKENS.ink : TOKENS.inkMute,
                  animation: navLoaded
                    ? "navDrop 0.5s ease-out " + (0.1 + i * 0.07) + "s both"
                    : "none",
                }}
                aria-current={active === id ? "page" : undefined}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
            <span
              className="absolute -bottom-[17px] h-[2px] rounded-full transition-all duration-300 ease-out"
              style={{
                left: underline.left,
                width: underline.width,
                opacity: underline.opacity,
                backgroundColor: TOKENS.accent,
              }}
            />
          </nav>

          <a
            href="#contact"
            onClick={scrollToId("contact")}
            className="hidden sm:inline-block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 hover:scale-105"
            style={{ backgroundColor: TOKENS.accent, color: "#04141A" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = TOKENS.accentHover)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = TOKENS.accent)
            }
          >
            Start a project
          </a>

          <button
            onClick={toggleMenu}
            className="sm:hidden"
            style={{ color: TOKENS.ink }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <nav
            id="mobile-menu"
            className="sm:hidden flex flex-col px-6 pb-4 text-sm border-t"
            style={{ borderColor: TOKENS.border }}
          >
            {SECTIONS.map((id) => (
              <a
                key={id}
                href={"#" + id}
                onClick={scrollToId(id)}
                className="py-2.5 border-b last:border-0"
                style={{ color: TOKENS.inkMute, borderColor: TOKENS.border }}
                aria-current={active === id ? "page" : undefined}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* ═══════════════════════════════════════════════════ HERO */}
      <section
        id="top"
        className="max-w-4xl mx-auto px-6 pt-20 pb-24 grid md:grid-cols-[1.3fr,0.7fr] gap-12 items-center"
      >
        <div>
          <Reveal>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium mb-6"
              style={{ borderColor: TOKENS.border, color: TOKENS.inkMute }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: TOKENS.accent }}
              />
              Available for select projects
            </div>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="font-semibold text-[clamp(2.1rem,5vw,3.25rem)] leading-[1.12] tracking-tight">
              Frontend engineering and UI/UX design, done properly.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p
              className="mt-5 max-w-xl text-base leading-relaxed"
              style={{ color: TOKENS.inkMute }}
            >
              I&apos;m Emmy — I design and build web applications under{" "}
              <span style={{ color: TOKENS.ink }}>Aesthetic Codez</span>. Recent
              work spans civic and environmental platforms, marketplaces, and
              data-driven tools. Based in Nigeria, rooted in Bonny Island.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#work"
                onClick={scrollToId("work")}
                className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 hover:scale-105"
                style={{ backgroundColor: TOKENS.accent, color: "#04141A" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = TOKENS.accentHover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = TOKENS.accent)
                }
              >
                View work
              </a>
              <HoverBorder
                as="a"
                href="#contact"
                onClick={scrollToId("contact")}
                className="px-5 py-2.5 rounded-lg text-sm font-medium border hover:scale-105"
                style={{ color: TOKENS.ink }}
              >
                Get in touch
              </HoverBorder>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div
              className="mt-14 pt-8 border-t grid grid-cols-3 max-w-md gap-6"
              style={{ borderColor: TOKENS.border }}
            >
              <div>
                <div className="font-semibold text-2xl">
                  <CountUp target={3} />
                </div>
                <div className="text-xs mt-1" style={{ color: TOKENS.inkMute }}>
                  Shipped platforms
                </div>
              </div>
              <div>
                <div className="font-semibold text-2xl">
                  <CountUp target={2} />
                </div>
                <div className="text-xs mt-1" style={{ color: TOKENS.inkMute }}>
                  Countries of focus
                </div>
              </div>
              <div>
                <div className="font-semibold text-2xl">
                  <CountUp target={1} />
                </div>
                <div className="text-xs mt-1" style={{ color: TOKENS.inkMute }}>
                  Design system
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Animated photo slot */}
        <Reveal delay={140}>
          <div className="relative mx-auto w-full max-w-[220px] aspect-square">
            <div
              className="absolute -inset-3 rounded-full opacity-60"
              style={{
                background:
                  "conic-gradient(from 0deg, " +
                  TOKENS.accent +
                  ", " +
                  TOKENS.navy +
                  ", " +
                  TOKENS.accent +
                  ")",
                WebkitMask:
                  "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
                animation: "ringSpin 12s linear infinite",
              }}
            />
            <div style={{ animation: "floatPhoto 5s ease-in-out infinite" }}>
              <div
                className="relative w-full aspect-square rounded-full overflow-hidden border flex items-center justify-center"
                style={{
                  borderColor: TOKENS.border,
                  backgroundColor: TOKENS.surface,
                }}
              >
                <img
                  src={ProfilePhoto}
                  alt="Profile photo of Emmy"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════ WORK */}
      <section id="work" className="max-w-4xl mx-auto px-6 pb-24">
        <Reveal>
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="text-sm font-medium" style={{ color: TOKENS.inkMute }}>
              Selected work
            </h2>
            <span className="text-xs" style={{ color: TOKENS.inkFaint }}>
              2024 — 2026
            </span>
          </div>
        </Reveal>
        <div className="border-t" style={{ borderColor: TOKENS.border }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <ProjectRow project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ ABOUT */}
      <section id="about" className="max-w-4xl mx-auto px-6 pb-24">
        <Reveal>
          <h2 className="text-sm font-medium mb-6" style={{ color: TOKENS.inkMute }}>
            About
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-10">
          <Reveal delay={60} className="sm:col-span-2">
            <p
              className="text-base leading-relaxed"
              style={{ color: TOKENS.inkMute }}
            >
              I work across the full frontend stack — React, Vite, Tailwind —
              and the design layer that sits before it in Figma. That range has
              taken me from real-time data platforms to rental marketplaces to
              brand systems, with a consistent focus on interfaces that stay
              usable when the underlying data or logic gets complicated.
            </p>
            <div
              className="mt-4 flex items-center gap-2 text-sm"
              style={{ color: TOKENS.ink }}
            >
              <MapPin size={14} style={{ color: TOKENS.accent }} />
              Bonny Island, Rivers State, Nigeria
            </div>
          </Reveal>
          <Reveal delay={120} className="flex flex-wrap content-start gap-2">
            {SKILLS.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ PROCESS */}
      <section id="process" className="max-w-4xl mx-auto px-6 pb-24">
        <Reveal>
          <h2 className="text-sm font-medium mb-6" style={{ color: TOKENS.inkMute }}>
            How I work
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-4">
          {PROCESS.map((s, i) => (
            <Reveal key={s.step} delay={i * 80}>
              <div
                className="rounded-xl border p-6 h-full transition-all duration-200 hover:-translate-y-1"
                style={{
                  backgroundColor: TOKENS.surface,
                  borderColor: TOKENS.border,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = TOKENS.accent)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = TOKENS.border)
                }
              >
                <span className="font-mono text-xs" style={{ color: TOKENS.accent }}>
                  {s.step}
                </span>
                <h3 className="font-semibold mt-3 mb-2" style={{ color: TOKENS.ink }}>
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: TOKENS.inkMute }}>
                  {s.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ CONTACT */}
      <footer id="contact" className="border-t" style={{ borderColor: TOKENS.border }}>
        <div className="max-w-4xl mx-auto px-6 py-20">
          <Reveal>
            <h2 className="font-semibold text-3xl tracking-tight max-w-md">
              Have a project in mind? Let&apos;s build something.
            </h2>
          </Reveal>
          <Reveal delay={60}>
            <p
              className="mt-4 max-w-lg text-sm"
              style={{ color: TOKENS.inkMute }}
            >
              Reach out on whichever platform is easiest for you — all of these
              go directly to me.
            </p>
          </Reveal>

          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {SOCIALS.map((s, i) => {
              const IconComponent = SOCIAL_ICONS[s.label] || Mail;
              return (
                <Reveal key={s.label} delay={i * 60}>
                  <a
                    href={isSafeUrl(s.href) ? s.href : "#"}
                    {...getLinkProps(s.href)}
                    className="group flex items-center gap-3 rounded-xl border p-4 transition-all duration-200 hover:-translate-y-1"
                    style={{
                      backgroundColor: TOKENS.surface,
                      borderColor: TOKENS.border,
                    }}
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
                      <IconComponent size={18} />
                    </span>
                    <span className="min-w-0">
                      <div className="text-sm font-medium" style={{ color: TOKENS.ink }}>
                        {s.label}
                      </div>
                      <div className="text-xs truncate" style={{ color: TOKENS.inkMute }}>
                        {s.handle}
                      </div>
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={300}>
            <div
              className="mt-14 pt-8 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              style={{ borderColor: TOKENS.border }}
            >
              <p className="text-xs" style={{ color: TOKENS.inkMute }}>
                &copy; 2026 Aesthetic Codez. All rights reserved.
              </p>
            </div>
          </Reveal>
        </div>
      </footer>
    </div>
  );
}
