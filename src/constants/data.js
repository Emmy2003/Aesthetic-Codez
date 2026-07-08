/**
 * All static content data — frozen to prevent runtime tampering.
 */

export const PROJECTS = Object.freeze([
  Object.freeze({
    index: "01",
    name: "SentinelEarth",
    tag: "Civic / Environmental Intelligence",
    description:
      "A global environmental intelligence platform monitoring flood risk, air quality, weather extremes, and wildfire conditions in real time — built on live satellite and sensor data.",
    stack: Object.freeze(["React", "Vite", "Tailwind", "Cloudflare Workers", "Earth Engine", "Open-Meteo"]),
  }),
  Object.freeze({
    index: "02",
    name: "FloodWatch NG",
    tag: "Civic / Nigeria",
    description:
      "Flood risk intelligence for Nigerian cities and LGAs — live forecasts mapped against local geography, built for the communities who need the warning earliest.",
    stack: Object.freeze(["React", "Open-Meteo API", "Anthropic API", "GeoJSON"]),
  }),
  Object.freeze({
    index: "03",
    name: "HomeBridge",
    tag: "Marketplace / Bonny Island",
    description:
      "A verified rental marketplace for Bonny Island — multi-step auth, OTP verification, and role-based dashboards for landlords and tenants.",
    stack: Object.freeze(["React", "Context + useReducer", "Leaflet", "OTP Auth"]),
  }),
]);

export const SKILLS = Object.freeze([
  "React", "Vite", "TypeScript", "Tailwind CSS", "Figma",
  "Cloudflare Workers", "REST APIs", "GeoJSON / Leaflet", "Design systems",
]);

export const PROCESS = Object.freeze([
  Object.freeze({ step: "01", title: "Understand", copy: "Start with the real problem, not the interface — who's affected, what data exists, what's actually broken today." }),
  Object.freeze({ step: "02", title: "Design", copy: "Systems before screens: typography, color, spacing decided once, applied everywhere." }),
  Object.freeze({ step: "03", title: "Build", copy: "Production React from day one — no throwaway prototypes, no gap between design and shipped code." }),
]);

export const SOCIALS = Object.freeze([
  Object.freeze({ label: "Email", handle: "hello@aestheticcodez.dev", href: "mailto:hello@aestheticcodez.dev" }),
  Object.freeze({ label: "WhatsApp", handle: "Chat directly", href: "https://wa.me/2348051031344" }),
  Object.freeze({ label: "Instagram", handle: "@aestheticcodez", href: "https://instagram.com/aestheticcodez" }),
  Object.freeze({ label: "Facebook", handle: "Aesthetic Codez", href: "https://facebook.com/aestheticcodez" }),
  Object.freeze({ label: "TikTok", handle: "@aestheticcodez", href: "https://tiktok.com/@aestheticcodez" }),
  Object.freeze({ label: "GitHub", handle: "@emmy2003", href: "https://github.com/emmy2003" }),
  Object.freeze({ label: "LinkedIn", handle: "Connect", href: "https://linkedin.com/" }),
]);

export const SECTIONS = Object.freeze(["work", "about", "process", "contact"]);
