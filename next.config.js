const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  experimental: {
    appDir: true,
  },
  reactStrictMode: false, 
  env: {
    API_HOST: process.env.API_HOST
  }
}

module.exports = nextConfig
