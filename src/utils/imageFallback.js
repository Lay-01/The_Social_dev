// SVG Fallback graphics for charts, icons, and avatars if external Webflow CDN is slow or blocked.

export const FALLBACK_SVGS = {
  growthChart: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 180" width="100%" height="100%"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="%23ffa260" stop-opacity="0.5"/><stop offset="100%" stop-color="%23ffa260" stop-opacity="0"/></linearGradient></defs><path d="M10 150 Q 80 120, 150 90 T 290 40 T 390 15 L 390 170 L 10 170 Z" fill="url(%23g)"/><path d="M10 150 Q 80 120, 150 90 T 290 40 T 390 15" fill="none" stroke="%23ffa260" stroke-width="4" stroke-linecap="round"/><circle cx="390" cy="15" r="6" fill="%23ffffff" stroke="%23ffa260" stroke-width="3"/></svg>`,
  
  whyChart1: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" width="100%" height="100%"><path d="M10 100 L 50 70 L 90 85 L 140 30 L 190 10" fill="none" stroke="%23ffa260" stroke-width="4" stroke-linecap="round"/><circle cx="190" cy="10" r="5" fill="%23ffa260"/></svg>`,
  
  whyChart2: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" width="100%" height="100%"><rect x="15" y="60" width="25" height="50" rx="4" fill="%238b5cf6"/><rect x="55" y="40" width="25" height="70" rx="4" fill="%2306b6d4"/><rect x="95" y="20" width="25" height="90" rx="4" fill="%23ffa260"/><rect x="135" y="10" width="25" height="100" rx="4" fill="%23a855f7"/></svg>`,
  
  whyChart3: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" width="100%" height="100%"><path d="M10 90 C 60 90, 80 30, 190 15" fill="none" stroke="%2306b6d4" stroke-width="4"/><path d="M10 90 C 60 90, 80 30, 190 15 L 190 110 L 10 110 Z" fill="%2306b6d4" fill-opacity="0.15"/></svg>`,
  
  avatar: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="50" r="50" fill="%231e293b"/><circle cx="50" cy="40" r="20" fill="%2394a3b8"/><path d="M20 90 C 20 65, 80 65, 80 90 Z" fill="%2394a3b8"/></svg>`,

  serviceIcon: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="100%" height="100%"><rect width="60" height="60" rx="12" fill="%231e293b"/><path d="M20 30 L 26 36 L 40 22" fill="none" stroke="%23ffa260" stroke-width="4" stroke-linecap="round"/></svg>`
};

export function handleImageError(e, fallbackType = 'serviceIcon') {
  if (e?.target) {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = FALLBACK_SVGS[fallbackType] || FALLBACK_SVGS.serviceIcon;
  }
}
