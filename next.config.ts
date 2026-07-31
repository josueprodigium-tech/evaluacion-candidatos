import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/evaluacion-candidatos",
  assetPrefix: "/evaluacion-candidatos/",
  trailingSlash: true,
};

export default nextConfig;
