import { useState, useRef } from "react";
import Section from "../layout/Section";
import { userData } from "../../data/userData";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaPaperPlane,
} from "react-icons/fa";
import Tilt from "react-parallax-tilt";

// ── EmailJS configuration ─────────────────────────────────────────────────────
// Get your free keys at https://www.emailjs.com → Account → API Keys
// Then add them to your .env file in the project root:
//   VITE_EMAILJS_SERVICE_ID=your_service_id
//   VITE_EMAILJS_TEMPLATE_ID=your_template_id
//   VITE_EMAILJS_PUBLIC_KEY=your_public_key
const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(""); // "" | "sending" | "success" | "error"
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY })
      .then(() => {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus(""), 5000);
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setStatus("error");
        setTimeout(() => setStatus(""), 5000);
      });
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: "Email Me",
      value: userData.personalInfo.email,
      link: `mailto:${userData.personalInfo.email}`,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "hover:border-blue-500/50",
      shadow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]",
    },
    {
      icon: <FaPhoneAlt />,
      title: "Call Me",
      value: userData.personalInfo.phone,
      link: `tel:${userData.personalInfo.phone}`,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "hover:border-emerald-500/50",
      shadow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Location",
      value: userData.personalInfo.address,
      link: null,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "hover:border-purple-500/50",
      shadow: "hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]",
    },
  ];

  return (
    <Section
      id="contact"
      title="Get In Touch"
      subtitle="Have a project in mind or want to discuss opportunities? Let's talk."
    >
      <div className="grid lg:grid-cols-12 gap-10 mt-12 items-start">
        {/* Contact Info Group */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="mb-8">
            <h3 className="text-3xl font-black mb-4 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Let's Connect
            </h3>
            <p className="text-light-muted dark:text-slate-300 text-lg leading-relaxed">
              I'm currently looking for new opportunities. Whether you have a
              question or just want to say hi, I'll try my best to get back to
              you!
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-1">
            {contactInfo.map((info, idx) => (
              <Tilt
                key={idx}
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                scale={1.02}
                transitionSpeed={1000}
              >
                <div
                  className={`glass-card p-6 flex flex-row items-center border border-white/10 ${info.border} ${info.shadow} transition-all duration-300 group`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${info.bg} flex items-center justify-center shrink-0 mr-5 group-hover:scale-110 transition-transform duration-300 shadow-inner`}
                  >
                    <span className={`text-2xl ${info.color}`}>
                      {info.icon}
                    </span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h4 className="font-bold text-lg text-light-text dark:text-white mb-1 tracking-wide">
                      {info.title}
                    </h4>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-sm md:text-base text-slate-400 hover:text-white transition-colors block truncate w-full"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm md:text-base text-slate-400 break-words line-clamp-2">
                        {info.value}
                      </p>
                    )}
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-7"
        >
          <div className="glass-card p-8 sm:p-12 border-t-2 border-primary/40 relative overflow-hidden group hover:shadow-[0_0_40px_rgba(14,165,233,0.15)] transition-shadow duration-500">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>

            <h3 className="text-2xl sm:text-3xl font-bold mb-8 dark:text-white">
              Send Me a Message
            </h3>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Name Field */}
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="from_name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="block w-full px-0 py-3 text-lg bg-transparent border-0 border-b-2 border-slate-600 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-primary peer transition-colors"
                    placeholder=" "
                  />
                  <label
                    htmlFor="name"
                    className={`absolute text-base text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${formData.name ? "-translate-y-6 scale-75 text-primary" : ""}`}
                  >
                    Your Name
                  </label>
                  <div
                    className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ${focusedField === "name" ? "w-full" : "w-0"}`}
                  ></div>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="reply_to"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="block w-full px-0 py-3 text-lg bg-transparent border-0 border-b-2 border-slate-600 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-primary peer transition-colors"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className={`absolute text-base text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${formData.email ? "-translate-y-6 scale-75 text-primary" : ""}`}
                  >
                    Your Email
                  </label>
                  <div
                    className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ${focusedField === "email" ? "w-full" : "w-0"}`}
                  ></div>
                </div>
              </div>

              {/* Message Field */}
              <div className="relative mt-12">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className="block w-full px-0 py-3 text-lg bg-transparent border-0 border-b-2 border-slate-600 appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-primary peer transition-colors resize-none"
                  placeholder=" "
                ></textarea>
                <label
                  htmlFor="message"
                  className={`absolute text-base text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${formData.message ? "-translate-y-6 scale-75 text-primary" : ""}`}
                >
                  Your Message
                </label>
                <div
                  className={`absolute bottom-1 left-0 h-[2px] bg-primary transition-all duration-300 ${focusedField === "message" ? "w-full" : "w-0"}`}
                ></div>
              </div>

              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className={`w-full py-4 px-8 rounded-xl text-lg font-bold flex justify-center items-center transition-all duration-300 shadow-lg ${
                  status === "success"
                    ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    : status === "error"
                      ? "bg-red-500/80 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                      : status === "sending"
                        ? "bg-primary/70 text-white cursor-wait"
                        : "bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary-light text-white hover:shadow-[0_0_25px_rgba(14,165,233,0.5)] transform hover:-translate-y-1"
                }`}
              >
                {status === "sending" ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : status === "success" ? (
                  <span className="flex items-center">
                    ✅ Message Sent Successfully!
                  </span>
                ) : status === "error" ? (
                  <span className="flex items-center">
                    ⚠️ Failed to Send. Please try again.
                  </span>
                ) : (
                  <span className="flex items-center tracking-wide">
                    Send Message <FaPaperPlane className="ml-3 text-sm" />
                  </span>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
