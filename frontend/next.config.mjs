/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true
  }
  // rewrites: async () => [
  //   {
  //     source: '/',
  //     destination: '/home'
  //   }
  // ]
}

export default nextConfig
