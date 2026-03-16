import { useState, useCallback } from "react";
import Section from "../layout/Section";
import { userData } from "../../data/userData";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FaLaptopCode, FaNodeJs, FaTools, FaTimes } from "react-icons/fa";

// ── Lottie URL ──────────────────────────────────────────────────────────────
const SKILL_LOTTIE = "https://lottie.host/f7a6ef95-5a3a-4e4c-9d38-7365e53ceb58/z0KZOCuw8B.lottie";

// ── Circular progress ring per skill ───────────────────────────────────────
const CircularProgress = ({ skill, index, colorClass }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (skill.progress / 100) * circumference;
  return (
    <div className="flex flex-col items-center justify-center p-2 relative group">
      <div className="relative w-24 h-24 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
        <svg className="w-full h-full transform -rotate-90 absolute inset-0 drop-shadow-2xl" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-700/30" />
          <motion.circle
            cx="50" cy="50" r={radius} stroke="currentColor" strokeWidth="6" fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: strokeOffset }}
            transition={{ duration: 1.5, delay: index * 0.15, ease: "easeOut" }}
            strokeLinecap="round"
            className={colorClass}
            style={{ filter: "drop-shadow(0px 0px 8px currentColor)" }}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center z-10 w-full h-full rounded-full bg-slate-900/40 shadow-inner backdrop-blur-[1px]">
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
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

// ── Card definition ─────────────────────────────────────────────────────────
const CARDS = [
  {
    key: "frontend",
    icon: <FaLaptopCode className="text-3xl text-blue-400" />,
    title: "Frontend",
    color: "blue",
    border: "border-blue-500/50",
    hoverBorder: "hover:border-blue-400",
    shadow: "hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]",
    blob: "bg-blue-500/10",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    colorClass: "text-blue-400",
  },
  {
    key: "backend",
    icon: <FaNodeJs className="text-3xl text-purple-400" />,
    title: "Backend",
    color: "purple",
    border: "border-purple-500/50",
    hoverBorder: "hover:border-purple-400",
    shadow: "hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]",
    blob: "bg-purple-500/10",
    iconBg: "bg-purple-500/10 border-purple-500/20",
    colorClass: "text-purple-400",
  },
  {
    key: "tools",
    icon: <FaTools className="text-3xl text-emerald-400" />,
    title: "Tools & ML",
    color: "emerald",
    border: "border-emerald-500/50",
    hoverBorder: "hover:border-emerald-400",
    shadow: "hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]",
    blob: "bg-emerald-500/10",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    colorClass: "text-emerald-400",
  },
];

// ── Skill Card (collapsed — click to open) ──────────────────────────────────
function SkillCard({ card, onOpen }) {
  const handleClick = useCallback(() => {
    onOpen(card.key);
  }, [card.key, onOpen]);

  return (
    <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.01} transitionSpeed={2000} className="h-full">
      <motion.div
        variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" } } }}
        className={`glass-card glow-border p-6 h-full flex flex-col items-center border-t-2 ${card.border} ${card.hoverBorder} ${card.shadow} transition-all duration-500 overflow-hidden relative cursor-pointer select-none`}
        onClick={handleClick}
      >
        {/* Background blob */}
        <div className={`absolute -top-10 -right-10 w-32 h-32 ${card.blob} blur-3xl rounded-full`}></div>

        {/* Icon badge */}
        <div className={`w-16 h-16 rounded-2xl ${card.iconBg} border flex items-center justify-center mb-4 mt-2 z-10`}>
          {card.icon}
        </div>

        <h3 className="text-2xl font-black mb-4 tracking-wide dark:text-white z-10 text-center">{card.title}</h3>

        <p className="text-slate-400 text-sm text-center z-10 mb-4">Click to explore skills →</p>
        <motion.span
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className={`text-3xl z-10 ${card.colorClass} drop-shadow-[0_0_10px_currentColor]`}
        >
          ✦
        </motion.span>
      </motion.div>
    </Tilt>
  );
}

// ── Skill Modal (expanded) ──────────────────────────────────────────────────
function SkillModal({ cardKey, onClose }) {
  const card = CARDS.find((c) => c.key === cardKey);
  const skills = userData.skills[cardKey] ?? [];
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 1400);
  };

  return (
    <motion.div
      key="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-xl bg-slate-900/70"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 40 }}
        transition={{ type: "spring", damping: 22, stiffness: 260 }}
        className={`glass-card glow-border relative w-full max-w-lg p-8 border-t-4 ${card.border} shadow-[0_0_60px_rgba(14,165,233,0.25)] overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-primary/30 flex items-center justify-center transition-colors border border-white/10"
        >
          <FaTimes className="text-sm" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-14 h-14 rounded-2xl ${card.iconBg} border ${card.iconBg} flex items-center justify-center shrink-0`}>
            {card.icon}
          </div>
          <h3 className={`text-3xl font-black ${card.colorClass}`}>{card.title}</h3>
        </div>

        {/* Lottie: open animation OR closing animation */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32">
            <DotLottieReact src={SKILL_LOTTIE} autoplay loop={!closing} />
          </div>
        </div>

        {/* Skills grid */}
        <AnimatePresence>
          {!closing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-x-2 gap-y-6 w-full place-items-center"
            >
              {skills.map((skill, i) => (
                <CircularProgress key={skill.name} skill={skill} index={i} colorClass={card.colorClass} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {closing && (
          <p className="text-center text-slate-400 text-sm animate-pulse mt-2">Closing…</p>
        )}
      </motion.div>
    </motion.div>
  );
}

// ── Main Skills section ─────────────────────────────────────────────────────
export default function Skills() {
  const [openCard, setOpenCard] = useState(null);

  const handleOpen = useCallback((key) => setOpenCard(key), []);
  const handleClose = useCallback(() => setOpenCard(null), []);

  return (
    <Section
      id="skills"
      title="Technical Skills"
      subtitle="Click any card to explore my skills with a live animation!"
    >
      <motion.div
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid lg:grid-cols-3 gap-8"
      >
        {CARDS.map((card, i) => (
          <SkillCard key={card.key} card={card} index={i} onOpen={handleOpen} />
        ))}
      </motion.div>

      <AnimatePresence>
        {openCard && (
          <SkillModal key={openCard} cardKey={openCard} onClose={handleClose} />
        )}
      </AnimatePresence>
    </Section>
  );
}
