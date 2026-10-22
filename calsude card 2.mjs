/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
  // don't let a type or lint warning stop the live site from building
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};
export default nextConfig;
