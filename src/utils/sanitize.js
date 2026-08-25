/**
 * Security & Input Sanitization Utilities for The_Social_Dev Admin Panel
 */

/**
 * Sanitizes generic string inputs by trimming whitespace, stripping potentially dangerous
 * HTML script/style/iframe tags, and converting special characters to safe entities.
 *
 * @param {string} input - Raw input string
 * @param {number} [maxLength=5000] - Optional maximum character limit
 * @returns {string} Sanitized clean string
 */
export function sanitizeString(input, maxLength = 5000) {
  if (typeof input !== 'string') return '';
  
  // 1. Trim leading and trailing whitespace
  let clean = input.trim();

  // 2. Truncate if exceeds max length limit
  if (maxLength && clean.length > maxLength) {
    clean = clean.substring(0, maxLength);
  }

  // 3. Remove script, style, iframe, object, embed tags and their contents
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  clean = clean.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');

  // 4. Remove inline JS handler attributes (e.g. onload=, onerror=, onclick=)
  clean = clean.replace(/\son\w+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '');

  // 5. Neutralize javascript: protocols in text or links
  clean = clean.replace(/javascript\s*:/gi, 'no-javascript:');

  return clean;
}

/**
 * Validates and sanitizes a URL input (HTTP, HTTPS, Mailto, or Data URIs for uploaded images).
 *
 * @param {string} urlStr - Raw URL input string
 * @returns {string} Clean URL or empty string if invalid/unsafe protocol
 */
export function sanitizeUrl(urlStr) {
  if (typeof urlStr !== 'string') return '';
  const trimmed = urlStr.trim();
  if (!trimmed) return '';

  // Allow relative URLs, http/https URLs, mailto URLs, base64 data URIs for image uploads, and anchor hashes
  if (
    /^(https?:\/\/|\/|#|mailto:|data:image\/[a-zA-Z]+;base64,)/i.test(trimmed)
  ) {
    // Remove inline JS execution vectors
    return trimmed.replace(/javascript\s*:/gi, '');
  }

  // If missing protocol but looks like domain, prepend https://
  if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/.test(trimmed)) {
    return `https://${trimmed}`;
  }

  return sanitizeString(trimmed, 2048);
}

/**
 * Validates an email address format.
 *
 * @param {string} emailStr - Email input
 * @returns {boolean} True if valid email format
 */
export function validateEmail(emailStr) {
  if (typeof emailStr !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr.trim());
}

/**
 * Generates a standard RFC 4122 compliant UUID v4.
 *
 * @returns {string} UUID v4 formatted string
 */
export function generateUUID() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback UUID v4 generator
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
