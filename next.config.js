/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Plataforma-Sur-Website',
  assetPrefix: '/Plataforma-Sur-Website/',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
}

module.exports = nextConfig