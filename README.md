# Portfolio Website
A modern, animated personal portfolio built with **React + Vite** and styled with **Tailwind CSS**. The site showcases profile details, skills, education, projects, and a contact form powered by EmailJS.
## Tech Stack
- React 19
- Vite 7
- Tailwind CSS 4
- Framer Motion
- React Three Fiber / Drei / Three.js
- React Router
- EmailJS
## Features
- Responsive single-page portfolio layout
- Animated hero and section transitions
- Skill, education, and project sections driven by central data
- Dark mode support
- Contact form with EmailJS integration
- Custom background/visual effects components
## Project Structure
```text
src/
  assets/                 # Images and static media
  components/
    layout/               # Shared layout components (navbar, footer, section wrapper)
    sections/             # Main page sections (hero, about, skills, projects, etc.)
    ...                   # Visual and utility UI components
  data/userData.js        # Main profile/content source
  hooks/useDarkMode.js    # Dark mode hook
  App.jsx                 # Main app composition
  main.jsx                # App entry point
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Start development server

```bash
npm run dev
```

The app will run locally at the URL shown by Vite (typically `http://localhost:5173`).

### 3) Build for production

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

## Contact Form Setup (EmailJS)

To enable the contact form, create a `.env` file in the repository root with:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

You can get these values from your EmailJS dashboard.

## Customize Portfolio Content

Update profile, skills, education, social links, and projects in:

- `src/data/userData.js`

## Available Scripts

- `npm run dev` – start development server
- `npm run build` – create production build
- `npm run preview` – preview production build
- `npm run lint` – run ESLint

## Deployment

This project can be deployed on platforms like **Vercel**, **Netlify**, or any static hosting that supports Vite builds.

---

If you use this repository as a base, feel free to personalize the content and styling to match your portfolio brand.
