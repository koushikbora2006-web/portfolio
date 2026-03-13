import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { useDarkMode } from "../../hooks/useDarkMode";
import { HiMenuAlt3, HiX, HiMoon, HiSun } from "react-icons/hi";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", to: "home" },
  { name: "About", to: "about" },
  { name: "Skills", to: "skills" },
  { name: "Experience", to: "experience" },
  { name: "Projects", to: "projects" },
  { name: "Contact", to: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [colorTheme, setTheme] = useDarkMode();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass-header py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="home"
            smooth={true}
            duration={500}
            className="text-2xl font-bold cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          >
            &lt;Koushik /&gt;
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={true}
                spy={true}
                offset={-70}
                duration={500}
                activeClass="text-primary font-bold dark:text-primary drop-shadow-[0_0_8px_rgba(14,165,233,0.8)] scale-110"
                className="text-light-text dark:text-dark-text hover:text-primary dark:hover:text-primary hover:drop-shadow-[0_0_5px_rgba(14,165,233,0.5)] cursor-pointer transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setTheme(colorTheme)}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {colorTheme === "light" ? (
                <HiSun className="w-5 h-5 text-yellow-500" />
              ) : (
                <HiMoon className="w-5 h-5 text-slate-700" />
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setTheme(colorTheme)}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              {colorTheme === "light" ? (
                <HiSun className="w-5 h-5 text-yellow-500" />
              ) : (
                <HiMoon className="w-5 h-5 drop-shadow-sm" />
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="text-light-text dark:text-dark-text focus:outline-none"
            >
              {isOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenuAlt3 className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-header border-t border-slate-200 dark:border-slate-800 absolute top-full left-0 w-full"
          >
            <div className="flex flex-col px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  spy={true}
                  offset={-70}
                  duration={500}
                  onClick={toggleMenu}
                  activeClass="text-primary font-semibold"
                  className="text-light-text dark:text-dark-text hover:text-primary text-lg font-medium cursor-pointer"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
