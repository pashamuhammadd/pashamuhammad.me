"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "./Hero";
import AboutSection from "./AboutSection";
import ProjectsSection from "./ProjectsSection";
import MilestonesSection from "./MilestonesSection";
import NotesSection from "./NotesSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

const navItems = ["Home", "About", "Projects", "Milestones", "Notes", "Contact"];

export default function ProfileApp() {
  const [activeSection, setActiveSection] = useState("Home");

  return (
    <main className="min-h-screen bg-[#1f1f27] text-white px-8 md:px-20 overflow-hidden">
      <nav className="flex items-center justify-between py-8">
        <h1
          onClick={() => setActiveSection("Home")}
          className="text-xl md:text-2xl font-semibold tracking-wider cursor-pointer transition-all duration-300 hover:text-emerald-400"
        >
          pashamuhammad
          <span className="text-emerald-400">.me</span>
        </h1>

        <div className="hidden md:flex gap-8 text-sm text-gray-300">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveSection(item)}
              className={`pb-1 transition ${
                activeSection === item
                  ? "text-emerald-400 border-b border-emerald-400"
                  : "hover:text-emerald-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          onClick={() => setActiveSection("Contact")}
          className="bg-emerald-400 text-black px-6 py-3 rounded-full font-semibold"
        >
          Contact Me
        </button>
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -30, filter: "blur(12px)" }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          {activeSection === "Home" && <Hero />}

{activeSection === "About" && <AboutSection />}

{activeSection === "Projects" && <ProjectsSection />}

{activeSection === "Milestones" && <MilestonesSection />}

{activeSection === "Notes" && <NotesSection />}

{activeSection === "Contact" && <ContactSection />}

{activeSection !== "Home" && activeSection !== "About" && activeSection !== "Projects" && activeSection !== "Milestones" && activeSection !== "Notes" && activeSection !== "Contact" && (
  <section className="min-h-[75vh] flex items-center justify-center">
    <div className="text-center">
      <p className="text-emerald-400 mb-3">Section</p>
      <h2 className="text-5xl font-bold">{activeSection}</h2>
      <p className="text-gray-400 mt-4">
        Content for {activeSection} will be added here.
      </p>
    </div>
  </section>
)}
        </motion.div>
      </AnimatePresence>


      <Footer />
    </main>
  );
}