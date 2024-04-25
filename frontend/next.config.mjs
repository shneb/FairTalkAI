/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true
  },
  rewrites: async () => [
    {
      source: '/',
      destination: '/chat'
    },
    {
      source: '/home',
      destination: '/chat'
    }
  ]
}

export default nextConfig
