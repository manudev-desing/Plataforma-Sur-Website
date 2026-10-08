const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (process.env.GITHUB_ACTIONS === "true" ? "/Plataforma-Sur-Website" : "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

module.exports = nextConfig;