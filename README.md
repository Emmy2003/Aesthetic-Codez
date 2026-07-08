# Aesthetic Codez Portfolio

Frontend engineering and UI/UX design portfolio — built with React, Vite, and Tailwind CSS.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 📦 Build for Production

```bash
npm run build
```

## 🗂️ Project Structure

```
src/
├── assets/           # Images (Logo.webp, Photo.webp)
├── components/       # Reusable UI components
├── constants/        # Design tokens & static data
├── hooks/            # Custom React hooks
├── styles/           # Global CSS & keyframe animations
├── utils/            # Security utilities
├── App.jsx           # Root component
├── main.jsx          # Entry point
└── Portfolio.jsx     # Main portfolio page
```

## 🔒 Security Features

- URL validation blocks `javascript:`, `data:`, `vbscript:`, `file:` protocols
- External links auto-inject `rel="noopener noreferrer"`
- All static data is `Object.freeze()`'d to prevent runtime tampering
- Component memoization prevents unnecessary re-renders

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| bg | `#0B0C0F` | Page background |
| surface | `#111318` | Card backgrounds |
| accent | `#22D3EE` | Primary accent / CTAs |
| ink | `#F5F5F7` | Primary text |
| inkMute | `#8A8F98` | Secondary text |

---

© 2026 Aesthetic Codez
