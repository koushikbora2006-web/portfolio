import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CosmicCanvas from "../components/CosmicCanvas";
import GridBackground from "../components/GridBackground";
import LightRays from "../components/LightRays";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-dark-bg text-white">
      {/* Cosmic backgrounds */}
      <CosmicCanvas />
      <GridBackground />
      <LightRays />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Lottie Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
        >
          <DotLottieReact
            src="https://lottie.host/358c021d-bd2d-4123-adca-9460ec821352/lka0lguLRK.lottie"
            loop
            autoplay
          />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-6xl md:text-8xl font-black mt-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-secondary drop-shadow-[0_0_20px_rgba(14,165,233,0.5)]"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-4 text-xl md:text-2xl font-semibold text-slate-300"
        >
          Oops! You&apos;re lost in deep space.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-2 text-slate-400 max-w-sm"
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </motion.p>

        {/* Back home button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10"
        >
          <Link
            to="/"
            className="btn-primary inline-flex items-center gap-2 text-lg"
          >
            🚀 Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
