import { useState, useEffect } from 'react';

export function useDarkMode() {
  const [theme, setTheme] = useState(
    typeof window !== 'undefined' ? localStorage.theme : 'dark'
  );
  
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    // Also toggle a class on body to match generic tailwind styles in index.css
    if (theme === 'dark') {
      window.document.body.classList.add('dark');
    } else {
      window.document.body.classList.remove('dark');
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
