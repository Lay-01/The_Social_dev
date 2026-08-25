# PROJECT_CONTEXT_SPEC.md - The Social Dev Specification & Context

## 1. Executive Summary & Tech Stack

### Application Overview

The project is a single-page marketing website and dynamic CMS for **The_Social_Dev**, a creative web development and digital agency.

The application features:
1. **Public Marketing Landing Page** (`/`): Anchor-based single-page experience built with a full dark glassmorphic design system.
2. **Social Dev Content Management Panel** (`/admin`): Authenticated admin dashboard allowing real-time CRUD management for About Us, Services, Our Ventures, Why Choose Us, Contact Email, and Footer Social Media buttons.

### Vercel Deployment & SPA Rewrites (`vercel.json`)

To deploy to **Vercel** with full support for direct `/admin` URL navigation:
- `vercel.json` is included in the project root to rewrite all requests (`/(.*)`) to `/index.html`.
- On Vercel Project Settings -> Environment Variables, add `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_ADMIN_PASSWORD`.

The active React render order for `/` is:
1. `Navbar`
2. `Hero`
3. `About`
4. `Expertise`
5. `Services`
6. `Ventures`
7. `WhyChooseUs`
8. `Process`
9. `Pricing`
10. `Contact`
11. `Footer`

This order is defined in [`src/App.jsx`](src/App.jsx).

### Core Framework & Build Tooling

- **Framework:** React `^18.2.0`
- **DOM renderer:** React DOM `^18.2.0`
- **Build tool:** Vite `^4.4.5`
- **React Vite plugin:** `@vitejs/plugin-react ^4.0.3`
- **Database & Backend:** Supabase REST API & PostgreSQL (`src/lib/supabase.js`)
- **Module system:** ES modules (`"type": "module"` in [`package.json`](package.json))
- **Development server:** Vite on port `3000` (`npm run dev`)

---

## 2. Dynamic Image & Icon Capabilities (`ImageUploader`)

### Smart `ImageUploader` Component (`src/admin/components/ImageUploader.jsx`)

The system provides unified image handling across all admin dashboard forms (About Us, Services, Our Ventures, Why Choose Us, Social Media Links):

1. **Local File Uploads**: Convert uploaded local image files into base64 Data URLs (max 5MB) for instant local persistence and Supabase sync.
2. **External 3rd Party URLs**: Paste any direct HTTPS image link (PNG, JPG, SVG, WebP).
3. **Smart Icons8 Auto-Converter**: Automatically detects Icons8 webpage URLs (e.g. `https://icons8.com/icon/XnHBz2LnhELw/dashboard-layout`) and converts them in real time into direct PNG CDN URLs (`https://img.icons8.com/?size=100&id=XnHBz2LnhELw&format=png`).
4. **Remix Icon Fallback Integration**: Supports CSS class names (e.g., `ri-instagram-line`) alongside direct image URLs.

---

## 3. Data Layer & Zero-Downtime Live Updates

### Dual Persistence Architecture

- **Supabase Cloud Sync**: Synchronizes all site settings and content directly with Supabase PostgreSQL tables (`site_settings`, `services`, `ventures`).
- **Browser LocalStorage Backup**: Automatically mirrors data in `localStorage` so changes persist seamlessly even when offline or before Supabase connects.
- **Zero-Downtime Updates**: Edits made in the Admin Dashboard update the database dynamically **without requiring a site rebuild or GitHub commit**. Visitors see updates live on refresh.

### Our Ventures Data Model

Each venture item in `content.ventures[]` has the following shape:

```js
{
  id: "vtr-TIMESTAMP",          // Unique identifier (auto-generated)
  title: "Project Name",         // Display title on the public card
  description: "Short blurb...", // 1-2 sentence project summary
  url: "https://example.com",    // Live site URL (used for the CTA button)
  image: "https://...",          // Site thumbnail (URL or base64 upload)
  isActive: true,                // If false, hidden from the public website
  sortOrder: 1                   // Display order (auto-assigned on save)
}
```

### Supabase Tables

- `site_settings` — key/value JSONB pairs (contactEmail, about, whyChooseUs, socialLinks, ventures as JSON fallback)
- `services` — dedicated rows for service CRUD
- `ventures` — dedicated rows for venture CRUD (title, description, url, image, is_active, sort_order)

---

## 4. GitHub Pages Deployment & Routing Solution

### SPA Routing & 404 Prevention

