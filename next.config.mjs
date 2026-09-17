/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/tin-tuc/phun-may-ombre-tu-nhien',
        destination: '/tin-tuc/30-tuoi-chong-lao-hoa-co-muon-khong',
        permanent: true,
      },
      {
        source: '/tin-tuc/hop-tac-cong-nghe-my-pham-han-quoc',
        destination: '/tin-tuc/hop-tac-quoc-te',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
