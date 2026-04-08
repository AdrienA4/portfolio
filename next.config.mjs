/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tchscreenapp.is-a.software",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
      {
        protocol: "https",
        hostname: "media.discordapp.net",
      },
      {
        protocol: "https",
        hostname: "klipy.com",
      },
      {
        protocol: "https",
        hostname: "qrgp.ids.onl",
      },
      {
        protocol: "https",
        hostname: "tchscreenapp.is-a.software",
      },
      {
        protocol: "https",
        hostname: "weather.sartawi.dev",
      },
      {
        protocol: "https",
        hostname: "kash.rweb.site",
      },
    ],
  },
}

export default nextConfig
