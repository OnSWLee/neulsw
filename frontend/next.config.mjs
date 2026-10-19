/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["next-sanity"],
  async redirects() {
    return [
      {
        source: "/clinics/thyroid",
        destination: "/clinics/herbs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
