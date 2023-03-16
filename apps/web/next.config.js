const withRoutes = require('nextjs-routes/config')();

const envFile = process.env.APP_ENV ? `.env.${process.env.APP_ENV}` : '.env';
require('dotenv').config({
  path: `../../${envFile}`,
});

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@domain/app', '@domain/todo'],
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    NAME: process.env.NAME,
  },
};

module.exports = withRoutes(nextConfig);
