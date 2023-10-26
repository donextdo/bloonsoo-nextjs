/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  images: {
    domains: [
      'localhost',
      'api.bloonsoo.com',
      'bloonsoo-images-upload.s3.ap-southeast-1.amazonaws.com'
    ],
  },
};
