import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";
import CosmicCanvas from "./components/CosmicCanvas";
import ThunderEffect from "./components/ThunderEffect";
import GridBackground from "./components/GridBackground";
import LightRays from "./components/LightRays";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function PortfolioHome() {
  return (
    <div className="min-h-screen text-white bg-transparent transition-colors duration-300 relative">
      <CosmicCanvas />
      <GridBackground />
      <LightRays />
      <ThunderEffect />

      <div className="relative z-10 w-full h-full">
        <Navbar />

        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
