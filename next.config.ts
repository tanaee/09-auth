import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "ac.goit.global" }],
  },
  async headers() {
    return [
      {
        source: "/notes/filter/All", // маршрут сторінки
        locale: false,
        headers: [
          {
            key: "Cache-Control", // Заголовок
            value: "public, max-age=300, must-revalidate", // кешуємо на 5 хв
          },
        ],
      },
    ];
  },
};

export default nextConfig;
