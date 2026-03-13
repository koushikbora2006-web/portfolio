import { useRef } from "react";
import Section from "../layout/Section";
import { userData } from "../../data/userData";
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from "framer-motion";
import { FaGraduationCap, FaStar } from "react-icons/fa";
import Tilt from "react-parallax-tilt";

const TimelineItem = ({ edu, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex justify-center items-center w-full mb-16 last:mb-0">
      {/* Center glowing node */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full border-4 border-slate-900 bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white z-20 shadow-[0_0_20px_rgba(14,165,233,0.6)]"
      >
        {index === 0 ? (
          <FaStar className="text-xl animate-pulse text-yellow-300" />
        ) : (
          <FaGraduationCap className="text-xl" />
        )}
      </motion.div>

      {/* Content wrapper taking half width */}
      <div
        className={`w-[calc(50%-3rem)] flex ${isEven ? "justify-end pr-8 ml-auto mr-[50%]" : "justify-start pl-8 mr-auto ml-[50%]"}`}
      >
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="w-full max-w-lg"
        >
          <Tilt
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            scale={1.02}
            transitionSpeed={1000}
            className="w-full"
          >
            <div className="glass-card p-6 md:p-8 relative group border-t-2 border-primary/30 hover:border-primary shadow-xl hover:shadow-[0_0_30px_rgba(14,165,233,0.2)] transition-all duration-300 overflow-hidden">
              {/* Background elegant gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>

              {/* Decorative timeline connector line */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 w-8 h-[2px] bg-primary/30 ${isEven ? "-right-8" : "-left-8"} z-0`}
              ></div>

              <div
                className={`flex flex-col ${isEven ? "md:items-end text-left md:text-right" : "md:items-start text-left"}`}
              >
                <span className="inline-block px-4 py-1.5 mb-4 text-sm font-bold tracking-wider rounded-md bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
                  {edu.duration}
                </span>
                <h3 className="font-black text-xl md:text-2xl text-light-text dark:text-white mb-2 group-hover:text-primary transition-colors leading-tight">
                  {edu.degree}
                </h3>
                <h4 className="font-bold text-lg md:text-xl text-secondary opacity-90 mb-4">
                  {edu.institution}
                </h4>
                <p className="text-light-muted dark:text-dark-muted text-sm md:text-base leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                  {edu.description}
                </p>
              </div>
            </div>
          </Tilt>
        </motion.div>
      </div>
    </div>
  );
};

// Mobile specific item to handle small screens elegantly
const MobileTimelineItem = ({ edu, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="relative pl-10 mb-12 last:mb-0"
  >
    {/* Side glowing node */}
    <div className="absolute left-0 top-6 transform -translate-x-1/2 w-10 h-10 rounded-full border-4 border-slate-900 bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white z-20 shadow-[0_0_15px_rgba(14,165,233,0.5)]">
      {index === 0 ? (
        <FaStar className="text-sm animate-pulse text-yellow-300" />
      ) : (
        <FaGraduationCap className="text-sm" />
      )}
    </div>

    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      scale={1.01}
      transitionSpeed={1500}
    >
      <div className="glass-card p-5 relative border-l-2 border-primary/30 hover:border-primary group hover:shadow-[0_0_20px_rgba(14,165,233,0.2)] transition-all">
        <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider rounded border border-primary/20 bg-primary/10 text-primary">
          {edu.duration}
        </span>
        <h3 className="font-black text-lg text-white mb-1 group-hover:text-primary transition-colors leading-snug">
          {edu.degree}
        </h3>
        <h4 className="font-bold text-md text-secondary mb-3">
          {edu.institution}
        </h4>
        <p className="text-dark-muted text-sm leading-relaxed">
          {edu.description}
        </p>
      </div>
    </Tilt>
  </motion.div>
);

export default function Experience() {
  const containerRef = useRef(null);

  // Create a scroll progress value for the animated center line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section
      id="experience"
      title="Education Journey"
      subtitle="My academic path and foundational experiences."
    >
      <div className="max-w-6xl mx-auto relative px-4" ref={containerRef}>
        {/* Desktop Layout (Hidden on Mobile) */}
        <div className="hidden md:block relative py-10">
          {/* Static background line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-800 transform -translate-x-1/2 rounded-full z-0 opacity-50"></div>

          {/* Animated glowing progress line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-primary via-secondary to-transparent transform -translate-x-1/2 rounded-full z-10 shadow-[0_0_15px_rgba(14,165,233,0.8)]"
          ></motion.div>

          <div className="relative z-20">
            {userData.education.map((edu, index) => (
              <TimelineItem
                key={index}
                edu={edu}
                index={index}
                isLast={index === userData.education.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Mobile Layout (Hidden on Desktop) */}
        <div className="md:hidden relative py-5 ml-4">
          {/* Static background line */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-800 rounded-full z-0"></div>

          {/* Animated glowing progress line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-0 top-0 w-1 bg-gradient-to-b from-primary via-secondary to-transparent rounded-full z-10 shadow-[0_0_10px_rgba(14,165,233,0.8)]"
          ></motion.div>

          <div className="relative z-20">
            {userData.education.map((edu, index) => (
              <MobileTimelineItem key={index} edu={edu} index={index} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
