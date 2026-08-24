/**
 * Sanitizes URLs to prevent DOM-based XSS attacks via dangerous protocols like `javascript:`.
 * Strictly permits http:, https:, mailto:, tel:, relative anchors, and root-relative paths.
 */
export function sanitizeUrl(url) {
  if (!url || typeof url !== 'string') return '#';
  const trimmed = url.trim();

  // Allow relative anchors (#about, #contact) and path links (/admin)
  if (trimmed.startsWith('#') || trimmed.startsWith('/')) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed, window.location.origin);
    const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
    if (allowedProtocols.includes(parsed.protocol)) {
      return trimmed;
    }
  } catch (e) {
    // If URL parsing fails, fall back to safe default
    return '#';
  }

  return '#';
}
