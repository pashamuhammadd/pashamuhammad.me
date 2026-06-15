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
    <div className="px-8 md:px-20">
      <section className="grid md:grid-cols-2 items-center min-h-[70vh] gap-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gray-400 font-semibold mb-4">
            Founder • Builder • Entrepreneur
          </p>

          <h2 className="text-5xl md:text-7xl font-bold leading-tight">
            Hello I&apos;m <br />
            <span className="text-emerald-400">Pasha Muhammad</span>
          </h2>

          <p className="text-gray-400 max-w-xl mt-6 leading-relaxed">
            I build and grow digital ventures across gaming, Web3, and emerging
            technologies. As the founder of Lifetopia World and Nimia Games, I
            focus on turning ambitious ideas into real products, thriving
            communities, and long-term businesses.
          </p>

          <div className="flex items-center gap-4 mt-8">
            <button className="border border-emerald-400 text-emerald-400 px-6 py-3 rounded-full flex items-center gap-2 hover:bg-emerald-400 hover:text-black transition">
              View Projects
              <ArrowRight size={18} />
            </button>

            <button className="w-11 h-11 rounded-full border border-emerald-400 text-emerald-400 flex items-center justify-center hover:bg-emerald-400 hover:text-black transition">
              <Mail size={18} />
            </button>
          </div>
        </motion.div>

        <motion.div
          className="relative flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
        >
          <motion.div
            className="absolute w-[360px] h-[360px] rounded-full border-4 border-dashed border-emerald-400"
            animate={{ rotate: 360 }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.div
            className="absolute w-[410px] h-[410px] rounded-full border border-emerald-400/30"
            animate={{ rotate: -360 }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.div
            className="absolute w-[260px] h-[260px] rounded-full bg-emerald-400/20 blur-[90px]"
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />

          <motion.div
            className="absolute w-[460px] h-[460px]"
            animate={{ rotate: 360 }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_25px_rgba(52,211,153,1)]" />
          </motion.div>

          <motion.div
            className="absolute w-[500px] h-[500px]"
            animate={{ rotate: -360 }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,1)]" />
          </motion.div>

          <motion.div
            className="absolute w-[540px] h-[540px]"
            animate={{ rotate: 360 }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(52,211,153,1)]" />
          </motion.div>

          <div className="w-[320px] h-[320px] rounded-full overflow-hidden z-10 border border-emerald-400/20 shadow-[0_0_80px_rgba(52,211,153,0.15)]">
            <Image
              src="/profile.png"
              alt="Pasha Muhammad"
              width={320}
              height={320}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </motion.div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12">
        {stats.map((item) => (
          <motion.div
            key={item.label}
            className="flex items-end gap-3"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-5xl font-bold text-emerald-400">
              <Counter target={item.number} />
            </h3>

            <p className="text-gray-400 text-sm mb-2">
              {item.label}
            </p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}