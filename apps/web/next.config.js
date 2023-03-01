const envFile = process.env.APP_ENV ? `.env.${process.env.APP_ENV}` : '.env'
require('dotenv').config({
  path: `../../${envFile}`
});

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["app", 'redux-utils'],
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    NAME: process.env.NAME,
  },
};
