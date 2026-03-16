 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/README.md b/README.md
index 18bc70ebe277fbfe6e55e6f9a0ae7e2c3e4bdd83..9c3325d4333959b0cbc4a3a6c9f45b5e86fcf7bc 100644
--- a/README.md
+++ b/README.md
@@ -1,16 +1,98 @@
-# React + Vite
+# Portfolio Website
 
-This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
+A modern, animated personal portfolio built with **React + Vite** and styled with **Tailwind CSS**. The site showcases profile details, skills, education, projects, and a contact form powered by EmailJS.
 
-Currently, two official plugins are available:
+## Tech Stack
 
-- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
-- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
+- React 19
+- Vite 7
+- Tailwind CSS 4
+- Framer Motion
+- React Three Fiber / Drei / Three.js
+- React Router
+- EmailJS
 
-## React Compiler
+## Features
 
-The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).
+- Responsive single-page portfolio layout
+- Animated hero and section transitions
+- Skill, education, and project sections driven by central data
+- Dark mode support
+- Contact form with EmailJS integration
+- Custom background/visual effects components
 
-## Expanding the ESLint configuration
+## Project Structure
 
-If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
+```text
+src/
+  assets/                 # Images and static media
+  components/
+    layout/               # Shared layout components (navbar, footer, section wrapper)
+    sections/             # Main page sections (hero, about, skills, projects, etc.)
+    ...                   # Visual and utility UI components
+  data/userData.js        # Main profile/content source
+  hooks/useDarkMode.js    # Dark mode hook
+  App.jsx                 # Main app composition
+  main.jsx                # App entry point
+```
+
+## Getting Started
+
+### 1) Install dependencies
+
+```bash
+npm install
+```
+
+### 2) Start development server
+
+```bash
+npm run dev
+```
+
+The app will run locally at the URL shown by Vite (typically `http://localhost:5173`).
+
+### 3) Build for production
+
+```bash
+npm run build
+```
+
+### 4) Preview production build
+
+```bash
+npm run preview
+```
+
+## Contact Form Setup (EmailJS)
+
+To enable the contact form, create a `.env` file in the repository root with:
+
+```env
+VITE_EMAILJS_SERVICE_ID=your_service_id
+VITE_EMAILJS_TEMPLATE_ID=your_template_id
+VITE_EMAILJS_PUBLIC_KEY=your_public_key
+```
+
+You can get these values from your EmailJS dashboard.
+
+## Customize Portfolio Content
+
+Update profile, skills, education, social links, and projects in:
+
+- `src/data/userData.js`
+
+## Available Scripts
+
+- `npm run dev` – start development server
+- `npm run build` – create production build
+- `npm run preview` – preview production build
+- `npm run lint` – run ESLint
+
+## Deployment
+
+This project can be deployed on platforms like **Vercel**, **Netlify**, or any static hosting that supports Vite builds.
+
+---
+
+If you use this repository as a base, feel free to personalize the content and styling to match your portfolio brand.
 
EOF
)
