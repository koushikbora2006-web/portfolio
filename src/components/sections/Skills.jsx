import Section from "../layout/Section";
import { userData } from "../../data/userData";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { FaLaptopCode, FaNodeJs, FaTools } from "react-icons/fa";

const CircularProgress = ({ skill, index, colorClass }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (skill.progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-2 relative group">
      <div className="relative w-24 h-24 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
        <svg
          className="w-full h-full transform -rotate-90 absolute inset-0 drop-shadow-2xl"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-slate-700/30"
          />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: strokeOffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: index * 0.15, ease: "easeOut" }}
            strokeLinecap="round"
            className={colorClass}
            style={{ filter: "drop-shadow(0px 0px 8px currentColor)" }}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center z-10 w-full h-full rounded-full bg-slate-900/40 shadow-inner backdrop-blur-[1px]">
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            className={`text-xl font-black ${colorClass}`}
          >
            {skill.progress}
          </motion.span>
          <span className="text-[10px] text-slate-300 font-bold -mt-1">%</span>
        </div>
      </div>
      <span className="text-sm font-bold text-center text-light-text dark:text-slate-300 group-hover:text-white transition-colors">
        {skill.name}
      </span>
    </div>
  );
};

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" } },
  };

  return (
    <Section
      id="skills"
      title="Technical Skills"
      subtitle="A visual representation of my proficiency across different technologies."
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid lg:grid-cols-3 gap-8"
      >
        {/* Frontend Card */}
        <Tilt
          tiltMaxAngleX={3}
          tiltMaxAngleY={3}
          scale={1.01}
          transitionSpeed={2000}
          className="h-full"
        >
          <motion.div
            variants={itemVariants}
            className="glass-card glow-border p-6 h-full flex flex-col items-center border-t-2 border-blue-500/50 hover:border-blue-400 hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all duration-500 overflow-hidden relative"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full"></div>
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 mt-2 z-10">
              <FaLaptopCode className="text-3xl text-blue-400" />
            </div>
            <h3 className="text-2xl font-black mb-8 tracking-wide dark:text-white z-10 text-center">
              Frontend
            </h3>
            <div className="grid grid-cols-2 gap-x-2 gap-y-6 w-full place-items-center z-10">
              {userData.skills.frontend.map((skill, i) => (
                <CircularProgress
                  key={skill.name}
                  skill={skill}
                  index={i}
                  colorClass="text-blue-400"
                />
              ))}
            </div>
          </motion.div>
        </Tilt>

        {/* Backend Card */}
        <Tilt
          tiltMaxAngleX={3}
          tiltMaxAngleY={3}
          scale={1.01}
          transitionSpeed={2000}
          className="h-full"
        >
          <motion.div
            variants={itemVariants}
            className="glass-card glow-border p-6 h-full flex flex-col items-center border-t-2 border-purple-500/50 hover:border-purple-400 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all duration-500 overflow-hidden relative"
          >
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full"></div>
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 mt-2 z-10">
              <FaNodeJs className="text-3xl text-purple-400" />
            </div>
            <h3 className="text-2xl font-black mb-8 tracking-wide dark:text-white z-10 text-center">
              Backend
            </h3>
            <div className="grid grid-cols-2 gap-x-2 gap-y-6 w-full place-items-center z-10">
              {userData.skills.backend.map((skill, i) => (
                <CircularProgress
                  key={skill.name}
                  skill={skill}
                  index={i}
                  colorClass="text-purple-400"
                />
              ))}
            </div>
          </motion.div>
        </Tilt>

        {/* Tools Card */}
        <Tilt
          tiltMaxAngleX={3}
          tiltMaxAngleY={3}
          scale={1.01}
          transitionSpeed={2000}
          className="h-full"
        >
          <motion.div
            variants={itemVariants}
            className="glass-card glow-border p-6 h-full flex flex-col items-center border-t-2 border-emerald-500/50 hover:border-emerald-400 hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] transition-all duration-500 overflow-hidden relative"
          >
            <div className="absolute -bottom-10 right-10 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 mt-2 z-10">
              <FaTools className="text-3xl text-emerald-400" />
            </div>
            <h3 className="text-2xl font-black mb-8 tracking-wide dark:text-white z-10 text-center">
              Tools & ML
            </h3>
            <div className="grid grid-cols-2 gap-x-2 gap-y-6 w-full place-items-center z-10">
              {userData.skills.tools.map((skill, i) => (
                <CircularProgress
                  key={skill.name}
                  skill={skill}
                  index={i}
                  colorClass="text-emerald-400"
                />
              ))}
            </div>
          </motion.div>
        </Tilt>
      </motion.div>
    </Section>
  );
}
