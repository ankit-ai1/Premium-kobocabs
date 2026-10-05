/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  async redirects() {
    return [
      {
        // The Char Dham guide was refreshed for 2026; keep old links working.
        source: "/blog/char-dham-yatra-2025",
        destination: "/blog/char-dham-yatra-2026",
        permanent: true,
      },
      {
        // Vercel keeps the project's .vercel.app alias serving production, with
        // no noindex header — so the whole site is reachable at a second
        // hostname and search engines treat it as a duplicate. Send it to the
        // canonical host instead.
        //
        // Matching the exact production alias (not a *.vercel.app wildcard)
        // leaves preview deployments, whose hostnames carry a branch or hash,
        // working normally.
        source: "/:path*",
        has: [{ type: "host", value: "premium-kobocabs.vercel.app" }],
        destination: "https://www.yantracabs.com/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
