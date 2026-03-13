import { useState } from "react";
import Section from "../layout/Section";
import { userData } from "../../data/userData";
import { FaUserGraduate, FaLaptopCode, FaBrain, FaTimes } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function About() {
  const [showDetails, setShowDetails] = useState(false);

  const features = [
    {
      icon: <FaBrain className="text-4xl text-primary" />,
      title: "AI Enthusiast",
      desc: "Passionate about Machine Learning models, data analysis, and intelligent systems.",
    },
    {
      icon: <FaLaptopCode className="text-4xl text-secondary" />,
      title: "Web Developer",
      desc: "Building beautiful, responsive, and robust modern web applications.",
    },
    {
      icon: <FaUserGraduate className="text-4xl text-emerald-500" />,
      title: "Continuous Learner",
      desc: "Always exploring new libraries, frameworks, and technological advancements.",
    },
  ];

  return (
    <Section
      id="about"
      title="About Me"
      subtitle="Click my profile to learn more!"
    >
      <AnimatePresence mode="wait">
        {!showDetails && (
          <motion.div
            key="avatar-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
            transition={{ duration: 0.4 }}
            className="flex flex-col mb-12 items-center w-full"
          >
            {/* Profile Image (Click to reveal) */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8 cursor-pointer relative z-20"
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowDetails(true)}
            >
              <div className="relative w-[280px] h-[400px] md:w-[350px] md:h-[500px] group transition-transform duration-700 hover:-translate-y-4">
                {/* Image container without glowing ring/borders, with fade mask */}
                <div
                  className="relative w-full h-full overflow-hidden bg-transparent z-10"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, black 70%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 70%, transparent 100%)",
                  }}
                >
                  <img
                    src="/avatar.jpg"
                    alt="Animated Boy"
                    className="w-full h-full object-cover object-top relative z-10 transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay prompt when not clicked */}
                  {!showDetails && (
                    <div className="absolute inset-x-0 bottom-0 top-[60%] bg-gradient-to-t from-black/80 to-transparent z-20 flex flex-col items-center justify-end pb-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <span className="text-yellow-400 text-sm md:text-base font-black tracking-widest uppercase drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]">
                        Click Me!
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              key="prompt"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-xl font-bold tracking-widest text-primary/80 dark:text-secondary/80 animate-pulse text-center"
            >
              Click profile to reveal details
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showDetails && (
          <motion.div
            key="about-details"
            initial={{ opacity: 0, height: 0, y: 20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid md:grid-cols-2 gap-12 items-center overflow-hidden relative pt-12 md:pt-0"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-0 right-0 p-2 md:p-3 text-light-muted dark:text-dark-muted hover:text-primary dark:hover:text-secondary transition-colors z-30"
              title="Close details"
            >
              <FaTimes className="text-3xl drop-shadow-md" />
            </button>

            {/* Text & Details column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left"
            >
              {/* Revealed Profile Details */}
              <div className="flex flex-col xl:flex-row items-center gap-6 mb-2">
                <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-full overflow-hidden border-4 border-primary/20 shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                  {userData.personalInfo.profileImage ? (
                    <img
                      src={userData.personalInfo.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-yellow-500 to-blue-500 flex items-center justify-center text-4xl font-bold text-white">
                      {userData.personalInfo.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold dark:text-white mb-2 tracking-tight">
                    {userData.personalInfo.name}
                  </h3>
                  <p className="text-xl font-medium text-primary dark:text-secondary">
                    {userData.personalInfo.title}
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold dark:text-white mt-4 border-t border-white/10 pt-6 w-full text-center md:text-left">
                Driven by Data,{" "}
                <span className="text-primary">Designed for Web</span>.
              </h3>
              <p className="text-lg text-light-muted dark:text-dark-muted leading-relaxed">
                {userData.personalInfo.shortDesc}
              </p>
              <p className="text-lg text-light-muted dark:text-dark-muted leading-relaxed">
                I am currently pursuing my B.Tech in CSM (Specializing in AI &
                ML) at {userData.education[0].institution}. With a strong
                foundation established during my Diploma in EEE, I blend
                systematic hardware logic with flexible software solutions.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <div className="glass-card px-6 py-3 border border-primary/20 bg-primary/5 dark:bg-primary/10 rounded-full text-light-text dark:text-dark-text font-medium flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                  Open for Opportunities
                </div>
              </div>
            </motion.div>

            {/* Feature Grid */}
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6 flex flex-row items-center gap-6 hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="p-4 rounded-xl bg-light-bg dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-inner">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1 dark:text-white">
                      {feature.title}
                    </h4>
                    <p className="text-light-muted dark:text-dark-muted text-sm">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
