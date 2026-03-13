import { useState } from "react";
import Section from "../layout/Section";
import { userData } from "../../data/userData";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaTimes,
  FaInfoCircle,
  FaCheckCircle,
} from "react-icons/fa";
import Tilt from "react-parallax-tilt";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <Section
      id="projects"
      title="Featured Projects"
      subtitle="Click on any project to explore its features and architecture in detail."
    >
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-8">
        {userData.projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="h-full cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <Tilt
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              scale={1.03}
              transitionSpeed={1500}
              className="glass-card glow-border flex flex-col h-full overflow-hidden shadow-xl hover:shadow-[0_0_50px_rgba(14,165,233,0.5)] transition-all duration-500 group"
            >
              <div className="relative overflow-hidden h-56 sm:h-72">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-80"></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />

                {/* Hover Reveal Overlay */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-6 py-3 bg-primary/20 backdrop-blur-md text-white font-bold rounded-full border border-primary/50 flex items-center shadow-[0_0_15px_rgba(14,165,233,0.5)]">
                    <FaInfoCircle className="mr-2" /> View Details
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-bold px-3 py-1 bg-white/10 backdrop-blur-md text-white rounded-md border border-white/20 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between bg-slate-900/50 group-hover:bg-slate-900/80 transition-colors">
                <div>
                  <h3 className="text-2xl font-black mb-3 text-white group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-light-muted dark:text-slate-300 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <a
          href={userData.socialLinks.github}
          target="_blank"
          rel="noreferrer"
          className="btn-outline inline-flex items-center group hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all"
        >
          <FaGithub className="mr-2 group-hover:scale-110 transition-transform" />{" "}
          View More on GitHub
        </a>
      </div>

      {/* Interactive Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl bg-slate-900/80"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card border border-primary/30 shadow-[0_0_50px_rgba(14,165,233,0.2)] rounded-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors border border-white/10"
              >
                <FaTimes />
              </button>

              {/* Modal Hero Image */}
              <div className="relative w-full h-64 sm:h-80 md:h-96 shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent z-10"></div>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-lg mb-4 leading-tight">
                    {selectedProject.title}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-sm font-bold px-3 py-1 bg-primary/20 backdrop-blur-md text-primary-light border border-primary/30 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-10 bg-slate-900/90 flex-grow">
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Left Column: Description & Features */}
                  <div className="md:col-span-2 space-y-8">
                    <section>
                      <h4 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">
                        Project Overview
                      </h4>
                      <p className="text-lg text-slate-300 leading-relaxed">
                        {selectedProject.description} This project was developed
                        to solve real-world problems by implementing modern
                        architectural patterns and prioritizing user experience.
                      </p>
                    </section>

                    <section>
                      <h4 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">
                        Key Features
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "Responsive and intuitive user interface",
                          "Optimized performance and fast load times",
                          "Robust error handling and data validation",
                          "Scalable architecture for future enhancements",
                        ].map((bullet, idx) => (
                          <li
                            key={idx}
                            className="flex items-start text-slate-300"
                          >
                            <FaCheckCircle className="text-emerald-500 mt-1 mr-3 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  {/* Right Column: Links & Action */}
                  <div className="space-y-6">
                    <div className="glass-card p-6 border border-white/10 bg-white/5 rounded-xl">
                      <h4 className="text-lg font-bold text-white mb-4">
                        Project Links
                      </h4>
                      <div className="space-y-4 flex flex-col">
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full flex justify-center items-center py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold transition-colors border border-slate-600"
                        >
                          <FaGithub className="mr-2 text-xl" /> View Source Code
                        </a>

                        {selectedProject.liveUrl !== "#" ? (
                          <a
                            href={selectedProject.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary-light text-white rounded-lg font-bold transition-colors shadow-[0_0_15px_rgba(14,165,233,0.4)]"
                          >
                            <FaExternalLinkAlt className="mr-2" /> Live
                            Deployment
                          </a>
                        ) : (
                          <div className="w-full flex justify-center items-center py-3 px-4 bg-slate-800/50 text-slate-500 rounded-lg font-bold border border-slate-700 cursor-not-allowed">
                            <FaExternalLinkAlt className="mr-2" /> Live Demo
                            Unavailable
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
