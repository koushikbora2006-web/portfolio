// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function Section({ id, title, subtitle, children, className = '' }) {
  return (
    <section id={id} className={`section-container ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 0.8, 
          ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for premium feel
          delay: 0.1 
        }}
        className="flex flex-col items-center text-center w-full"
      >
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 w-full"
      >
        {children}
      </motion.div>
    </section>
  );
}
