"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Mail, MessageCircle, Handshake, Rocket } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaTelegram,
  FaDiscord,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const contactItems = [
  {
    title: "Partnership",
    description: "Open for ecosystem, community, and product partnerships.",
    icon: Handshake,
  },
  {
    title: "Grant Opportunities",
    description:
      "Interested in grants for games, Web3 products, and digital ventures.",
    icon: Rocket,
  },
  {
    title: "Business Collaboration",
    description:
      "Open to collaborate on game, AI, and Web3 business opportunities.",
    icon: MessageCircle,
  },
];

const socialLinks = [
  {
    title: "X / Twitter",
    href: "https://x.com/_pashamuhammad",
    icon: FaXTwitter,
  },
  {
    title: "LinkedIn",
    href: "https://linkedin.com/in/pashamuhammad",
    icon: FaLinkedin,
  },
  {
    title: "GitHub",
    href: "https://github.com/pashamuhammadd",
    icon: FaGithub,
  },
  {
    title: "Telegram",
    href: "https://t.me/pashamuhammadd",
    icon: FaTelegram,
  },
  {
    title: "Discord",
    href: "https://discord.com/users/1198289649643290634",
    icon: FaDiscord,
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="flex w-full items-center overflow-hidden px-4 py-16 sm:px-6 md:px-12 md:py-20 lg:px-20 lg:py-24"
    >
      <div className="grid w-full items-center gap-10 md:grid-cols-[1fr_1.1fr] lg:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <p className="mb-3 font-semibold text-emerald-400">Contact</p>

          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Let&apos;s build
            <br />
            <span className="text-emerald-400">something meaningful.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base md:mx-0">
            I am open to strategic partnerships, grant opportunities,
            investment discussions, and collaborations around games, Web3, AI,
            and digital ventures.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
            <a
              href="mailto:mochnuribrahimpasha@gmail.com"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-emerald-400 px-6 py-3 text-emerald-400 transition hover:bg-emerald-400 hover:text-black sm:w-auto"
            >
              <Mail size={18} />
              Email Me
            </a>

            <Link
              href="/cv"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/10 px-6 py-3 text-gray-300 transition hover:border-emerald-400 hover:text-emerald-400 sm:w-auto"
            >
              <FileText size={18} />
              View CV
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            {socialLinks.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.title}
                  title={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: 0.15 + index * 0.06,
                  }}
                  whileHover={{ y: -4, scale: 1.06 }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-400/20 bg-white/[0.04] text-emerald-400 transition hover:border-emerald-400 hover:bg-emerald-400 hover:text-black"
                >
                  <Icon size={18} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        <div className="space-y-5">
          {contactItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: index * 0.12 }}
                whileHover={{ x: -8 }}
                className="rounded-3xl border border-emerald-400/20 bg-white/[0.04] p-5 transition hover:border-emerald-400 sm:p-6"
              >
                <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:gap-5 sm:text-left">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400">
                    <Icon size={22} />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-400 sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}