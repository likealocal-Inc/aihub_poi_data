/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    SERVER_URL: process.env.SERVER_IP,
  },
};

module.exports = nextConfig;
