import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["sequelize", "sqlite3"],
  turbopack: {},
};

export default nextConfig;