1. **404 Fallback (`public/404.html`)**: Catches direct subpath accesses (e.g., `/The_Social_dev/admin`) on GitHub Pages and redirects them safely with hash encoding back to the SPA.
2. **GitHub Actions Workflow (`.github/workflows/deploy.yml`)**:
   - Automatically builds Vite project on every `push` to `main`.
   - Copies `index.html` to `404.html` in the build output.
   - Deploys automatically via dual-mode support (gh-pages branch & GitHub Actions native deployment).

### GitHub Pages Settings Configuration

For the live site to render correctly on GitHub Pages:
- Go to **Repository Settings -> Pages**.
- Under **Build and deployment -> Source**, select **Deploy from a branch** and choose branch **`gh-pages`** / folder **`/ (root)`** (OR select **GitHub Actions**).

---

## 5. File & Directory Structure

```text
/
├── index.html                         # HTML5 root shell
├── package.json                        # Project dependencies
├── vite.config.js                     # Vite build & dev server config (port 3000)
├── PROJECT_CONTEXT_SPEC.md             # Complete project specification & developer context
├── .env                                # Environment variables (VITE_SUPABASE_URL, etc.)
├── .github/
│   └── workflows/
│       └── deploy.yml                  # Zero-downtime GitHub Actions deploy pipeline
├── public/
│   └── 404.html                        # GitHub Pages SPA subpath redirect handler
├── src/
│   ├── main.jsx                        # ReactDOM root mount and global stylesheet imports
│   ├── App.jsx                         # SiteProvider, hash router (/ and /admin)
│   ├── index.css                       # Master public React stylesheet
│   ├── data/
│   │   └── defaultContent.js           # Initial default site content data (includes ventures[])
│   ├── lib/
│   │   └── supabase.js                 # Supabase REST client adapter & SQL setup (ventures table)
│   ├── context/
│   │   └── SiteContext.jsx             # Master site state & auth provider (ventures CRUD mutators)
│   ├── utils/
│   │   ├── mailto.js                   # Gmail & mailto link composer utility
│   │   └── imageFallback.js            # SVG fallback graphic handler for broken images
│   ├── admin/
│   │   ├── admin.css                   # Social Dev Panel custom dashboard styling
│   │   ├── AdminLayout.jsx             # Admin sidebar, header, and route views
│   │   ├── AdminLogin.jsx              # Admin authentication login view
│   │   ├── AdminForgotPassword.jsx     # CAPTCHA-secured password reset view
│   │   ├── ProtectedRoute.jsx          # Auth session guard wrapper
│   │   ├── components/
│   │   │   └── ImageUploader.jsx       # Unified image/icon input with Icons8 auto-converter
│   │   └── pages/
│   │       ├── AdminOverview.jsx       # Overview dashboard stats & SQL script setup
│   │       ├── AboutEditor.jsx         # About Us section form editor with ImageUploader
│   │       ├── ServicesEditor.jsx      # Services CRUD manager (table & modals) with ImageUploader
│   │       ├── VenturesEditor.jsx      # Our Ventures CRUD manager with thumbnail ImageUploader
│   │       ├── WhyChooseUsEditor.jsx   # Why Choose Us copy, metrics & icon editor
│   │       └── ContactSettings.jsx     # Contact email & dynamic social media buttons CRUD
│   └── components/
│       ├── Navbar.jsx                  # Header navigation & scroll spy (includes #ventures)
│       ├── Hero.jsx                    # Hero section
│       ├── About.jsx                   # Dynamic About section
│       ├── Expertise.jsx               # Agency stats
│       ├── Services.jsx                # Dynamic Services list mapping
│       ├── Ventures.jsx                # Dynamic Our Ventures card grid with browser-frame mockups
│       ├── WhyChooseUs.jsx             # Dynamic Why Choose Us copy & metrics
│       ├── Process.jsx                 # 4-Step work process
│       ├── Pricing.jsx                 # Pricing tiers
│       ├── Contact.jsx                 # Dynamic Contact form
│       └── Footer.jsx                  # Dynamic Footer with social media icons
```

---

## 6. Our Ventures — Admin Workflow

1. Log in to `/admin`.
2. Click **"Our Ventures"** in the sidebar Content Management menu.
3. Click **"Add New Venture"** to open the modal.
4. Fill in: Title, Short Description, Live Site URL, and upload or paste a Site Thumbnail.
5. Click **"Create Venture"** — the venture appears instantly on the public `#ventures` section.
6. Use **Edit** to update any field (including toggling Active/Hidden status).
7. Use the **Delete** button to permanently remove a venture.

---

## 7. How to Deploy Updates to GitHub

To push source code updates to GitHub and trigger automatic site deployment:

```powershell
cd d:\webcop\thesocialdev
git add .
git commit -m "Update project features and documentation"
git push origin main
```
