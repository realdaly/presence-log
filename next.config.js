import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": __dirname, // Maps "@" to the project root
    };
    return config;
  },
};

export default nextConfig;