"use client";

/**
 * Testimonials are intentionally left as placeholders.
 *
 * Replace the entries below with real quotes from real partners,
 * teammates, or community members before publishing. Attributing
 * invented quotes to real people (or leaving them looking like real
 * quotes) would be misleading to site visitors. Each placeholder is
 * styled with a dashed border, matching the "pending content" look
 * already used elsewhere on this site (see the "No Cover Image" and
 * "More Notes" states), so it's visually obvious this is a draft
 * slot until you fill it in.
 */

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    quote: "Add a real quote from a partner, collaborator, or teammate here.",
    name: "Add Name",
    role: "Add role / company",
  },
  {
    quote: "Add a real quote from a partner, collaborator, or teammate here.",
    name: "Add Name",
    role: "Add role / company",
  },
  {
    quote: "Add a real quote from a partner, collaborator, or teammate here.",
    name: "Add Name",
    role: "Add role / company",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full overflow-hidden px-4 py-14 sm:px-6 md:px-12 md:py-16 lg:px-20">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center md:text-left"
        >
          <p className="mb-3 font-semibold text-emerald-400">Testimonials</p>

          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            What partners
            <br />
            <span className="text-emerald-400">and collaborators say.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base md:mx-0">
            Feedback from people I have worked with across games, Web3, and
            community projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={`${item.name}-${index}`}
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              className="flex flex-col justify-between rounded-3xl border border-dashed border-emerald-400/30 bg-black/20 p-6"
            >
              <div>
                <Quote className="text-emerald-400" size={26} />
                <p className="mt-4 text-sm leading-relaxed text-gray-300 sm:text-base">
                  {item.quote}
                </p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-xs text-gray-500 sm:text-sm">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
