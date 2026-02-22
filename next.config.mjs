/** @type {import('next').NextConfig} */
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
const normalizedBasePath =
  rawBasePath === "/" ? "" : rawBasePath.replace(/\/$/, "")

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: normalizedBasePath,
  assetPrefix: normalizedBasePath ? `${normalizedBasePath}/` : undefined,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
