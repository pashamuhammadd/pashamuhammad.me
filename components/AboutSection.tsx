"use client";

import { motion } from "framer-motion";
import { Brain, Gamepad2, Globe2, Sparkles, Users } from "lucide-react";

const pillars = [
  {
    title: "Product Thinking",
    description:
      "Turning ideas into clear products, features, roadmaps, and execution plans.",
    icon: Brain,
  },
  {
    title: "Game & Digital IP",
    description:
      "Building original game concepts, digital worlds, and long-term entertainment ventures.",
    icon: Gamepad2,
  },
  {
    title: "Web3 Ecosystem",
    description:
      "Exploring ownership, community, tokenized experiences, and ecosystem growth.",
    icon: Globe2,
  },
  {
    title: "Community Building",
    description:
      "Growing communities, understanding users, and building around real engagement.",
    icon: Users,
  },
];

const highlights = [
  "Founder of Lifetopia World",
  "Builder of Nimia Games",
  "Web3 & GameFi Focus",
  "AI Assisted Execution",
];

export default function AboutSection() {
  return (
    <section className="px-8 md:px-20 py-10">
      <div className="grid w-full items-start gap-10 md:grid-cols-[0.95fr_1.15fr]">
        <motion.div
          initial={{ opacity: 0, x: -35, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="pt-4"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
            About Me
          </p>

          <h2 className="text-4xl font-bold leading-tight md:text-5xl">
            I build with
            <br />
            <span className="text-emerald-400">
              purpose, speed, and vision.
            </span>
          </h2>

          <p className="mt-6 max-w-xl leading-relaxed text-gray-400">
            My name is Pasha Muhammad. I am an Indonesian founder building at
            the intersection of gaming, Web3, community, and emerging
            technology.
          </p>

          <p className="mt-4 max-w-xl leading-relaxed text-gray-400">
            I believe the future belongs to builders who can combine creativity,
            technology, and community into products that create real value. That
            belief drives everything I build today, from Lifetopia World to
            Nimia Games and future digital ventures.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {highlights.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.12 + index * 0.07,
                }}
                className="rounded-2xl border border-emerald-400/20 bg-white/[0.035] px-4 py-3 text-sm font-medium text-white transition hover:border-emerald-400/70"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 35, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
          className="space-y-4"
        >
          <div className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-white/[0.04] p-6 backdrop-blur-xl">
            <div className="relative z-10 flex gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400">
                <Sparkles size={22} />
              </div>

              <div>
                <h3 className="text-2xl font-bold">Founder Philosophy</h3>

                <p className="mt-3 leading-relaxed text-gray-400">
                  I do not see ideas as something to only be imagined. I see
                  them as something to be tested, built, launched, improved, and
                  turned into long-term businesses.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {pillars.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 28, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.18 + index * 0.08,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group rounded-3xl border border-emerald-400/20 bg-white/[0.04] p-5 transition hover:border-emerald-400/70"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400 transition group-hover:bg-emerald-400 group-hover:text-black">
                    <Icon size={20} />
                  </div>

                  <h4 className="font-bold text-white">{item.title}</h4>

                  <p className="mt-3 text-sm leading-relaxed text-gray-400">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}