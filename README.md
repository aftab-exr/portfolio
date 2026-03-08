# Hamza's Portfolio

A minimalist, multi-page portfolio built with React, Vite, and Tailwind CSS, featuring a modern Glassmorphism aesthetic.

## 🚀 Getting Started

To run this project locally:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Start Development Server:**
    ```bash
    npm run dev
    ```
    Open the generated local URL (usually `http://localhost:5173`) in your browser.

## 📝 How to Update Content

This portfolio is designed to be easily updatable. Here's where to find and change information:

### 1. The Home Page (`src/pages/Home.jsx`)

Update your primary introduction, bio, and skills here.

- **Intro text:** Modify the `<h1>` and `<p>` tags in the Hero Section.
- **Skills:** Modify the lists inside the `['React', 'JavaScript', ...].map` arrays within each `GlassCard`.

### 2. The Profiles Page (`src/pages/Profiles.jsx`)

Update your GitHub, LeetCode, and HackerRank details here.

- Find the `profiles` array at the top of the file.
- Change the `description`, add your actual profile `link`s, or update your `stats`.

### 3. The Navigation / Header (`src/components/Navbar.jsx`)

- Change your initials/logo in the first `NavLink` tag.
- Add or remove navigation items if you create new pages.

### 4. Global Styles & Theme (`tailwind.config.js` and `src/index.css`)

- **Colors:** The ambient glowing background colors are defined directly on the elements with classes like `bg-purple-500/30`. You can change these to customize the vibe.
- **Glassmorphism:** The core glass effect is defined as a custom utility `.glass` in `src/index.css`.

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

This will generate a `dist` folder ready for deployment to platforms like Netlify, Vercel, or GitHub Pages.
