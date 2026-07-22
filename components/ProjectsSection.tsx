"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Lifetopia World",
    type: "GameFi • Life Simulation • Solana",
    status: "Beta Development",
    url: "https://lifetopiaworld.io",
    image: "https://lifetopiaworld.io/images/og/lifetopia-og.png",
    description:
      "A cozy life simulation and social sandbox game built around farming, fishing, crafting, trading, quests, and community interaction.",
    tags: ["Game", "Solana", "Web3"],
  },
  {
    title: "Nimia Games",
    type: "Game Studio • Digital Venture",
    status: "Live",
    url: "https://nimiagames.com",
    image: "https://nimiagames.com/og-image.png",
    description:
      "A game studio focused on building original games, interactive experiences, and long-term digital IP for global audiences.",
    tags: ["Studio", "Games", "Business"],
  },
  {
    title: "Solana Pasundan",
    type: "Web3 Community • Solana • Indonesia",
    status: "Live",
    url: "https://solanapasundan.fun",
    image: "https://solanapasundan.fun/id/opengraph-image?4dbca8755cd42e31",
    description:
      "An independent builder community for learning, building, and collaborating across the Solana ecosystem, with workshops, hackathons, mentoring, and a builder directory for Pasundan and Indonesia.",
    tags: ["Community", "Solana", "Web3"],
  },
];

export default function ProjectsSection() {
  return (
    <section className="w-full overflow-hidden px-4 py-14 sm:px-6 md:px-12 md:py-16 lg:px-20">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center md:text-left"
        >
          <p className="mb-3 font-semibold text-emerald-400">
            Projects
          </p>

          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Proof of execution,
            <br />
            <span className="text-emerald-400">
              not just ideas.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base md:mx-0">
            These are the ventures and products I am building to turn vision
            into real digital businesses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.55,
                delay: index * 0.12,
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-white/[0.04] transition hover:border-emerald-400/80"
            >
              <div className="h-40 w-full overflow-hidden bg-black/20 sm:h-44">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={`${project.title} cover`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.22),transparent_45%)] opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="relative z-10 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-gray-400 sm:text-sm">
                      {project.type}
                    </p>

                    <h3 className="mt-3 text-xl font-bold sm:text-2xl">
                      {project.title}
                    </h3>
                  </div>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 text-emerald-400 transition group-hover:bg-emerald-400 group-hover:text-black"
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>

                <div className="mt-5 inline-flex rounded-full border border-emerald-400/30 px-3 py-1 text-xs text-emerald-400">
                  {project.status}
                </div>

                <p className="mt-5 text-sm leading-relaxed text-gray-400 sm:text-base">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-400"
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