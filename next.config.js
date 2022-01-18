/** @type {import('next').NextConfig} */
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
  reactStrictMode: true,
  //distDir: 'build',
  webpack: (config, {  }) => {

    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.fallback = { fs: false };

    config.plugins.push(
    new CopyPlugin({
      patterns: [
          {
            from: './services/faceapi/model',
            to: 'server/pages/api/model',
          },
          {
            from: './services/recog/model',
            to: 'server/pages/api/model',
          },
        ],
      }),
    );

    return config;
  } 
}
