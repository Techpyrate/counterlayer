import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["playwright", "pdf-parse"],
  compiler: {
    removeConsole: { exclude: ["error"] },
  },
  // Allow iPhone Safari on LAN to load /_next/* assets in dev
  allowedDevOrigins: [
    "192.168.1.82",
    "127.0.0.1",
    "localhost",
    "*.local",
  ],
};

export default nextConfig;
