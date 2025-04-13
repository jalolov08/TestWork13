import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://openweathermap.org/img/wn/**")],
  },
};

export default nextConfig;
