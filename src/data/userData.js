import profileImg from '../assets/profile.jpeg';

export const userData = {
  personalInfo: {
    name: "B V P Koushik",
    profileImage: profileImg,
    fullName: "Bora Veera Prasanna Koushik",
    title: "AI & ML Enthusiast | Web Developer",
    shortDesc: "A passionate student and developer currently specializing in Artificial Intelligence and Machine Learning, building modern, responsive web applications.",
    phone: "9059116060",
    email: "koushikbora2006@gmail.com",
    address: "Rangayya Naidu Street, Surya Narayana Puram, Kakinada, AP",
    resumeLink: "#" // Insert link when available
  },
  socialLinks: {
    github: "https://github.com/koushikbora2006-web",
    linkedin: "https://www.linkedin.com/in/bora-veera-prasanna-koushik-71bb30381/",
    twitter: "#",
  },
  education: [
    {
      institution: "Kakinada Institute of Engineering and Technology",
      degree: "B.Tech in CSM (Specialization: AI & ML)",
      duration: "2025 - 2028",
      description: "Focusing on Artificial Intelligence and Machine Learning algorithms, predictive modeling, and building modern technology solutions."
    },
    {
      institution: "Andhra Polytechnic",
      degree: "Diploma in EEE",
      duration: "2022 - 2025",
      description: "Gained strong foundational knowledge in Electrical and Electronics Engineering, enhancing analytical and problem-solving skills."
    },
    {
      institution: "Mahatma Gandhi Municipal Corporation High School",
      degree: "Secondary School Education",
      duration: "Completed in 2022",
      description: "Built a solid academic foundation with a keen interest in science and mathematics."
    }
  ],
  skills: {
    frontend: [
      { name: "React.js", progress: 85 },
      { name: "JavaScript", progress: 80 },
      { name: "Tailwind CSS", progress: 90 },
      { name: "HTML/CSS", progress: 95 },
      { name: "Framer Motion", progress: 70 }
    ],
    backend: [
      { name: "Node.js", progress: 65 },
      { name: "Express", progress: 60 }
    ],
    tools: [
      { name: "Git/GitHub", progress: 85 },
      { name: "VS Code", progress: 90 },
      { name: "Machine Learning Concepts", progress: 75 }
    ]
  },
  projects: [
    {
      title: "Smart Student Attendance Management System",
      description: "An automated attendance tracking system leveraging modern tech to streamline the attendance process for educational institutions.",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
      tech: ["React.js", "Node.js", "Tailwind CSS"],
      githubUrl: "https://github.com/koushikbora2006-web",
      liveUrl: "#"
    },
    {
      title: "Credit Card Fraud Detection using ML",
      description: "A machine learning model designed to detect fraudulent credit card transactions accurately and efficiently.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop",
      tech: ["Python", "Machine Learning", "Data Science", "Scikit-Learn"],
      githubUrl: "https://github.com/koushikbora2006-web",
      liveUrl: "#"
    },
    {
      title: "Football Chatbot AI",
      description: "An intelligent chatbot tailored for football fans, providing real-time stats, match updates, and player information using NLP.",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop",
      tech: ["Artificial Intelligence", "NLP", "Python", "React"],
      githubUrl: "https://github.com/koushikbora2006-web/football-ai.git",
      liveUrl: "#" // Replace with your actual live demo URL if different
    }
  ]
};
