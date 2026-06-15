"use client";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-emerald-400/10">
      <div className="px-8 md:px-20 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold tracking-wide">
              pashamuhammad
              <span className="text-emerald-400">.me</span>
            </h3>

            <p className="text-gray-400 mt-2">
              Founder of Lifetopia World & Nimia Games
            </p>
          </div>

          <div className="text-gray-500 text-sm">
            Founder • Builder • Entrepreneur
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-emerald-400/10 flex justify-center md:justify-start">
          <p className="text-sm text-gray-500">
            © 2026 Pasha Muhammad. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}