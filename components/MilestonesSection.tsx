"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const milestones = [
  {
    year: "2017",
    title: "Community Foundation",
    category: "Community",
    impact: "53K+ members",
    description:
      "Started building and managing online communities, growing one Facebook community to more than 53,000 members and learning the fundamentals of engagement, leadership, and audience growth.",
  },
  {
    year: "2020",
    title: "Digital Exploration",
    category: "Learning",
    impact: "Digital foundation",
    description:
      "Graduated from MAN 1 Cianjur and began exploring digital opportunities through self learning, online communities, creative work, and technology.",
  },
  {
    year: "2023",
    title: "Lumix Creative Studio",
    category: "Entrepreneurship",
    impact: "First venture launched",
    description:
      "Founded Lumix Creative Studio, a remote creative studio focused on animation, design, community support, and digital services for Web3 projects.",
  },
  {
    year: "2024",
    title: "Web3 Builder Era",
    category: "Web3",
    impact: "Cross ecosystem experience",
    description:
      "Worked across Web3 communities, creative campaigns, animation projects, and ecosystem initiatives while expanding experience as a builder.",
  },
  {
    year: "2025",
    title: "Nimia Games",
    category: "Gaming",
    impact: "Game studio established",
    description:
      "Started building Nimia Games with a long term vision to create original games, digital experiences, and entertainment products for global audiences.",
  },
  {
    year: "2025",
    title: "Lifetopia World",
    category: "Product Building",
    impact: "First original game IP",
    description:
      "Initiated Lifetopia World, a cozy life simulation and social sandbox game inspired by creativity, community, and digital ownership in the Solana ecosystem.",
  },
  {
    year: "2026",
    title: "Ecosystem Grant",
    category: "Milestone",
    impact: "Grant awarded",
    description:
      "Received ecosystem grant support to accelerate the Public Alpha development of Lifetopia World and validate the project's direction.",
  },
  {
    year: "2026",
    title: "Personal Founder Platform",
    category: "Personal Brand",
    impact: "Founder portfolio launched",
    description:
      "Launched pashamuhammad.me to document projects, share insights, build credibility, and connect with builders, partners, and investors worldwide.",
  },
  {
    year: "Next",
    title: "Scaling The Vision",
    category: "Future",
    impact: "Building for the next decade",
    description:
      "Expanding Lifetopia World, growing Nimia Games, exploring AI powered products, and building sustainable businesses across gaming, Web3, and emerging technology.",
  },
];

const stats = [
  {
    value: "53K+",
    label: "Community Members",
  },
  {
    value: "3",
    label: "Ventures Built",
  },
  {
    value: "1",
    label: "Grant Awarded",
  },
  {
    value: "9+",
    label: "Years Building",
  },
];

export default function MilestonesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden px-6 py-24 md:px-20"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.1),transparent_32%)]" />

      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-14"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
            Founder Journey
          </p>

          <h2 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            From community builder
            <br />
            to{" "}
            <span className="bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
              Web3 founder.
            </span>
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-400 md:text-lg">
            A journey of building communities, creative teams, digital products,
            and game ventures across Web3, gaming, and emerging technology.
          </p>
        </motion.div>

        <div className="mb-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className="rounded-3xl border border-emerald-400/15 bg-white/[0.04] p-5 backdrop-blur-xl"
            >
              <h3 className="text-3xl font-bold text-emerald-400">
                {stat.value}
              </h3>
              <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-white/10 md:left-1/2" />

          <motion.div
            style={{ scaleY }}
            className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-emerald-300 via-emerald-400 to-transparent md:left-1/2"
          />

          <div className="space-y-10">
            {milestones.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={`${item.year}-${item.title}`}
                  initial={{
                    opacity: 0,
                    y: 70,
                    scale: 0.96,
                    filter: "blur(12px)",
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                  className="relative grid gap-8 md:grid-cols-2"
                >
                  <div
                    className={
                      isLeft
                        ? "pl-12 md:pl-0 md:pr-16"
                        : "pl-12 md:col-start-2 md:pl-16"
                    }
                  >
                    <motion.div
                      whileHover={{ y: -8, scale: 1.015 }}
                      transition={{ duration: 0.25 }}
                      className={`group relative overflow-hidden rounded-3xl border border-emerald-400/15 bg-white/[0.045] p-6 backdrop-blur-xl transition duration-300 hover:border-emerald-400/70 ${
                        isLeft ? "" : "md:text-right"
                      }`}
                    >
                      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.2),transparent_42%)]" />

                      <div className="relative z-10">
                        <div
                          className={`flex flex-wrap items-center gap-3 ${
                            isLeft ? "justify-start" : "md:justify-end"
                          }`}
                        >
                          <span className="text-xl font-bold text-emerald-400">
                            {item.year}
                          </span>

                          <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                            {item.category}
                          </span>
                        </div>

                        <h3 className="mt-4 text-2xl font-bold text-white">
                          {item.title}
                        </h3>

                        <p className="mt-4 leading-relaxed text-gray-400">
                          {item.description}
                        </p>

                        <div
                          className={`mt-6 flex ${
                            isLeft ? "justify-start" : "md:justify-end"
                          }`}
                        >
                          <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                              Impact
                            </p>
                            <p className="mt-1 text-sm font-semibold text-emerald-300">
                              {item.impact}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="absolute left-[9px] top-8 h-5 w-5 rounded-full border border-emerald-300 bg-black shadow-[0_0_30px_rgba(52,211,153,0.85)] md:left-1/2 md:-translate-x-1/2"
                    whileInView={{
                      scale: [0.8, 1.25, 1],
                      opacity: [0.6, 1, 1],
                    }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  />

                  <motion.div
                    className="absolute left-[15px] top-[38px] h-2 w-2 rounded-full bg-emerald-300 md:left-1/2 md:-translate-x-1/2"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.55, 1, 0.55],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.15,
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}