/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s.gravatar.com",
        port: "",
        pathname: "/avatar/**",
      }
    ],
  },
};

export default nextConfig;
