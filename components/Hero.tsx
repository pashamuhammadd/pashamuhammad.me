"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  if (target >= 1000) {
    return <>{Math.floor(count / 1000)}K+</>;
  }

  return <>{count}+</>;
}

export default function Hero() {
  const stats = [
    { number: 3, label: "Ventures Built" },
    { number: 1, label: "Grant Awarded" },
    { number: 9, label: "Years Building" },
    { number: 53000, label: "Community Members" },
  ];

  return (
    <div className="w-full overflow-hidden px-4 sm:px-6 md:px-12 lg:px-20">
      <section className="grid grid-cols-1 items-center gap-14 py-10 md:min-h-[570px] md:grid-cols-2 md:gap-10 md:py-6 lg:min-h-[580px]">
        <motion.div
          className="order-2 text-center md:order-1 md:text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-sm font-semibold text-gray-400 sm:text-base">
            Founder • Builder • Entrepreneur
          </p>

          <h2 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Hello I&apos;m <br />
            <span className="text-emerald-400">Pasha Muhammad</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base md:mx-0">
            I build and grow digital ventures across gaming, Web3, and emerging
            technologies. As the founder of Lifetopia World and Nimia Games, I
            focus on turning ambitious ideas into real products, thriving
            communities, and long-term businesses.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
            <button className="flex w-full items-center justify-center gap-2 rounded-full border border-emerald-400 px-6 py-3 text-emerald-400 transition hover:bg-emerald-400 hover:text-black sm:w-auto">
              View Projects
              <ArrowRight size={18} />
            </button>

            <button className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-400 text-emerald-400 transition hover:bg-emerald-400 hover:text-black">
              <Mail size={18} />
            </button>
          </div>
        </motion.div>

        <motion.div
          className="relative order-1 mx-auto flex h-[300px] w-[300px] items-center justify-center sm:h-[380px] sm:w-[380px] md:order-2 md:h-[430px] md:w-[430px] lg:h-[500px] lg:w-[500px]"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
        >
          <motion.div
            className="absolute h-[220px] w-[220px] rounded-full border-4 border-dashed border-emerald-400 sm:h-[300px] sm:w-[300px] md:h-[340px] md:w-[340px]"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className="absolute h-[260px] w-[260px] rounded-full border border-emerald-400/30 sm:h-[340px] sm:w-[340px] md:h-[390px] md:w-[390px]"
            animate={{ rotate: -360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className="absolute h-[190px] w-[190px] rounded-full bg-emerald-400/20 blur-[70px] sm:h-[240px] sm:w-[240px] md:h-[250px] md:w-[250px]"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <motion.div
            className="absolute h-[280px] w-[280px] sm:h-[380px] sm:w-[380px] md:h-[430px] md:w-[430px]"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-emerald-400 shadow-[0_0_25px_rgba(52,211,153,1)] sm:h-4 sm:w-4" />
          </motion.div>

          <motion.div
            className="absolute h-[300px] w-[300px] sm:h-[410px] sm:w-[410px] md:h-[460px] md:w-[460px]"
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,1)] sm:h-3 sm:w-3" />
          </motion.div>

          <motion.div
            className="absolute h-[320px] w-[320px] sm:h-[440px] sm:w-[440px] md:h-[490px] md:w-[490px]"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(52,211,153,1)]" />
          </motion.div>

          <div className="z-10 h-[220px] w-[220px] overflow-hidden rounded-full border border-emerald-400/20 shadow-[0_0_80px_rgba(52,211,153,0.15)] sm:h-[280px] sm:w-[280px] md:h-[300px] md:w-[300px] lg:h-[320px] lg:w-[320px]">
            <Image
              src="/profile.png"
              alt="Pasha Muhammad"
              width={320}
              height={320}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </motion.div>
      </section>

      <section className="grid grid-cols-2 gap-5 pb-10 sm:gap-8 md:grid-cols-4 md:pb-8">
        {stats.map((item) => (
          <motion.div
            key={item.label}
            className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center sm:flex-row sm:items-end sm:gap-3 sm:text-left md:border-0 md:bg-transparent md:p-0"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-3xl font-bold text-emerald-400 sm:text-4xl lg:text-5xl">
              <Counter target={item.number} />
            </h3>

            <p className="mt-1 text-xs text-gray-400 sm:mb-2 sm:mt-0 sm:text-sm">
              {item.label}
            </p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}