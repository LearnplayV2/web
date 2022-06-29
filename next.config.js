/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_URL: process.env.API_URL,
    SOCKET_URL: process.env.SOCKET_URL
  }
}

module.exports = nextConfig
