"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Handshake, Rocket } from "lucide-react";
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
      className="min-h-[75vh] px-8 md:px-20 py-24 flex items-center"
    >
      <div className="w-full grid md:grid-cols-[1fr_1.1fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-emerald-400 font-semibold mb-3">Contact</p>

          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Let&apos;s build
            <br />
            <span className="text-emerald-400">something meaningful.</span>
          </h2>

          <p className="text-gray-400 mt-5 max-w-xl leading-relaxed">
            I am open to strategic partnerships, grant opportunities,
            investment discussions, and collaborations around games, Web3, AI,
            and digital ventures.
          </p>

          <a
            href="mailto:mochnuribrahimpasha@gmail.com"
            className="inline-flex items-center gap-3 mt-8 border border-emerald-400 text-emerald-400 px-6 py-3 rounded-full hover:bg-emerald-400 hover:text-black transition"
          >
            <Mail size={18} />
            Email Me
          </a>

          <div className="flex items-center gap-3 mt-6">
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
                  className="w-11 h-11 rounded-full border border-emerald-400/20 bg-white/[0.04] text-emerald-400 flex items-center justify-center hover:border-emerald-400 hover:bg-emerald-400 hover:text-black transition"
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
                className="rounded-3xl border border-emerald-400/20 bg-white/[0.04] p-6 hover:border-emerald-400 transition"
              >
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center">
                    <Icon size={22} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-gray-400 mt-2 leading-relaxed">
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