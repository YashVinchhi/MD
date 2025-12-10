import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      
    ],
  },
  experimental: {
    
  },
  allowedDevOrigins: [
      'https://*.cluster-aic6jbiihrhmyrqafasatvzbwe.cloudworkstations.dev',
  ],
};

export default nextConfig;
