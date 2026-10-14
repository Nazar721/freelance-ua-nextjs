import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.185"],
  images: {
    localPatterns: [
      {
        pathname: "/media/**",
      },
    ],
  },
  // Category pages moved to /services/{direction} in Package 3. The old
  // category URLs redirect permanently, keeping the `#cases` fragment so
  // existing links with (or without) the fragment land on the catalogue
  // block. Activated only now that the destination pages are live.
  async redirects() {
    return [
      { source: "/cases/it", destination: "/services/it#cases", permanent: true },
      { source: "/cases/design", destination: "/services/design#cases", permanent: true },
      { source: "/cases/video", destination: "/services/video#cases", permanent: true },
      { source: "/en/cases/it", destination: "/en/services/it#cases", permanent: true },
      { source: "/en/cases/design", destination: "/en/services/design#cases", permanent: true },
      { source: "/en/cases/video", destination: "/en/services/video#cases", permanent: true },
    ];
  },
};

export default nextConfig;
