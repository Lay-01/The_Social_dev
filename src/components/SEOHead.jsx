import React, { useEffect } from 'react';

/**
 * SEOHead Component
 * Dynamically updates canonical tags, page title, and route meta tags for SEO.
 */
export default function SEOHead({ title, description, canonicalUrl, noindex = false }) {
  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = title;
    }

    // 2. Update Description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      } else {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        metaDesc.setAttribute('content', description);
        document.head.appendChild(metaDesc);
      }
    }

    // 3. Update Robots Meta Tag (Shield Admin from Indexing)
    let metaRobots = document.querySelector('meta[name="robots"]');
    const robotsValue = noindex ? 'noindex, nofollow' : 'index, follow';
    if (metaRobots) {
      metaRobots.setAttribute('content', robotsValue);
    } else {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      metaRobots.setAttribute('content', robotsValue);
      document.head.appendChild(metaRobots);
    }

    // 4. Update Self-referencing Canonical Link
    const targetCanonical = canonicalUrl || `${window.location.origin}${window.location.pathname}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (linkCanonical) {
      linkCanonical.setAttribute('href', targetCanonical);
    } else {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      linkCanonical.setAttribute('href', targetCanonical);
      document.head.appendChild(linkCanonical);
    }
  }, [title, description, canonicalUrl, noindex]);

  return null;
}
