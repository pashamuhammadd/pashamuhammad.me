"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "./Hero";
import AboutSection from "./AboutSection";
import ProjectsSection from "./ProjectsSection";
import MilestonesSection from "./MilestonesSection";
import NotesSection from "./NotesSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

type NavItem =
  | { label: string; type: "tab" }
  | { label: string; type: "link"; href: string };

const navItems: NavItem[] = [
  { label: "Home", type: "tab" },
  { label: "About", type: "tab" },
  { label: "Projects", type: "tab" },
  { label: "Milestones", type: "tab" },
  { label: "Notes", type: "tab" },
  { label: "Dev Log", type: "link", href: "/dev-log" },
  { label: "Contact", type: "tab" },
];

export default function ProfileApp() {
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  const handleChangeSection = (item: string) => {
    setActiveSection(item);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#1f1f27] text-white">
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#1f1f27]/90 px-4 py-4 backdrop-blur-xl sm:px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between gap-4">
          <h1
            onClick={() => handleChangeSection("Home")}
            className="cursor-pointer text-base font-semibold tracking-wider transition-all duration-300 hover:text-emerald-400 sm:text-xl md:text-2xl"
          >
            pashamuhammad
            <span className="text-emerald-400">.me</span>
          </h1>

          <div className="hidden items-center gap-8 text-sm text-gray-300 md:flex">
            {navItems.map((item) =>
              item.type === "link" ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="pb-1 transition hover:text-emerald-400"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleChangeSection(item.label)}
                  className={`pb-1 transition ${
                    activeSection === item.label
                      ? "border-b border-emerald-400 text-emerald-400"
                      : "hover:text-emerald-400"
                  }`}
                >
                  {item.label}
                </button>
              )
            )}
          </div>

          <button
            onClick={() => handleChangeSection("Contact")}
            className="rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-black transition hover:bg-emerald-300 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Contact
          </button>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-3 pb-1 text-xs text-gray-300 md:hidden">
          {navItems.map((item) =>
            item.type === "link" ? (
              <Link
                key={item.label}
                href={item.href}
                className="shrink-0 rounded-full bg-white/[0.04] px-3.5 py-2 transition hover:text-emerald-400"
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={() => handleChangeSection(item.label)}
                className={`shrink-0 rounded-full px-3.5 py-2 transition ${
                  activeSection === item.label
                    ? "bg-emerald-400 text-black"
                    : "bg-white/[0.04] hover:text-emerald-400"
                }`}
              >
                {item.label}
              </button>
            )
          )}
        </div>
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
        </motion.div>
      </AnimatePresence>

      <Footer />
    </main>
  );
}