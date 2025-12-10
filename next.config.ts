import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
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
