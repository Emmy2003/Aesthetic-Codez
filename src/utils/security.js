/**
 * Security utilities for URL validation and content sanitization.
 * Prevents XSS via malicious href attributes and unsafe text injection.
 */

/** Dangerous URL protocols that should be blocked */
const DANGEROUS_PROTOCOLS = Object.freeze([
  "javascript:",
  "data:",
  "vbscript:",
  "file:",
]);

/**
 * Validates a URL string for safety.
 * Blocks javascript:, data:, vbscript:, and file: protocols.
 * Allows mailto:, tel:, relative paths, and standard http/https URLs.
 *
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if the URL is considered safe
 */
export function isSafeUrl(url) {
  if (typeof url !== "string") return false;

  try {
    const parsed = new URL(url, window.location.href);
    return !DANGEROUS_PROTOCOLS.includes(parsed.protocol);
  } catch {
    // Relative URLs, mailto:, tel:, hash anchors are safe
    return (
      url.startsWith("mailto:") ||
      url.startsWith("tel:") ||
      url.startsWith("#") ||
      url.startsWith("/") ||
      url.startsWith("./") ||
      url.startsWith("../")
    );
  }
}

/**
 * Returns hardened link props for anchor elements.
 * Automatically adds target="_blank" and rel="noopener noreferrer"
 * only for external http/https URLs.
 *
 * @param {string} href - The link href
 * @returns {object} - Props to spread onto the <a> tag
 */
export function getLinkProps(href) {
  const isExternal =
    typeof href === "string" &&
    (href.startsWith("http://") || href.startsWith("https://"));

  return isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}

/**
 * Sanitizes text content to prevent accidental XSS.
 * Escapes HTML entities by treating input as plain text.
 *
 * @param {string} str - Raw text input
 * @returns {string} - Sanitized text safe for textContent insertion
 */
export function sanitizeText(str) {
  if (typeof str !== "string") return "";
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
