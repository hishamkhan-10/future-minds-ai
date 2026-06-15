import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root to this project so Next doesn't pick up the
  // stray package-lock.json in the user's home directory.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
