import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Notes are offline for now. Send old links home instead of a 404.
    // Temporary (307) so search engines keep the URLs for when Notes return.
    return [
      { source: "/notes", destination: "/", permanent: false },
      { source: "/notes/:slug*", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
