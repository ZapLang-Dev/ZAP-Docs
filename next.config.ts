/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === "production";
const repositoryBasePath = "/ZAP-Docs";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isProduction ? repositoryBasePath : "",
  assetPrefix: isProduction ? `${repositoryBasePath}/` : "",
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
