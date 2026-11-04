import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      { source: "/projetos/catalago-de-dados", destination: "/dados/catalogo-de-dados", permanent: true },
      { source: "/projetos/dashboard", destination: "/dados/pemob-dashboard", permanent: true },
      { source: "/projetos/dashboard/:path*", destination: "/dados/pemob-dashboard/:path*", permanent: true },
      { source: "/projetos/tabela", destination: "/dados/pemob-tabela", permanent: true },
      { source: "/projetos/tabela/:path*", destination: "/dados/pemob-tabela/:path*", permanent: true },
      { source: "/projetos/dashboard-wri-brasil", destination: "/dados/wri-dashboard", permanent: true },
      { source: "/projetos/dashboard-wri-brasil/:path*", destination: "/dados/wri-dashboard/:path*", permanent: true },
      { source: "/projetos/geoportal", destination: "/dados/geoportal", permanent: true },
      { source: "/projetos/geoportal/:path*", destination: "/dados/geoportal/:path*", permanent: true },
      { source: "/projetos/pemob/saiba-mais", destination: "/dados/pemob-dashboard/saiba-mais", permanent: true },
      { source: "/projetos/admin/:path*", destination: "/dados/admin/:path*", permanent: true },
    ];
  },
  output: process.env.BUILD_STANDALONE === 'false' ? undefined : 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
