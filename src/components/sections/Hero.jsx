// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { FaArrowDown } from "react-icons/fa";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center justify-center h-full"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-yellow-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] tracking-tight">
            Welcome to my portfolio
          </h1>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
      >
        <Link
          to="about"
          smooth={true}
          duration={500}
          className="text-light-muted dark:text-dark-muted hover:text-white transition-colors flex flex-col items-center group"
        >
          <span className="text-sm mb-2 font-medium tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity">
            Scroll Down
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="text-xl"
          >
            <FaArrowDown />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
