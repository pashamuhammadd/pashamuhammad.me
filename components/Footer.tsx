"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-emerald-400/10">
      <div className="px-4 py-8 sm:px-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          <div>
            <h3 className="text-xl font-bold tracking-wide">
              pashamuhammad
              <span className="text-emerald-400">.me</span>
            </h3>

            <p className="mt-2 text-sm text-gray-400 sm:text-base">
              Founder of Lifetopia World & Nimia Games
            </p>
          </div>

          <div className="text-sm text-gray-500">
            Founder • Builder • Entrepreneur
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-emerald-400/10 pt-6 sm:flex-row">
          <p className="text-center text-xs text-gray-500 sm:text-sm md:text-left">
            © 2026 Pasha Muhammad. All Rights Reserved.
          </p>

          <Link
            href="/cv"
            className="text-xs text-gray-500 transition hover:text-emerald-400 sm:text-sm"
          >
            View CV
          </Link>
        </div>
      </div>
    </footer>
  );
}