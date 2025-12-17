/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Commented out to use npm start
  // basePath: '/eventocsn',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
