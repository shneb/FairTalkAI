/** @type {import('next').NextConfig} */

const cspHeader = `
			default-src 'self' ;
	    script-src 'self' 'unsafe-inline' 'unsafe-eval';
	    style-src 'self' 'unsafe-inline';
	    img-src * blob: data:;
	    font-src 'self' https://fonts.googleapis.com;
			connect-src * ${process.env.API_URL};
			frame-src 'self';
			media-src 'self';
`

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
    missingSuspenseWithCSRBailout: false
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
  ],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, '')
          }
        ]
      }
    ]
  }
}

export default nextConfig
