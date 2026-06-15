"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Lifetopia World",
    type: "GameFi • Life Simulation • Solana",
    status: "Beta Development",
    url: "https://lifetopiaworld.io",
    description:
      "A cozy life simulation and social sandbox game built around farming, fishing, crafting, trading, quests, and community interaction.",
    tags: ["Game", "Solana", "Web3"],
  },
  {
    title: "Nimia Games",
    type: "Game Studio • Digital Venture",
    status: "Live",
    url: "https://nimiagames.com",
    description:
      "A game studio focused on building original games, interactive experiences, and long-term digital IP for global audiences.",
    tags: ["Studio", "Games", "Business"],
  },
  {
    title: "pashamuhammad.me",
    type: "Founder Profile • Personal Brand",
    status: "Live",
    url: "https://pashamuhammad.me",
    description:
      "A personal founder platform designed to showcase my journey, projects, milestones, notes, and collaboration opportunities.",
    tags: ["Founder", "Profile", "Brand"],
  },
];

export default function ProjectsSection() {
  return (
    <section className="min-h-[75vh] px-8 md:px-20 flex items-center">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-emerald-400 font-semibold mb-3">Projects</p>

          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Proof of execution,
            <br />
            <span className="text-emerald-400">not just ideas.</span>
          </h2>

          <p className="text-gray-400 max-w-2xl mt-5 leading-relaxed">
            These are the ventures and products I am building to turn vision
            into real digital businesses.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative rounded-3xl border border-emerald-400/20 bg-white/[0.04] p-6 overflow-hidden transition hover:border-emerald-400/80"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.22),transparent_45%)]" />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-400">{project.type}</p>

                    <h3 className="text-2xl font-bold mt-3">
                      {project.title}
                    </h3>
                  </div>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="w-10 h-10 rounded-full border border-emerald-400/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-400 group-hover:text-black transition"
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>

                <div className="mt-5 inline-flex rounded-full border border-emerald-400/30 px-3 py-1 text-xs text-emerald-400">
                  {project.status}
                </div>

                <p className="text-gray-400 leading-relaxed mt-5 min-h-[120px]">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs rounded-full bg-emerald-400/10 text-emerald-400 px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}