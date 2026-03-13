import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function ThunderEffect() {
  const [strikes, setStrikes] = useState([]);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleClick = (e) => {
      // Add a new strike at the cursor position
      const newStrike = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };

      setStrikes((prev) => [...prev, newStrike]);

      // Remove the strike after animation completes
      setTimeout(() => {
        setStrikes((prev) =>
          prev.filter((strike) => strike.id !== newStrike.id),
        );
      }, 600);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {/* Dynamic Cursor Halo - Follows Mouse */}
      <motion.div
        className="fixed w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] mix-blend-screen pointer-events-none z-0"
        animate={{
          x: mousePos.x - 250,
          y: mousePos.y - 250,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 1 }}
      />
      
      <AnimatePresence>
        {strikes.map((strike) => (
          <motion.div
            key={strike.id}
            initial={{ opacity: 1, scale: 0.5, y: -20 }}
            animate={{
              opacity: [1, 0.8, 1, 0],
              scale: [0.5, 1.5, 2],
              y: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]"
            style={{ left: strike.x, top: strike.y }}
          >
            {/* A sharp thunderbolt icon (different/larger than the cursor) */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 2L4 18H14L10 32L28 12H18L22 2H14Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
