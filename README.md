# Destinations

A modern travel content platform built with [Payload CMS](https://payloadcms.com/) and [Next.js](https://nextjs.org/). Editors can manage travel destinations through a clean admin interface, while visitors enjoy a fast, beautiful front-end experience — with no code required for content updates.

---

## Features

### ✈️ Hero Carousel

The homepage opens with a full-screen slideshow. Each slide has a background image, heading, subheading, and an optional call-to-action button — all managed from the CMS.

![Homepage hero carousel](https://raw.githubusercontent.com/marcelomaias/destinations/main/public/screenshots/Home-Hero.jpg)

---

### 🌟 Popular Destinations

Destinations flagged as "popular" in the admin sidebar appear in a curated card grid on the homepage. Each card links directly to its destination page.

![Popular destinations grid on homepage](https://raw.githubusercontent.com/marcelomaias/destinations/main/public/screenshots/Home-Cards.jpg)

---

### 🔍 Filterable Destinations Page

The `/destinations` page lets visitors filter by location using a dropdown. The filter is URL-based, making filtered views shareable and bookmarkable.

![Destinations page with location filter](https://raw.githubusercontent.com/marcelomaias/destinations/main/public/screenshots/Destinations-Filter.jpg)

---

### 📄 Destination Pages

Each destination has its own page built from content blocks — a full-width heading with cover image, rich-text body, images, and more.

![Individual destination page](https://raw.githubusercontent.com/marcelomaias/destinations/main/public/screenshots/Destination-Page.png)

---

### 🗂 Admin Panel

The Payload admin panel gives editors full control over all content — pages, destinations, media, forms, and global navigation — from a single clean interface.

![Payload admin dashboard](https://raw.githubusercontent.com/marcelomaias/destinations/main/public/screenshots/Admin_Collections.png)

Editors can browse and manage all pages with status, slug, and page type at a glance.

![Pages list in admin](https://raw.githubusercontent.com/marcelomaias/destinations/main/public/screenshots/Admin_Pages.png)

Each page is built using a drag-and-drop block layout — no templates are hardcoded. Blocks can be reordered and configured individually.

![Page editor with block layout](https://raw.githubusercontent.com/marcelomaias/destinations/main/public/screenshots/Admin_Page.png)

---

## Page Builder Blocks

Every page is assembled from a library of flexible content blocks:

- **Carousel** — Full-screen hero slideshow with headings, subheadings, and CTA buttons
- **Heading** — Full-width banner with background image, title, subtitle, and optional CTA
- **Text Block** — Rich prose content powered by a Lexical editor
- **Text + Image** — Side-by-side layout with configurable order (text-first or image-first), optional background texture, author attribution, and CTA
- **Text Heading** — Section label with heading and subheading
- **Image Block** — Standalone image, optionally full-width, with optional caption
- **Info Cards** — A row of icon + text cards (up to 4), ideal for highlights or features
- **Destinations Grid** — Embeds the destinations list anywhere on a page, with options to show only popular destinations or cap the number shown
- **Contact Form** — Renders a managed Payload form with submission handling and custom confirmation messages

---

## More Features

### 📬 Contact Form

Forms are created and managed entirely within Payload. The contact block renders the form on any page, handles submission via the Payload API, and shows a custom confirmation message on success.

### 🗺 Navigation Management

The header and footer are managed as Globals in Payload — no code changes needed to add, remove, or reorder navigation links.

### 🔎 SEO

All pages and destinations include an SEO tab powered by the official Payload SEO plugin, with custom titles, descriptions, and OG images per document.

### ⚡ Draft & Publish Workflow

All pages and destinations support Payload's draft/publish system with autosave. Editors can preview and iterate on content before it goes live, with up to 10 versions stored per document.

### 🎞 Smooth Animations

Page transitions and scroll-based animations are handled with GSAP — including destination card reveals on scroll, a rotating stamp graphic, and a header that transitions from transparent to solid as the user scrolls down.

### 📱 Responsive & Mobile-First

The layout is fully responsive. A hamburger menu with a smooth slide-in animation handles mobile navigation.

---

## Tech Stack

| Layer         | Technology                       |
| ------------- | -------------------------------- |
| Framework     | Next.js 15 (App Router)          |
| CMS           | Payload 3                        |
| Database      | MongoDB                          |
| File Storage  | Vercel Blob                      |
| Styling       | Tailwind CSS v4                  |
| Rich Text     | Lexical (via Payload)            |
| Animations    | GSAP + ScrollTrigger + SplitText |
| UI Components | Radix UI + shadcn/ui primitives  |
| Carousel      | Embla Carousel                   |

---

## Getting Started

### Prerequisites

- Node.js `^18.20.2` or `>=20.9.0`
- pnpm `^9` or `^10`
- A MongoDB instance
- (Optional) Vercel Blob token for media storage

### Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/marcelomaias/destinations
cd destinations

# 2. Copy environment variables and fill in your values
cp .env.example .env

# 3. Install dependencies
pnpm install

# 4. Start the development server
pnpm dev
```

Open `http://localhost:3000` to view the site, and `http://localhost:3000/admin` to access the CMS.

### Docker (Optional)

To use a local MongoDB instance via Docker:

```bash
# Update MONGODB_URL in .env to:
# mongodb://127.0.0.1/<your-db-name>

docker-compose up
```

---

## Deployment

This project is designed to deploy on [Vercel](https://vercel.com/). Set the required environment variables in your Vercel project settings:

| Variable                 | Description                         |
| ------------------------ | ----------------------------------- |
| `DATABASE_URL`           | MongoDB connection string           |
| `PAYLOAD_SECRET`         | Secret key for Payload auth         |
| `BLOB_READ_WRITE_TOKEN`  | Vercel Blob token for media uploads |
| `NEXT_PUBLIC_SERVER_URL` | Your production URL                 |

---

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
├── blocks/               # Page builder blocks (config + component)
│   ├── Carousel/
│   ├── ContactBlock/
│   ├── DestinationsGrid/
│   ├── Heading/
│   ├── ImageBlock/
│   ├── InfoCards/
│   ├── TextBlock/
│   ├── TextHeading/
│   └── TextImage/
├── collections/          # Payload collections (Pages, Destinations, Media, Users)
├── globals/              # Payload globals (Header, Footer)
├── components/           # Shared React components
└── lib/                  # Utility functions
```

---

## Questions & Community

- [Payload Discord](https://discord.com/invite/payload)
- [GitHub Discussions](https://github.com/payloadcms/payload/discussions)
